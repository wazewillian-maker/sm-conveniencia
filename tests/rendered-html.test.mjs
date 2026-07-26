import assert from "node:assert/strict";
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
  assert.match(html, /Ver detalhes de Narguilés/);
  assert.match(html, /Conhecer a categoria/);
  assert.match(html, /\/details\/churrasco\.jpg/);
  assert.match(html, /\/details\/narguile\.jpg/);
  assert.match(html, /Carvão/);
  assert.doesNotMatch(html, /Escolhas que combinam com seu momento|Explorar seleção/);
  assert.doesNotMatch(html, /R\$\s|A partir de/);
  assert.doesNotMatch(html, /Pedir agora|Peça agora|Fazer pedido|Comprar|Número a confirmar|Endereço a confirmar|delivery/i);
  assert.doesNotMatch(html, /codex-preview/);
});
