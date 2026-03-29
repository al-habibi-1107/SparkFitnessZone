import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export type Database = {
  public: {
    Tables: {
      members: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subscription_id: string | null;
          subscription_status: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subscription_id?: string | null;
          subscription_status?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subscription_id?: string | null;
          subscription_status?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export function createClient() {
  return createSupabaseClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
