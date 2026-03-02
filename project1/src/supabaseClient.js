import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nxtcrjszmxqyaixpthpb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54dGNyanN6bXhxeWFpeHB0aHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODUyMjksImV4cCI6MjA4Nzk2MTIyOX0.8w_Ad4vAE52xhdmDdfDdDYILDvVU5f_B5MxamGzwwFw";
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);