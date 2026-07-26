export type Category = "Bebidas" | "Cervejas" | "Destilados" | "Energéticos" | "Refrigerantes" | "Gelo" | "Salgadinhos" | "Doces" | "Combos";

export const categories: Category[] = ["Bebidas", "Cervejas", "Destilados", "Energéticos", "Refrigerantes", "Gelo", "Salgadinhos", "Doces", "Combos"];

// Conteúdo demonstrativo: substitua nomes, preços e imagens pelos dados reais.
export const products = [
  { id: 1, name: "Cerveja Puro Malte", category: "Cervejas" as Category, description: "Gelada, lata 350 ml", price: 5.99, image: "https://images.pexels.com/photos/3028500/pexels-photo-3028500.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { id: 2, name: "Refrigerante Cola", category: "Refrigerantes" as Category, description: "Garrafa 2 litros", price: 10.9, image: "https://images.pexels.com/photos/4701590/pexels-photo-4701590.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { id: 3, name: "Energético Tradicional", category: "Energéticos" as Category, description: "Lata 473 ml", price: 12.9, image: "https://images.pexels.com/photos/7300738/pexels-photo-7300738.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { id: 4, name: "Saco de Gelo", category: "Gelo" as Category, description: "Gelo filtrado, 3 kg", price: 9.5, image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Mix de Salgadinhos", category: "Salgadinhos" as Category, description: "Seleção crocante", price: 8.9, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Chocolate ao Leite", category: "Doces" as Category, description: "Barra 90 g", price: 7.5, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Destilado Nacional", category: "Destilados" as Category, description: "Garrafa 1 litro", price: 39.9, image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Água Mineral", category: "Bebidas" as Category, description: "Garrafa 500 ml", price: 3.5, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85" },
];

export const promotions = [
  { ...products[0], oldPrice: 7.49, price: 5.99, badge: "Oferta da semana" },
  { ...products[1], oldPrice: 12.9, price: 10.9, badge: "Preço especial" },
  { ...products[4], oldPrice: 10.9, price: 8.9, badge: "Leve para a resenha" },
];

export const combos = [
  { name: "Seu churrasco começa aqui", eyebrow: "Combo Churrasco", description: "Encontre carvão, gelo, cervejas e refrigerantes para deixar seu churrasco completo, sem perder tempo.", items: ["Carvão", "Gelo", "Cervejas", "Refrigerantes"], message: "Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os produtos disponíveis para churrasco.", buttonLabel: "Consultar produtos", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=85" },
  { name: "Combo Resenha", items: ["Energéticos", "Salgadinhos", "Gelo"], price: 54.9, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=85" },
  { name: "Combo Noite de Filmes", items: ["Refrigerante", "Pipoca", "Chocolate"], price: 34.9, image: "https://images.pexels.com/photos/8972769/pexels-photo-8972769.jpeg?auto=compress&cs=tinysrgb&w=1000" },
  { name: "Combo Energético", items: ["2 energéticos", "Gelo", "Snack"], price: 39.9, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=85" },
];
