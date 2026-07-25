"use client";

import { useEffect, useMemo, useState } from "react";
import { AtSign, Beer, BottleWine, Candy, ChevronRight, Clock3, GlassWater, IceCreamBowl, MapPin, Menu, MessageCircle, Package, Search, ShoppingBag, Sparkles, Star, X, Zap } from "lucide-react";
import { categories, combos, products, promotions, type Category } from "../src/data/catalog";
import { storeConfig, whatsappLink } from "../src/data/storeConfig";

const categoryIcons = [GlassWater, Beer, BottleWine, Zap, GlassWater, IceCreamBowl, Package, Candy, ShoppingBag];
const moments = [
  { title: "Para o churrasco", text: "Bebidas geladas, gelo e acompanhamentos.", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1000&q=85" },
  { title: "Para a resenha", text: "Tudo pronto para reunir a galera.", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=85" },
  { title: "Para acompanhar o filme", text: "Snacks, doces e bebidas no clima certo.", image: "https://images.unsplash.com/photo-1574267432644-f610f8be8e76?auto=format&fit=crop&w=1000&q=85" },
  { title: "Para refrescar a noite", text: "Gelo, energéticos e bebidas bem geladas.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=85" },
];

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const orderLink = (name?: string) => whatsappLink(name ? `Olá, vim pelo site da SM Conveniência e gostaria de pedir: ${name}.` : undefined);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<"Todos" | Category>("Todos");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => products.filter(p => (active === "Todos" || p.category === active) && p.name.toLowerCase().includes(query.toLowerCase())), [active, query]);
  const jumpToCatalog = (category: Category) => { setActive(category); document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" }); };

  useEffect(() => {
    const seenLoader = sessionStorage.getItem("sm-loader-seen");
    if (!seenLoader) {
      sessionStorage.setItem("sm-loader-seen", "true");
    }
    const timer = window.setTimeout(() => setLoading(false), seenLoader ? 0 : 950);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(
      ".section-head, .category-grid > *, .promo-grid > *, .moments > *, .catalog-tools, .product-grid > *, .combo-grid > *, .about > *, .location > *, .final-cta > *, footer > *",
    );
    targets.forEach((element, index) => {
      element.classList.add("reveal");
      (element as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 55}ms`);
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach(element => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    targets.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <main>
      <div className={`loader ${loading ? "is-loading" : "is-hidden"}`} aria-hidden={!loading}>
        <div className="loader-brand"><span>SM</span><b>ConveniÃªncia</b></div>
        <i />
      </div>
      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <a href="#inicio" className="brand"><span>SM</span><b>Conveniência</b></a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          {["Início", "Promoções", "Catálogo", "Sobre", "Localização"].map(item => <a key={item} href={`#${item.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="button button-sm" href={orderLink()} target="_blank">Pedir agora</a>
        </nav>
        <button className="menu" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-bg" />
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15}/> Sua noite, mais completa</p>
          <h1>Tudo o que você precisa, <em>quando você precisa.</em></h1>
          <p className="lead">Bebidas, gelo, snacks, doces e muito mais para deixar qualquer momento completo.</p>
          <div className="hero-actions"><a className="button" href="#promocoes">Ver promoções <ChevronRight /></a><a className="button ghost" href={orderLink()} target="_blank"><MessageCircle /> Pedir pelo WhatsApp</a></div>
          <div className="hero-points"><span><Package/> Variedade de produtos</span><span><Zap/> Atendimento rápido</span><span><MessageCircle/> Pedidos pelo WhatsApp</span></div>
        </div>
        <div className="hero-card"><span>SM seleciona</span><strong>O essencial da sua noite, em um só lugar.</strong><small>Escolha. Peça. Aproveite.</small></div>
      </section>

      <section className="section category-section">
        <div className="section-head"><div><p className="eyebrow">Encontre rápido</p><h2>O que vai bem agora?</h2></div><p>Toque em uma categoria e vá direto ao que procura.</p></div>
        <div className="category-grid">{categories.map((cat, i) => { const Icon = categoryIcons[i]; return <button key={cat} onClick={() => jumpToCatalog(cat)}><Icon/><span>{cat}</span><ChevronRight/></button>})}</div>
      </section>

      <section id="promocoes" className="section dark-band">
        <div className="section-head"><div><p className="eyebrow">Oportunidades da vez</p><h2>Promoções da SM</h2></div><p>Seleções provisórias para você visualizar como as ofertas vão aparecer.</p></div>
        <div className="promo-grid">{promotions.map(item => <article className="promo-card" key={item.id}><div className="product-image"><img src={item.image} alt={item.name}/><span className="badge">{item.badge}</span></div><div className="card-body"><small>{item.category}</small><h3>{item.name}</h3><p>{item.description}</p><div className="price"><s>{money(item.oldPrice)}</s><strong>{money(item.price)}</strong></div><a className="button full" href={orderLink(item.name)} target="_blank">Pedir agora <MessageCircle/></a></div></article>)}</div>
        <p className="demo-note">Produtos e valores demonstrativos — consulte disponibilidade e valor atual no atendimento.</p>
      </section>

      <section className="section">
        <div className="section-head"><div><p className="eyebrow">Do seu jeito</p><h2>Escolhas que combinam com seu momento</h2></div><p>Mais que produtos: soluções práticas para cada ocasião.</p></div>
        <div className="moments">{moments.map(m => <article key={m.title} style={{backgroundImage:`linear-gradient(180deg, transparent, rgba(5,5,5,.94)), url(${m.image})`}}><div><h3>{m.title}</h3><p>{m.text}</p><a href="#catalogo">Explorar seleção <ChevronRight/></a></div></article>)}</div>
      </section>

      <section id="catalogo" className="section catalog">
        <div className="section-head"><div><p className="eyebrow">Escolha sem pressa</p><h2>Catálogo SM</h2></div><p>Busque, filtre e mande seu pedido direto para o atendimento.</p></div>
        <div className="catalog-tools"><label><Search/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar no catálogo..." /></label><div className="filters">{(["Todos", ...categories] as const).map(cat => <button className={active === cat ? "active" : ""} onClick={() => setActive(cat)} key={cat}>{cat}</button>)}</div></div>
        <div className="product-grid">{filtered.map(item => <article className="product-card" key={item.id}><img src={item.image} alt={item.name}/><div className="card-body"><small>{item.category}</small><h3>{item.name}</h3><p>{item.description}</p><div className="product-bottom"><strong>{money(item.price)}</strong><a href={orderLink(item.name)} target="_blank" aria-label={`Pedir ${item.name}`}><MessageCircle/></a></div></div></article>)}</div>
        {!filtered.length && <div className="empty">Nenhum produto encontrado nesta busca.</div>}
        <p className="demo-note">Catálogo demonstrativo. Produtos, disponibilidade e preços serão confirmados no atendimento.</p>
      </section>

      <section id="combos" className="section dark-band">
        <div className="section-head"><div><p className="eyebrow">Tudo combinado</p><h2>Combos para facilitar</h2></div><p>Seleções prontas para você resolver o momento em poucos toques.</p></div>
        <div className="combo-grid">{combos.map(combo => <article className="combo-card" key={combo.name}><img src={combo.image} alt={combo.name}/><div className="card-body"><h3>{combo.name}</h3><ul>{combo.items.map(i => <li key={i}><Star/> {i}</li>)}</ul><div className="combo-price"><span>A partir de</span><strong>{money(combo.price)}</strong></div><a className="button full" href={orderLink(combo.name)} target="_blank">Quero este combo</a></div></article>)}</div>
        <p className="demo-note">Combos e preços provisórios, sujeitos à confirmação.</p>
      </section>

      <section id="sobre" className="section about">
        <div className="about-visual"><div><span>SM</span><p>Praticidade que acompanha o seu ritmo.</p></div></div>
        <div><p className="eyebrow">Sobre a SM</p><h2>Seu momento pede praticidade</h2><p className="about-copy">A SM Conveniência nasceu para tornar seus momentos mais práticos. Em um só lugar, você encontra bebidas, snacks, gelo, doces e diversas opções para completar sua noite, encontro ou comemoração.</p><div className="features">{["Variedade", "Facilidade", "Atendimento próximo", "Pedidos rápidos", "Opções para cada ocasião"].map(x => <span key={x}><Star/>{x}</span>)}</div></div>
      </section>

      <section id="localizacao" className="section location">
        <div className="map-placeholder"><MapPin/><strong>Localização em configuração</strong><span>O mapa será exibido assim que o endereço for confirmado.</span></div>
        <div className="location-info"><p className="eyebrow">Venha até a SM</p><h2>Localização e funcionamento</h2><div className="info-row"><MapPin/><div><small>Endereço</small><strong>{storeConfig.address}</strong></div></div><div className="info-row"><Clock3/><div><small>Funcionamento</small><strong>{storeConfig.hours}</strong></div></div><div className="info-row"><MessageCircle/><div><small>WhatsApp</small><strong>Número a confirmar</strong></div></div><div className="location-actions"><a className={`button ${!storeConfig.mapsUrl ? "disabled" : ""}`} href={storeConfig.mapsUrl || undefined}>Como chegar</a><a className={`button ghost ${!storeConfig.instagram ? "disabled" : ""}`} href={storeConfig.instagram || undefined}><AtSign/> Instagram</a></div></div>
      </section>

      <section className="final-cta"><p className="eyebrow">Seu pedido começa aqui</p><h2>Bateu a vontade? <em>A SM resolve.</em></h2><p>Escolha seus favoritos e fale com a gente pelo WhatsApp.</p><a className="button" href={orderLink()} target="_blank"><MessageCircle/> Iniciar meu pedido</a></section>
      <footer><a href="#inicio" className="brand"><span>SM</span><b>Conveniência</b></a><div className="footer-links"><a href="#promocoes">Promoções</a><a href="#catalogo">Catálogo</a><a href="#sobre">Sobre</a><a href="#localizacao">Localização</a></div><div className="footer-meta"><span>WhatsApp a confirmar</span><span>Instagram a confirmar</span><span>{storeConfig.address}</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SM Conveniência. Todos os direitos reservados.</span><span>Desenvolvido por Next Dev</span></div></footer>
      <a className="float-whatsapp" href={orderLink()} target="_blank" aria-label="Pedir pelo WhatsApp"><MessageCircle/></a>
    </main>
  );
}
