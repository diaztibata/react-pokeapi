// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zabdbjjazhpghuhxrgoo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphYmRiamphemhwZ2h1aHhyZ29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxODg1MzEsImV4cCI6MjA2Mjc2NDUzMX0.KJmZ4SXuMUsgiOCq4TvxOoX_4TBdk0U1MLM72Gvfpgg';
export const supabase = createClient(supabaseUrl, supabaseKey);
