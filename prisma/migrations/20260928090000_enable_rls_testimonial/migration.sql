-- La migracion 20260525000000_enable_rls activo RLS en BlogPost,
-- LeadSubmission y PageView, pero Testimonial se anadio despues y se quedo
-- fuera. Sin RLS la tabla queda expuesta a traves de la API REST de Supabase
-- con la anon key, que es publica por diseno.
--
-- Prisma se conecta con el rol postgres, que salta RLS, asi que esto no afecta
-- a la web: solo cierra el acceso directo por la API de Supabase.

ALTER TABLE "Testimonial" ENABLE ROW LEVEL SECURITY;
