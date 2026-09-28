#!/usr/bin/env node
// Avisa a IndexNow (Bing, Copilot, Yandex y quien use ese indice) de las URLs
// publicadas, en vez de esperar a que pasen a rastrear por su cuenta.
//
// Se ejecuta DESPUES de desplegar: la clave tiene que estar accesible en
// produccion o la API rechaza el lote entero.
//
//   node scripts/indexnow.mjs            -> manda todo el sitemap
//   node scripts/indexnow.mjs <url> ...  -> manda solo esas URLs

const HOST = "www.rianex.es";
const KEY = "2e18428a2e6c8459a030afcbda389de1";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function urlsDelSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`el sitemap devolvio ${res.status}`);
  const xml = await res.text();
  // Solo las <loc> de cada <url>: las alternativas de hreflang van en
  // atributos href de xhtml:link y no deben mandarse por duplicado.
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length ? args : await urlsDelSitemap();

if (!urlList.length) {
  console.error("No hay URLs que mandar.");
  process.exit(1);
}

// Comprobar que la clave responde antes de gastar el envio.
const check = await fetch(KEY_LOCATION);
if (!check.ok) {
  console.error(`La clave no responde en ${KEY_LOCATION} (${check.status}).`);
  console.error("Despliega primero: sin clave accesible, IndexNow rechaza todo el lote.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

// 200 = aceptado. 202 = aceptado, clave en validacion. Los dos son exito.
if (res.status === 200 || res.status === 202) {
  console.log(`IndexNow acepto ${urlList.length} URLs (HTTP ${res.status}).`);
} else {
  console.error(`IndexNow devolvio ${res.status}: ${await res.text()}`);
  process.exit(1);
}
