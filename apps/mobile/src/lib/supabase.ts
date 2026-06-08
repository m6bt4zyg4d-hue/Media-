import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { MediaRepository } from '@media/api';

const configuredSupabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const configuredSupabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigError = !configuredSupabaseUrl || !configuredSupabaseAnonKey
  ? 'Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY. Configure production Supabase credentials before using the mobile app.'
  : null;

const supabaseUrl = configuredSupabaseUrl ?? 'https://missing-supabase-config.supabase.co';
const supabaseAnonKey = configuredSupabaseAnonKey ?? 'missing-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

export const mobileRepository = new MediaRepository(supabase);
