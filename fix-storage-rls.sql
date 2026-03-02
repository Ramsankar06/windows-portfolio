-- ============================================================
-- FIX: Supabase Storage RLS Policies for "resumes" bucket
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Ensure the "resumes" bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Allow public to read files in the 'resumes' bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'resumes' );

-- 3. Allow authenticated users to upload files to the 'resumes' bucket
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'resumes' AND auth.role() = 'authenticated' );

-- 4. Allow authenticated users to update/overwrite files in the 'resumes' bucket
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'resumes' AND auth.role() = 'authenticated' )
WITH CHECK ( bucket_id = 'resumes' AND auth.role() = 'authenticated' );

-- 5. Allow authenticated users to delete files in the 'resumes' bucket
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'resumes' AND auth.role() = 'authenticated' );
