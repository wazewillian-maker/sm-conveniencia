export type Category = "Bebidas" | "Cervejas" | "Destilados" | "Energéticos" | "Refrigerantes" | "Gelo" | "Salgadinhos" | "Doces" | "Combos";

export const categories: Category[] = ["Bebidas", "Cervejas", "Destilados", "Energéticos", "Refrigerantes", "Gelo", "Salgadinhos", "Doces", "Combos"];

// Fotografias reais da SM Conveniência, organizadas por categoria em public/images.
export const products = [
  { id: 1, name: "Cerveja", category: "Cervejas" as Category, description: "Consulte as opções disponíveis.", image: "/images/produtos/cervejas/capa.webp.jpeg" },
  { id: 2, name: "Refrigerante", category: "Refrigerantes" as Category, description: "Consulte sabores e tamanhos.", image: "/images/produtos/refrigerantes/capa.webp.jpeg" },
  { id: 3, name: "Energético", category: "Energéticos" as Category, description: "Consulte as opções disponíveis.", image: "/images/produtos/energeticos/capa.webp.jpeg" },
  { id: 4, name: "Gelo", category: "Gelo" as Category, description: "Disponível em diversos tamanhos.", image: "/images/produtos/gelo/capa.webp" },
  { id: 5, name: "Salgadinhos", category: "Salgadinhos" as Category, description: "Diversas opções disponíveis.", image: "/images/produtos/salgadinhos/capa.webp.jpeg" },
  { id: 6, name: "Chocolate", category: "Doces" as Category, description: "Consulte os sabores.", image: "/images/produtos/chocolates/capa.webp.jpeg" },
  { id: 7, name: "Destilados", category: "Destilados" as Category, description: "Consulte as opções disponíveis.", image: "/images/produtos/destilados-nacionais/capa.webp.jpeg" },
  { id: 8, name: "Água Mineral", category: "Bebidas" as Category, description: "Com e sem gás.", image: "/images/produtos/agua-mineral/capa.webp.jpeg" },
];

export const promotions = [
  { ...products[0], badge: "Destaque da semana" },
  { ...products[1], badge: "Consulte opções" },
  { ...products[4], badge: "Para a resenha" },
];
