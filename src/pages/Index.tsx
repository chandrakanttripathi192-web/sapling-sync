import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Waves, Leaf, BarChart3, FileText, CheckCircle, MapPin } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Waves className="h-12 w-12 text-primary" />
            <Leaf className="h-12 w-12 text-accent" />
          </div>
          <h1 className="text-5xl font-bold text-foreground">
            Blue Carbon MRV System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive Monitoring, Reporting, and Verification platform for blue carbon ecosystems including mangroves, seagrass beds, and salt marshes.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Site Management</h3>
            </div>
            <p className="text-muted-foreground">
              Monitor and manage blue carbon sites with precise location tracking, ecosystem mapping, and environmental data collection.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="h-8 w-8 text-accent" />
              <h3 className="text-xl font-semibold">Data Analytics</h3>
            </div>
            <p className="text-muted-foreground">
              Advanced analytics for carbon stock assessment, biomass calculations, and ecosystem health monitoring with real-time insights.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Automated Reporting</h3>
            </div>
            <p className="text-muted-foreground">
              Generate comprehensive reports for stakeholders, regulatory compliance, and carbon credit certification processes.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
              <h3 className="text-xl font-semibold">Verification System</h3>
            </div>
            <p className="text-muted-foreground">
              Third-party verification workflows with audit trails, quality assurance, and compliance tracking.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <Waves className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Ecosystem Types</h3>
            </div>
            <p className="text-muted-foreground">
              Support for mangroves, seagrass beds, salt marshes, and kelp forests with specialized monitoring protocols.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <Leaf className="h-8 w-8 text-accent" />  
              <h3 className="text-xl font-semibold">Carbon Credits</h3>
            </div>
            <p className="text-muted-foreground">
              Calculate, track, and verify blue carbon credits with international standards compliance and methodology support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
