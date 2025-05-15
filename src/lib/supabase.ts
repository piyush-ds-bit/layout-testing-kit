
import { createClient } from '@supabase/supabase-js';

// These should be set in environment variables in a production environment
// For this demo, we'll use them directly here
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
