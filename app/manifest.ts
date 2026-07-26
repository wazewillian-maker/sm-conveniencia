import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SM Conveniência",
    short_name: "SM Conveniência",
    description: "Conveniência em Bombas, Bombinhas, com bebidas, churrasco e tabacaria.",
    start_url: "/",
    display: "standalone",
    background_color: "#080908",
    theme_color: "#08111c",
    lang: "pt-BR",
    icons: [
      { src: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
