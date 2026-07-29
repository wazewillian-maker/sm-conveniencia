import type { Category } from "./catalog";

export type CategoryProduct = {
  id?: string;
  name: string;
  image?: string;
};

export const productRegistry = {
  agua: { id: "agua", name: "Água", image: "/images/produtos/agua/agua.webp.jpeg" },
  cervejaOriginal: { id: "cerveja-original", name: "Original", image: "/images/produtos/cervejas/original.webp.jpeg" },
  cocaCola: { id: "coca-cola", name: "Coca-Cola", image: "/images/produtos/refrigerantes/cocacola.webp.jpeg" },
  monster: { id: "monster", name: "Monster", image: "/images/produtos/energeticos/monster.webp.jpeg" },
  redBull: { id: "red-bull", name: "Red Bull", image: "/images/produtos/energeticos/redbull.webp.jpeg" },
  gelo: { id: "gelo", name: "Gelo" },
  carvao: { id: "carvao", name: "Carvão" },
  salgadinhos: { id: "salgadinhos", name: "Salgadinhos" },
  chocolate: { id: "chocolate", name: "Chocolate" },
} satisfies Record<string, CategoryProduct>;

export const categoryDisplayNames: Record<Category, string> = {
  Bebidas: "Água Mineral",
  Cervejas: "Cervejas",
  Destilados: "Destilados",
  Energéticos: "Energéticos",
  Refrigerantes: "Refrigerantes",
  Gelo: "Gelo",
  Salgadinhos: "Salgadinhos",
  Doces: "Chocolates",
  Combos: "Combos",
};

export const categoryCatalog: Record<Category, CategoryProduct[]> = {
  Bebidas: [
    { name: "Água", image: "/images/produtos/agua/agua.webp.jpeg" },
  ],
  Cervejas: [
    { name: "Amstel", image: "/images/produtos/cervejas/amstel.webp.jpeg" },
    { name: "Antartida", image: "/images/produtos/cervejas/antartida.webp.jpeg" },
    { name: "Budweiser", image: "/images/produtos/cervejas/budwaiser.webp.jpeg" },
    { name: "Corona", image: "/images/produtos/cervejas/corona.webp.jpeg" },
    { name: "Extra", image: "/images/produtos/cervejas/extra.webp.jpeg" },
    { name: "Eisenbahn", image: "/images/produtos/cervejas/haisenban.webp.jpeg" },
    { name: "Heineken", image: "/images/produtos/cervejas/heineken.webp.jpeg" },
    { name: "Heineken Lata", image: "/images/produtos/cervejas/heinekenlata.webp.jpeg" },
    { name: "Original", image: "/images/produtos/cervejas/original.webp.jpeg" },
    { name: "Skol", image: "/images/produtos/cervejas/skol.webp.jpeg" },
    { name: "Skol Beats", image: "/images/produtos/cervejas/skolbeats.webp.jpeg" },
    { name: "Sol", image: "/images/produtos/cervejas/sol.webp.jpeg" },
  ],
  Destilados: [
    { name: "Absolut", image: "/images/produtos/destilados/absolut.webp.jpeg" },
    { name: "Bacardi", image: "/images/produtos/destilados/bacardi.webp.jpeg" },
    { name: "Brasilberg", image: "/images/produtos/destilados/brasilberg.webp.jpeg" },
    { name: "Busca Brisa", image: "/images/produtos/destilados/buscabrisa.webp.jpeg" },
    { name: "Campari", image: "/images/produtos/destilados/campari.webp.jpeg" },
    { name: "Cavalo Branco", image: "/images/produtos/destilados/cavalobranco.webp.jpeg" },
    { name: "Champagne", image: "/images/produtos/destilados/champagne.webp.jpeg" },
    { name: "Cinzano", image: "/images/produtos/destilados/cinzano.webp.jpeg" },
    { name: "Gin Maromba", image: "/images/produtos/destilados/ginmaromba.webp.jpeg" },
    { name: "Intencion", image: "/images/produtos/destilados/intencion.webp.jpeg" },
    { name: "Jack Daniel's", image: "/images/produtos/destilados/jackdaniels.webp.jpeg" },
    { name: "José Cuervo", image: "/images/produtos/destilados/josecuervo.webp.jpeg" },
    { name: "Jurupinga", image: "/images/produtos/destilados/jurupinga.webp.jpeg" },
    { name: "Martini", image: "/images/produtos/destilados/martini.webp.jpeg" },
    { name: "Passport", image: "/images/produtos/destilados/passport.webp.jpeg" },
    { name: "Red Label", image: "/images/produtos/destilados/redlabel.webp.jpeg" },
    { name: "Smirnoff", image: "/images/produtos/destilados/smirnoff.webp.jpeg" },
    { name: "Tequilero", image: "/images/produtos/destilados/tequilero.webp.jpeg" },
  ],
  Energéticos: [
    { name: "Bally Lata", image: "/images/produtos/energeticos/ballylata.webp.jpeg" },
    { name: "Bally Litro", image: "/images/produtos/energeticos/ballylitro.webp.jpeg" },
    { name: "Monster", image: "/images/produtos/energeticos/monster.webp.jpeg" },
    { name: "Monster Diversos", image: "/images/produtos/energeticos/monsterdiversos.webp.jpeg" },
    { name: "Red Bull", image: "/images/produtos/energeticos/redbull.webp.jpeg" },
  ],
  Refrigerantes: [
    { name: "Antartida", image: "/images/produtos/refrigerantes/antartida.webp.jpeg" },
    { name: "Coca-Cola", image: "/images/produtos/refrigerantes/cocacola.webp.jpeg" },
    { name: "Fanta", image: "/images/produtos/refrigerantes/fanta.webp.jpeg" },
    { name: "Kuat", image: "/images/produtos/refrigerantes/kuat.webp.jpeg" },
    { name: "Schweppes", image: "/images/produtos/refrigerantes/shuepps.webp.jpeg" },
  ],
  Gelo: [productRegistry.gelo],
  Salgadinhos: [productRegistry.salgadinhos],
  Doces: [productRegistry.chocolate],
  Combos: [],
};
