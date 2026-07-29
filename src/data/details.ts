import { productRegistry, type CategoryProduct } from "./categoryCatalog";

export type DetailItem = {
  name: string;
  description: string;
  image?: string;
  availability: string;
};

export type DetailGroup = {
  id: string;
  type: "combo" | "tobacco";
  cardTitle: string;
  title: string;
  description: string;
  image?: string;
  items: DetailItem[];
  whatsappMessage: string;
  buttonLabel: string;
  ageRestricted?: boolean;
};

const subjectToAvailability = "Marcas, tamanhos e sabores sujeitos à disponibilidade na loja.";
const tobaccoAvailability = "Modelos, cores e tamanhos sujeitos à disponibilidade na loja.";
const comboItem = (
  product: CategoryProduct,
  description: string,
  name = product.name,
): DetailItem => ({
  name,
  description,
  image: product.image,
  availability: subjectToAvailability,
});

export const comboDetails: DetailGroup[] = [
  {
    id: "combo-churrasco",
    type: "combo",
    cardTitle: "Combo Churrasco",
    title: "Tudo para o seu churrasco",
    description: "Uma seleção prática para consultar tudo o que pode completar o seu churrasco, sem perder tempo.",
    image: "/images/combos/combo churrasco/capa (3).jpeg",
    whatsappMessage: "Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os produtos disponíveis para o Combo Churrasco.",
    buttonLabel: "Consultar itens pelo WhatsApp",
    items: [
      comboItem(productRegistry.carvao, "Consulte as opções disponíveis para preparar o churrasco."),
      comboItem(productRegistry.gelo, "Opções para manter bebidas e acompanhamentos bem gelados."),
      comboItem(productRegistry.cervejaOriginal, "Consulte as variedades disponíveis atualmente na loja."),
      comboItem(productRegistry.cocaCola, "Consulte as opções disponíveis para acompanhar o churrasco."),
    ],
  },
  {
    id: "combo-resenha",
    type: "combo",
    cardTitle: "Combo Resenha",
    title: "Itens para a sua resenha",
    description: "Consulte uma seleção de energéticos, salgadinhos e gelo para reunir a galera.",
    image: "/images/combos/combo resenha/capa (2).jpeg",
    whatsappMessage: "Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os itens disponíveis para o Combo Resenha.",
    buttonLabel: "Consultar itens pelo WhatsApp",
    items: [
      comboItem(productRegistry.monster, "Consulte as opções disponíveis na loja."),
      comboItem(productRegistry.salgadinhos, "Opções práticas para compartilhar."),
      comboItem(productRegistry.gelo, "Para manter as bebidas geladas durante o encontro."),
    ],
  },
  {
    id: "combo-energetico",
    type: "combo",
    cardTitle: "Combo Energético",
    title: "Energia para o seu momento",
    description: "Consulte energéticos, gelo e acompanhamentos disponíveis na SM.",
    image: "/images/combos/combo energetico/capa (1).jpeg",
    whatsappMessage: "Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os itens disponíveis do Combo Energético.",
    buttonLabel: "Consultar itens pelo WhatsApp",
    items: [
      comboItem(productRegistry.monster, "Consulte as variedades disponíveis."),
      comboItem(productRegistry.gelo, "Opções para manter as bebidas geladas."),
      comboItem(productRegistry.salgadinhos, "Consulte os snacks disponíveis na loja."),
    ],
  },
];

const genericTobaccoDetail = (id: string, name: string, description: string): DetailGroup => ({
  id,
  type: "tobacco",
  cardTitle: name,
  title: name,
  description,
  whatsappMessage: `Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os produtos disponíveis na categoria ${name}.`,
  buttonLabel: "Consultar pelo WhatsApp",
  ageRestricted: true,
  items: [
    {
      name: "Opções disponíveis na loja",
      description: "A equipe da SM pode informar as opções disponíveis atualmente.",
      availability: tobaccoAvailability,
    },
  ],
});

export const tobaccoDetails: DetailGroup[] = [
  genericTobaccoDetail("cigarros", "Cigarros", "Consulte as opções disponíveis atualmente na loja."),
  {
    id: "narguiles",
    type: "tobacco",
    cardTitle: "Narguilés",
    title: "Narguilés",
    description: "Conheça as categorias de narguilé que podem estar disponíveis na SM.",
    whatsappMessage: "Olá! Encontrei a SM Conveniência pelo site e gostaria de conhecer os modelos de narguilé disponíveis.",
    buttonLabel: "Consultar narguilés disponíveis",
    ageRestricted: true,
    items: ["Narguilés compactos", "Narguilés médios", "Narguilés grandes", "Narguilés completos", "Peças e reposição"].map(name => ({
      name,
      description: "Espaço preparado para receber as informações dos modelos reais.",
      availability: tobaccoAvailability,
    })),
  },
  {
    ...genericTobaccoDetail("essencias", "Essências", "Consulte os sabores disponíveis atualmente na loja."),
    items: [{
      name: "Sabores disponíveis",
      description: "Consulte os sabores disponíveis atualmente na loja.",
      availability: tobaccoAvailability,
    }],
  },
  genericTobaccoDetail("carvao-narguile", "Carvão para narguilé", "Consulte os tipos disponíveis atualmente na loja."),
  {
    ...genericTobaccoDetail("acessorios", "Acessórios", "Consulte acessórios e peças disponíveis para narguilé."),
    items: ["Rosh", "Mangueiras", "Piteiras", "Pegadores", "Papel alumínio", "Peças de reposição"].map(name => ({
      name,
      description: "Consulte as opções disponíveis atualmente na loja.",
      availability: tobaccoAvailability,
    })),
  },
  genericTobaccoDetail("piteiras", "Piteiras", "Consulte as opções disponíveis atualmente na loja."),
  genericTobaccoDetail("papel-aluminio", "Papel alumínio", "Consulte as opções disponíveis atualmente na loja."),
  genericTobaccoDetail("pegadores", "Pegadores", "Consulte as opções disponíveis atualmente na loja."),
  genericTobaccoDetail("rosh", "Rosh", "Consulte as opções disponíveis atualmente na loja."),
  genericTobaccoDetail("mangueiras", "Mangueiras", "Consulte as opções disponíveis atualmente na loja."),
];
