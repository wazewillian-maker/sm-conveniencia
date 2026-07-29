import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renderiza o site da SM Conveniência", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>SM Conveni/);
  assert.match(html, /SM Conveniência em Bombas, Bombinhas/);
  assert.match(html, /Logo da SM Conveniência/);
  assert.match(html, /\/brand\/logo-sm-conveniencia\.png/);
  assert.match(html, /Aberto todos os dias até meia-noite/);
  assert.match(html, /Abrir rota no Google Maps/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Tudo o que voc/);
  assert.match(html, /id="catalogo"/);
  assert.match(html, /id="promocoes"/);
  assert.match(html, /Entre em contato/);
  assert.match(html, /Consultar pelo WhatsApp/);
  assert.match(html, /554792930951/);
  assert.match(html, /Ol%C3%A1!%20Encontrei%20a%20SM%20Conveni%C3%AAncia%20pelo%20site/);
  assert.match(html, /Av\. Falcão, nº 170, Sala 03/);
  assert.match(html, /google\.com\/maps\/search\/\?api=1/);
  assert.match(html, /id="tabacaria"/);
  assert.match(html, /Venda proibida para menores de 18 anos/);
  assert.match(html, /consultar%20os%20produtos%20dispon%C3%ADveis%20na%20tabacaria/);
  assert.match(html, /Segunda a sexta: 14h às 00h/);
  assert.match(html, /Sábados, domingos e feriados: 11h às 00h/);
  assert.match(html, /Ver itens de Combo Churrasco/);
  assert.match(html, /Ver itens de Combo Resenha/);
  assert.match(html, /Ver itens de Combo Energético/);
  assert.match(html, /\/images\/combos\/combo churrasco\/capa \(3\)\.jpeg/);
  assert.match(html, /\/images\/combos\/combo resenha\/capa \(2\)\.jpeg/);
  assert.match(html, /\/images\/combos\/combo energetico\/capa \(1\)\.jpeg/);
  assert.match(html, /Ver detalhes de Narguilés/);
  assert.match(html, /Conhecer a categoria/);
  assert.match(html, /Ver todos os produtos de Cervejas/);
  assert.match(html, /Ver todos os produtos de Destilados/);
  assert.match(html, /\/images\/produtos\/cervejas\/capa\.webp\.jpeg/);
  assert.match(html, /\/images\/produtos\/gelo\/capa\.webp/);
  assert.match(html, /Imagem n.o cadastrada/);
  assert.doesNotMatch(html, /\/details\//);
  assert.match(html, /Carvão/);
  assert.doesNotMatch(html, /Escolhas que combinam com seu momento|Explorar seleção/);
  assert.doesNotMatch(html, /Noite de Filmes|combo-filmes|Para acompanhar o filme/);
  assert.doesNotMatch(html, /R\$\s|A partir de/);
  assert.doesNotMatch(html, /Pedir agora|Peça agora|Fazer pedido|Comprar|Número a confirmar|Endereço a confirmar|delivery/i);
  assert.doesNotMatch(html, /codex-preview/);
});

test("catálogo interno usa apenas fotos individuais existentes", async () => {
  const source = await readFile(new URL("../src/data/categoryCatalog.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /\/capa\.webp(?:\.jpeg)?/);
  assert.match(source, /\/images\/produtos\/cervejas\/amstel\.webp\.jpeg/);
  assert.match(source, /\/images\/produtos\/destilados\/absolut\.webp\.jpeg/);
  assert.match(source, /\/images\/produtos\/refrigerantes\/cocacola\.webp\.jpeg/);
  assert.match(source, /\/images\/produtos\/agua\/agua\.webp\.jpeg/);
});

test("combos reutilizam o cadastro central e nao usam imagens genericas", async () => {
  const source = await readFile(new URL("../src/data/details.ts", import.meta.url), "utf8");
  assert.match(source, /productRegistry\.cervejaOriginal/);
  assert.match(source, /productRegistry\.cocaCola/);
  assert.match(source, /productRegistry\.monster/);
  assert.match(source, /productRegistry\.gelo/);
  assert.doesNotMatch(source, /\/details\/|unsplash|pexels|pixabay/i);
});
