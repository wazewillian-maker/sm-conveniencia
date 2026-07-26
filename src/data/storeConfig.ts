export const storeConfig = {
  name: "SM Conveniência",
  whatsapp: "554792930951",
  address: "Av. Falcão, nº 170, Sala 03 — Bombas, Bombinhas – SC",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Falcão,+170,+Sala+03,+Bombas,+Bombinhas,+SC",
  mapsEmbedUrl: "https://www.google.com/maps?q=Av.%20Falc%C3%A3o%2C%20170%2C%20Sala%2003%2C%20Bombas%2C%20Bombinhas%2C%20SC&output=embed",
  whatsappDisplay: "(47) 9293-0951",
  weekdayHours: "Segunda a sexta: 14h às 00h",
  weekendHours: "Sábados, domingos e feriados: 11h às 00h",
  nextDevUrl: "https://nextdev.com.br",
};

export function whatsappLink(message = "Olá! Encontrei a SM Conveniência pelo site e gostaria de mais informações.") {
  const text = encodeURIComponent(message);
  return `https://wa.me/${storeConfig.whatsapp}?text=${text}`;
}
