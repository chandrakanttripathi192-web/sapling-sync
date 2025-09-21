export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      documents: {
        Row: {
          created_at: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          name: string
          project_id: string | null
          report_id: string | null
          site_id: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          name: string
          project_id?: string | null
          report_id?: string | null
          site_id?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          name?: string
          project_id?: string | null
          report_id?: string | null
          site_id?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_data: {
        Row: {
          collected_by: string | null
          created_at: string
          data_values: Json
          equipment_used: string | null
          id: string
          measurement_date: string
          methodology: string | null
          monitoring_type: Database["public"]["Enums"]["monitoring_type"]
          site_id: string
          updated_at: string
          verification_notes: string | null
          verified: boolean | null
          weather_conditions: string | null
        }
        Insert: {
          collected_by?: string | null
          created_at?: string
          data_values: Json
          equipment_used?: string | null
          id?: string
          measurement_date: string
          methodology?: string | null
          monitoring_type: Database["public"]["Enums"]["monitoring_type"]
          site_id: string
          updated_at?: string
          verification_notes?: string | null
          verified?: boolean | null
          weather_conditions?: string | null
        }
        Update: {
          collected_by?: string | null
          created_at?: string
          data_values?: Json
          equipment_used?: string | null
          id?: string
          measurement_date?: string
          methodology?: string | null
          monitoring_type?: Database["public"]["Enums"]["monitoring_type"]
          site_id?: string
          updated_at?: string
          verification_notes?: string | null
          verified?: boolean | null
          weather_conditions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monitoring_data_collected_by_fkey"
            columns: ["collected_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoring_data_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          organization: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          organization?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          organization?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          area_hectares: number | null
          certification_standard: string | null
          coordinates: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          location: string
          methodology: string | null
          name: string
          project_manager_id: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          updated_at: string
        }
        Insert: {
          area_hectares?: number | null
          certification_standard?: string | null
          coordinates?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          location: string
          methodology?: string | null
          name: string
          project_manager_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string
        }
        Update: {
          area_hectares?: number | null
          certification_standard?: string | null
          coordinates?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string
          methodology?: string | null
          name?: string
          project_manager_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_project_manager_id_fkey"
            columns: ["project_manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          carbon_credits_estimated: number | null
          carbon_credits_verified: number | null
          content: Json | null
          created_at: string
          created_by: string | null
          file_url: string | null
          id: string
          project_id: string
          report_type: string
          reporting_period_end: string | null
          reporting_period_start: string | null
          status: Database["public"]["Enums"]["report_status"] | null
          title: string
          updated_at: string
          verification_date: string | null
          verified_by: string | null
        }
        Insert: {
          carbon_credits_estimated?: number | null
          carbon_credits_verified?: number | null
          content?: Json | null
          created_at?: string
          created_by?: string | null
          file_url?: string | null
          id?: string
          project_id: string
          report_type: string
          reporting_period_end?: string | null
          reporting_period_start?: string | null
          status?: Database["public"]["Enums"]["report_status"] | null
          title: string
          updated_at?: string
          verification_date?: string | null
          verified_by?: string | null
        }
        Update: {
          carbon_credits_estimated?: number | null
          carbon_credits_verified?: number | null
          content?: Json | null
          created_at?: string
          created_by?: string | null
          file_url?: string | null
          id?: string
          project_id?: string
          report_type?: string
          reporting_period_end?: string | null
          reporting_period_start?: string | null
          status?: Database["public"]["Enums"]["report_status"] | null
          title?: string
          updated_at?: string
          verification_date?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          accessibility_notes: string | null
          area_hectares: number | null
          coordinates: Json
          created_at: string
          depth_range: string | null
          id: string
          name: string
          project_id: string
          salinity_range: string | null
          site_type: Database["public"]["Enums"]["site_type"]
          updated_at: string
        }
        Insert: {
          accessibility_notes?: string | null
          area_hectares?: number | null
          coordinates: Json
          created_at?: string
          depth_range?: string | null
          id?: string
          name: string
          project_id: string
          salinity_range?: string | null
          site_type: Database["public"]["Enums"]["site_type"]
          updated_at?: string
        }
        Update: {
          accessibility_notes?: string | null
          area_hectares?: number | null
          coordinates?: Json
          created_at?: string
          depth_range?: string | null
          id?: string
          name?: string
          project_id?: string
          salinity_range?: string | null
          site_type?: Database["public"]["Enums"]["site_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sites_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_records: {
        Row: {
          carbon_credits_approved: number | null
          created_at: string
          findings: Json | null
          id: string
          recommendations: string | null
          report_id: string
          updated_at: string
          verification_date: string | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verifier_id: string
        }
        Insert: {
          carbon_credits_approved?: number | null
          created_at?: string
          findings?: Json | null
          id?: string
          recommendations?: string | null
          report_id: string
          updated_at?: string
          verification_date?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verifier_id: string
        }
        Update: {
          carbon_credits_approved?: number | null
          created_at?: string
          findings?: Json | null
          id?: string
          recommendations?: string | null
          report_id?: string
          updated_at?: string
          verification_date?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verifier_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_records_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_records_verifier_id_fkey"
            columns: ["verifier_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      monitoring_type:
        | "biomass"
        | "carbon_stock"
        | "biodiversity"
        | "water_quality"
        | "soil_analysis"
      project_status: "planning" | "active" | "completed" | "suspended"
      report_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "verified"
        | "rejected"
      site_type: "mangrove" | "seagrass" | "salt_marsh" | "kelp_forest"
      user_role:
        | "admin"
        | "project_manager"
        | "field_researcher"
        | "verifier"
        | "viewer"
      verification_status: "pending" | "in_progress" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      monitoring_type: [
        "biomass",
        "carbon_stock",
        "biodiversity",
        "water_quality",
        "soil_analysis",
      ],
      project_status: ["planning", "active", "completed", "suspended"],
      report_status: [
        "draft",
        "submitted",
        "under_review",
        "verified",
        "rejected",
      ],
      site_type: ["mangrove", "seagrass", "salt_marsh", "kelp_forest"],
      user_role: [
        "admin",
        "project_manager",
        "field_researcher",
        "verifier",
        "viewer",
      ],
      verification_status: ["pending", "in_progress", "verified", "rejected"],
    },
  },
} as const
