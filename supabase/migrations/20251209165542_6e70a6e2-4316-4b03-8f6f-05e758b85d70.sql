-- Corrigir políticas de storage que já existem
-- Usar DROP IF EXISTS para evitar conflitos

DROP POLICY IF EXISTS "Users can delete own body photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own body photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload own body photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own body photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can view all body photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own avatar" ON storage.objects;

-- Recriar políticas de body-photos
CREATE POLICY "Users can view own body photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'body-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all body photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'body-photos' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can upload own body photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'body-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own body photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'body-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own body photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'body-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Políticas de avatars
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);