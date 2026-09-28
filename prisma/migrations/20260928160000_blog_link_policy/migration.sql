-- Politica de enlaces externos por articulo.
--
-- Hasta ahora todo enlace externo del blog salia dofollow: el rel era solo
-- "noopener noreferrer", que no dice nada sobre seguimiento. En un blog propio
-- da igual; publicando contenido de terceros significa repartir autoridad sin
-- control y sin haberlo decidido.
--
-- Valores: follow, nofollow, sponsored, ugc.
--
-- El defecto es nofollow a proposito: si se olvida marcar un articulo, el fallo
-- cae del lado que no regala nada.

ALTER TABLE "BlogPost" ADD COLUMN "linkPolicy" TEXT NOT NULL DEFAULT 'nofollow';
