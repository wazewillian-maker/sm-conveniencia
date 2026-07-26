export type DetailItem = {
  name: string;
  description: string;
  image: string;
  availability: string;
};

export type DetailGroup = {
  id: string;
  type: "combo" | "tobacco";
  cardTitle: string;
  title: string;
  description: string;
  image: string;
  items: DetailItem[];
  whatsappMessage: string;
  buttonLabel: string;
  ageRestricted?: boolean;
};

const subjectToAvailability = "Marcas, tamanhos e sabores sujeitos à disponibilidade na loja.";
const tobaccoAvailability = "Modelos, cores e tamanhos sujeitos à disponibilidade na loja.";

export const comboDetails: DetailGroup[] = [
  {
    id: "combo-churrasco",
    type: "combo",
    cardTitle: "Combo Churrasco",
    title: "Tudo para o seu churrasco",
    description: "Uma seleção prática para consultar tudo o que pode completar o seu churrasco, sem perder tempo.",
    image: "/details/churrasco.jpg",
    whatsappMessage: "Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os produtos disponíveis para o Combo Churrasco.",
    buttonLabel: "Consultar itens pelo WhatsApp",
    items: [
      { name: "Carvão", description: "Consulte as opções disponíveis para preparar o churrasco.", image: "/details/carvao.jpg", availability: subjectToAvailability },
      { name: "Gelo", description: "Opções para manter bebidas e acompanhamentos bem gelados.", image: "/details/gelo.jpg", availability: subjectToAvailability },
      { name: "Cervejas", description: "Consulte as variedades disponíveis atualmente na loja.", image: "/details/cervejas.jpg", availability: subjectToAvailability },
      { name: "Refrigerantes", description: "Consulte as opções disponíveis para acompanhar o churrasco.", image: "/details/refrigerantes.jpg", availability: subjectToAvailability },
    ],
  },
  {
    id: "combo-resenha",
    type: "combo",
    cardTitle: "Combo Resenha",
    title: "Itens para a sua resenha",
    description: "Consulte uma seleção de energéticos, salgadinhos e gelo para reunir a galera.",
    image: "/details/resenha.jpg",
    whatsappMessage: "Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os itens disponíveis para o Combo Resenha.",
    buttonLabel: "Consultar itens pelo WhatsApp",
    items: [
      { name: "Energéticos", description: "Consulte as opções disponíveis na loja.", image: "/details/energeticos.jpg", availability: subjectToAvailability },
      { name: "Salgadinhos", description: "Opções práticas para compartilhar.", image: "/details/resenha.jpg", availability: subjectToAvailability },
      { name: "Gelo", description: "Para manter as bebidas geladas durante o encontro.", image: "/details/gelo.jpg", availability: subjectToAvailability },
    ],
  },
  {
    id: "combo-filmes",
    type: "combo",
    cardTitle: "Combo Noite de Filmes",
    title: "Para acompanhar o filme",
    description: "Consulte bebidas e opções para beliscar durante a sua sessão.",
    image: "/details/filmes.jpg",
    whatsappMessage: "Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os itens disponíveis para uma noite de filmes.",
    buttonLabel: "Consultar itens pelo WhatsApp",
    items: [
      { name: "Refrigerantes", description: "Consulte as opções disponíveis na loja.", image: "/details/refrigerantes.jpg", availability: subjectToAvailability },
      { name: "Pipoca e salgadinhos", description: "Opções práticas para acompanhar o filme.", image: "/details/filmes.jpg", availability: subjectToAvailability },
      { name: "Doces", description: "Consulte as opções disponíveis atualmente.", image: "/details/filmes.jpg", availability: subjectToAvailability },
    ],
  },
  {
    id: "combo-energetico",
    type: "combo",
    cardTitle: "Combo Energético",
    title: "Energia para o seu momento",
    description: "Consulte energéticos, gelo e acompanhamentos disponíveis na SM.",
    image: "/details/energeticos.jpg",
    whatsappMessage: "Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os itens disponíveis do Combo Energético.",
    buttonLabel: "Consultar itens pelo WhatsApp",
    items: [
      { name: "Energéticos", description: "Consulte as variedades disponíveis.", image: "/details/energeticos.jpg", availability: subjectToAvailability },
      { name: "Gelo", description: "Opções para manter as bebidas geladas.", image: "/details/gelo.jpg", availability: subjectToAvailability },
      { name: "Acompanhamentos", description: "Consulte os snacks disponíveis na loja.", image: "/details/resenha.jpg", availability: subjectToAvailability },
    ],
  },
];

const genericTobaccoDetail = (id: string, name: string, description: string): DetailGroup => ({
  id,
  type: "tobacco",
  cardTitle: name,
  title: name,
  description,
  image: "/details/tabacaria.jpg",
  whatsappMessage: `Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os produtos disponíveis na categoria ${name}.`,
  buttonLabel: "Consultar pelo WhatsApp",
  ageRestricted: true,
  items: [
    {
      name: "Opções disponíveis na loja",
      description: "A equipe da SM pode informar as opções disponíveis atualmente.",
      image: "/details/tabacaria.jpg",
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
    image: "/details/narguile.jpg",
    whatsappMessage: "Olá! Encontrei a SM Conveniência pelo site e gostaria de conhecer os modelos de narguilé disponíveis.",
    buttonLabel: "Consultar narguilés disponíveis",
    ageRestricted: true,
    items: ["Narguilés compactos", "Narguilés médios", "Narguilés grandes", "Narguilés completos", "Peças e reposição"].map(name => ({
      name,
      description: "Espaço preparado para receber as informações dos modelos reais.",
      image: "/details/narguile.jpg",
      availability: tobaccoAvailability,
    })),
  },
  {
    ...genericTobaccoDetail("essencias", "Essências", "Consulte os sabores disponíveis atualmente na loja."),
    items: [{
      name: "Sabores disponíveis",
      description: "Consulte os sabores disponíveis atualmente na loja.",
      image: "/details/tabacaria.jpg",
      availability: tobaccoAvailability,
    }],
  },
  genericTobaccoDetail("carvao-narguile", "Carvão para narguilé", "Consulte os tipos disponíveis atualmente na loja."),
  {
    ...genericTobaccoDetail("acessorios", "Acessórios", "Consulte acessórios e peças disponíveis para narguilé."),
    items: ["Rosh", "Mangueiras", "Piteiras", "Pegadores", "Papel alumínio", "Peças de reposição"].map(name => ({
      name,
      description: "Consulte as opções disponíveis atualmente na loja.",
      image: "/details/tabacaria.jpg",
      availability: tobaccoAvailability,
    })),
  },
  genericTobaccoDetail("piteiras", "Piteiras", "Consulte as opções disponíveis atualmente na loja."),
  genericTobaccoDetail("papel-aluminio", "Papel alumínio", "Consulte as opções disponíveis atualmente na loja."),
  genericTobaccoDetail("pegadores", "Pegadores", "Consulte as opções disponíveis atualmente na loja."),
  genericTobaccoDetail("rosh", "Rosh", "Consulte as opções disponíveis atualmente na loja."),
  genericTobaccoDetail("mangueiras", "Mangueiras", "Consulte as opções disponíveis atualmente na loja."),
];
