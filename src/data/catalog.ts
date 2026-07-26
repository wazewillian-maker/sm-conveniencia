export type Category = "Bebidas" | "Cervejas" | "Destilados" | "Energéticos" | "Refrigerantes" | "Gelo" | "Salgadinhos" | "Doces" | "Combos";

export const categories: Category[] = ["Bebidas", "Cervejas", "Destilados", "Energéticos", "Refrigerantes", "Gelo", "Salgadinhos", "Doces", "Combos"];

// Estrutura preparada para receber o catálogo real e as fotografias da loja.
export const products = [
  { id: 1, name: "Cerveja Puro Malte", category: "Cervejas" as Category, description: "Consulte as opções disponíveis.", image: "https://images.pexels.com/photos/3028500/pexels-photo-3028500.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { id: 2, name: "Refrigerante Cola", category: "Refrigerantes" as Category, description: "Consulte tamanhos e sabores disponíveis.", image: "https://images.pexels.com/photos/4701590/pexels-photo-4701590.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { id: 3, name: "Energético Tradicional", category: "Energéticos" as Category, description: "Consulte as opções disponíveis.", image: "https://images.pexels.com/photos/7300738/pexels-photo-7300738.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { id: 4, name: "Saco de Gelo", category: "Gelo" as Category, description: "Consulte os tamanhos disponíveis.", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Mix de Salgadinhos", category: "Salgadinhos" as Category, description: "Consulte as opções disponíveis.", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Chocolate ao Leite", category: "Doces" as Category, description: "Consulte as opções disponíveis.", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Destilado Nacional", category: "Destilados" as Category, description: "Consulte as opções disponíveis.", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Água Mineral", category: "Bebidas" as Category, description: "Consulte os tamanhos disponíveis.", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85" },
];

export const promotions = [
  { ...products[0], badge: "Destaque da semana" },
  { ...products[1], badge: "Consulte opções" },
  { ...products[4], badge: "Para a resenha" },
];
