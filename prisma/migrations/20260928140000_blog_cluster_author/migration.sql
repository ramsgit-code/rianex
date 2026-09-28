-- Agrupacion tematica y autoria de los articulos.
--
-- `cluster` es opcional en la base para no romper las filas que ya existen; la
-- validacion de que todo articulo nuevo lo traiga vive en el esquema de
-- frontmatter (src/lib/blog-schema.ts), que corta la importacion si falta.

ALTER TABLE "BlogPost" ADD COLUMN "cluster" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "author" TEXT NOT NULL DEFAULT 'Ramiro Pérez';

-- El indice del blog y llms.txt filtran por publicado y agrupan por cluster.
CREATE INDEX "BlogPost_cluster_idx" ON "BlogPost"("cluster");
