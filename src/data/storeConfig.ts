export const storeConfig = {
  name: "SM Conveniência",
  whatsapp: "",
  instagram: "",
  address: "Endereço a confirmar",
  hours: "Horários a confirmar",
  mapsUrl: "",
  mapsEmbedUrl: "",
  whatsappDisplay: "Número a confirmar",
  instagramDisplay: "Perfil a confirmar",
  nextDevUrl: "https://nextdev.com.br",
};

export function whatsappLink(message = "Olá, vim pelo site da SM Conveniência e gostaria de fazer um pedido.") {
  const text = encodeURIComponent(message);
  return storeConfig.whatsapp
    ? `https://wa.me/${storeConfig.whatsapp.replace(/\D/g, "")}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
