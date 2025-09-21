-- Create enum types for the system
CREATE TYPE public.project_status AS ENUM ('planning', 'active', 'completed', 'suspended');
CREATE TYPE public.site_type AS ENUM ('mangrove', 'seagrass', 'salt_marsh', 'kelp_forest');
CREATE TYPE public.monitoring_type AS ENUM ('biomass', 'carbon_stock', 'biodiversity', 'water_quality', 'soil_analysis');
CREATE TYPE public.report_status AS ENUM ('draft', 'submitted', 'under_review', 'verified', 'rejected');
CREATE TYPE public.verification_status AS ENUM ('pending', 'in_progress', 'verified', 'rejected');
CREATE TYPE public.user_role AS ENUM ('admin', 'project_manager', 'field_researcher', 'verifier', 'viewer');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role user_role DEFAULT 'viewer',
  organization TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  coordinates JSONB, -- {lat, lng, bounds}
  status project_status DEFAULT 'planning',
  start_date DATE,
  end_date DATE,
  area_hectares DECIMAL(10,2),
  project_manager_id UUID REFERENCES public.profiles(id),
  methodology TEXT,
  certification_standard TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sites table
CREATE TABLE public.sites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  site_type site_type NOT NULL,
  coordinates JSONB NOT NULL, -- {lat, lng}
  area_hectares DECIMAL(8,2),
  depth_range TEXT,
  salinity_range TEXT,
  accessibility_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create monitoring_data table
CREATE TABLE public.monitoring_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES public.sites(id) ON DELETE CASCADE,
  monitoring_type monitoring_type NOT NULL,
  measurement_date DATE NOT NULL,
  data_values JSONB NOT NULL, -- flexible storage for different measurement types
  methodology TEXT,
  equipment_used TEXT,
  weather_conditions TEXT,
  collected_by UUID REFERENCES public.profiles(id),
  verified BOOLEAN DEFAULT false,
  verification_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reports table
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL, -- 'monitoring', 'verification', 'annual', etc.
  reporting_period_start DATE,
  reporting_period_end DATE,
  status report_status DEFAULT 'draft',
  content JSONB, -- structured report data
  file_url TEXT,
  carbon_credits_estimated DECIMAL(12,2),
  carbon_credits_verified DECIMAL(12,2),
  created_by UUID REFERENCES public.profiles(id),
  verified_by UUID REFERENCES public.profiles(id),
  verification_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create verification_records table
CREATE TABLE public.verification_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  verifier_id UUID NOT NULL REFERENCES public.profiles(id),
  verification_status verification_status DEFAULT 'pending',
  verification_date DATE,
  findings JSONB,
  recommendations TEXT,
  carbon_credits_approved DECIMAL(12,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create documents table for file storage
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  site_id UUID REFERENCES public.sites(id) ON DELETE CASCADE,
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitoring_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for projects
CREATE POLICY "Users can view all projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Project managers and admins can update projects" ON public.projects FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND (role IN ('admin', 'project_manager') OR id = public.projects.project_manager_id)
  )
);

-- Create RLS policies for sites
CREATE POLICY "Users can view all sites" ON public.sites FOR SELECT USING (true);
CREATE POLICY "Project team can manage sites" ON public.sites FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    JOIN public.projects pr ON pr.project_manager_id = p.id OR pr.created_by = p.id
    WHERE p.user_id = auth.uid() AND pr.id = public.sites.project_id
  ) OR EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create RLS policies for monitoring_data
CREATE POLICY "Users can view all monitoring data" ON public.monitoring_data FOR SELECT USING (true);
CREATE POLICY "Field researchers can manage monitoring data" ON public.monitoring_data FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'project_manager', 'field_researcher')
  )
);

-- Create RLS policies for reports
CREATE POLICY "Users can view all reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Project team can manage reports" ON public.reports FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'project_manager')
  )
);

-- Create RLS policies for verification_records
CREATE POLICY "Users can view verification records" ON public.verification_records FOR SELECT USING (true);
CREATE POLICY "Verifiers can manage verification records" ON public.verification_records FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'verifier')
  )
);

-- Create RLS policies for documents
CREATE POLICY "Users can view all documents" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Authenticated users can upload documents" ON public.documents FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Create storage policies
CREATE POLICY "Authenticated users can view documents" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'documents');
CREATE POLICY "Authenticated users can upload documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents');
CREATE POLICY "Users can update their own documents" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON public.sites FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_monitoring_data_updated_at BEFORE UPDATE ON public.monitoring_data FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_verification_records_updated_at BEFORE UPDATE ON public.verification_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();