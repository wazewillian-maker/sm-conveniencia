"use client";
/* As imagens comerciais são remotas e serão substituídas pelas fotos reais da loja. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { Beer, BottleWine, Candy, ChevronRight, Cigarette, Clock3, GlassWater, IceCreamBowl, MapPin, Menu, MessageCircle, Package, Search, ShieldAlert, ShoppingBag, Sparkles, Star, X, Zap } from "lucide-react";
import { categories, products, promotions, type Category } from "../src/data/catalog";
import { comboDetails, tobaccoDetails, type DetailGroup } from "../src/data/details";
import { storeConfig, whatsappLink } from "../src/data/storeConfig";
import { DetailModal } from "./components/DetailModal";

const categoryIcons = [GlassWater, Beer, BottleWine, Zap, GlassWater, IceCreamBowl, Package, Candy, ShoppingBag];

const contactLink = (name?: string) => whatsappLink(name ? `Olá! Encontrei a SM Conveniência pelo site e gostaria de mais informações sobre: ${name}.` : undefined);
const tobaccoLink = whatsappLink("Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os produtos disponíveis na tabacaria.");

function Brand() {
  return <><img className="brand-logo" src="/brand/logo-sm-conveniencia.png" alt="Logo da SM Conveniência"/><b>SM Conveniência</b></>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<"Todos" | Category>("Todos");
  const [query, setQuery] = useState("");
  const [selectedDetail, setSelectedDetail] = useState<DetailGroup | null>(null);
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
      ".section-head, .category-grid > *, .promo-grid > *, .catalog-tools, .product-grid > *, .tobacco-grid > *, .combo-grid > *, .about > *, .location > *, .final-cta > *, footer > *",
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
        <div className="loader-brand"><span>SM</span><b>Conveniência</b></div>
        <i />
      </div>
      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <a href="#inicio" className="brand" aria-label="Voltar ao início"><Brand/></a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          {["Início", "Promoções", "Catálogo", "Tabacaria", "Sobre", "Localização"].map(item => <a key={item} href={`#${item.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="button button-sm" href={contactLink()} target="_blank" rel="noopener noreferrer">Entre em contato</a>
        </nav>
        <button className="menu" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-bg" />
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15}/> Sua noite, mais completa</p>
          <h1>Tudo o que você precisa, <em>quando você precisa.</em></h1>
          <p className="lead">Bebidas geladas, gelo, salgadinhos, doces e muito mais para qualquer momento.</p>
          <div className="hero-status"><span><MapPin/> Bombas • Bombinhas/SC</span><span><Clock3/> Aberto todos os dias até meia-noite</span></div>
          <div className="hero-actions"><a className="button" href={contactLink()} target="_blank" rel="noopener noreferrer"><MessageCircle/> Entre em contato</a><a className="button ghost" href={storeConfig.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin/> Como chegar</a></div>
          <div className="hero-points"><span><Package/> Variedade de produtos</span><span><Zap/> Atendimento rápido</span><span><MessageCircle/> Atendimento pelo WhatsApp</span></div>
        </div>
        <div className="hero-card"><span>SM seleciona</span><strong>O essencial da sua noite, em um só lugar.</strong><small>Escolha. Consulte. Aproveite.</small></div>
      </section>

      <section className="section category-section">
        <div className="section-head"><div><p className="eyebrow">Encontre rápido</p><h2>O que vai bem agora?</h2></div><p>Toque em uma categoria e vá direto ao que procura.</p></div>
        <div className="category-grid">{categories.map((cat, i) => { const Icon = categoryIcons[i]; return <button key={cat} onClick={() => jumpToCatalog(cat)}><Icon/><span>{cat}</span><small>Ver produtos</small><ChevronRight/></button>})}<a href="#tabacaria"><Cigarette/><span>Tabacaria</span><small>Conhecer opções</small><ChevronRight/></a></div>
      </section>

      <section id="promocoes" className="section dark-band">
        <div className="section-head"><div><p className="eyebrow">Oportunidades da vez</p><h2>Promoções da SM</h2></div><p>Confira as opções em destaque e fale com a gente para saber mais.</p></div>
        <div className="promo-grid">{promotions.map(item => <article className="promo-card" key={item.id}><div className="product-image"><img src={item.image} alt={item.name} loading="lazy"/><span className="badge">{item.badge}</span></div><div className="card-body"><small>{item.category}</small><h3>{item.name}</h3><p>{item.description}</p><a className="button full" href={contactLink(item.name)} target="_blank" rel="noopener noreferrer">Consultar pelo WhatsApp <MessageCircle/></a></div></article>)}</div>
        <p className="demo-note">Consulte a disponibilidade atual pelo WhatsApp.</p>
      </section>

      <section id="catalogo" className="section catalog">
        <div className="section-head"><div><p className="eyebrow">Escolha sem pressa</p><h2>Catálogo SM</h2></div><p>Busque, filtre e consulte os produtos diretamente com a equipe.</p></div>
        <div className="catalog-tools"><label><Search/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar no catálogo..." /></label><div className="filters">{(["Todos", ...categories] as const).map(cat => <button className={active === cat ? "active" : ""} onClick={() => setActive(cat)} key={cat}>{cat}</button>)}</div></div>
        <div className="product-grid">{filtered.map(item => <article className="product-card" key={item.id}><img src={item.image} alt={item.name} loading="lazy"/><div className="card-body"><small>{item.category}</small><h3>{item.name}</h3><p>{item.description}</p><div className="product-bottom"><span>Consulte disponibilidade</span><a href={contactLink(item.name)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${item.name} pelo WhatsApp`}><MessageCircle/></a></div></div></article>)}</div>
        {!filtered.length && <div className="empty">Nenhum produto encontrado nesta busca.</div>}
        <p className="demo-note">Produtos e disponibilidade devem ser confirmados no atendimento.</p>
      </section>

      <section id="tabacaria" className="section tobacco-section">
        <div className="section-head"><div><p className="eyebrow"><Cigarette size={15}/> Espaço Tabacaria</p><h2>Tudo para o seu momento, em um só lugar.</h2></div><p>Consulte nossa equipe para conhecer as opções disponíveis em cada categoria.</p></div>
        <div className="tobacco-grid">{tobaccoDetails.map(category => <button className="tobacco-card" key={category.id} onClick={() => setSelectedDetail(category)} aria-label={`Ver detalhes de ${category.cardTitle}`}><img src={category.image} alt={`Imagem representativa de ${category.cardTitle}`} loading="lazy"/><div><small>Tabacaria</small><h3>{category.cardTitle}</h3><p>{category.description}</p><span>Conhecer a categoria <ChevronRight/></span></div></button>)}</div>
        <div className="tobacco-actions"><a className="button" href={tobaccoLink} target="_blank" rel="noopener noreferrer"><MessageCircle/> Consultar disponibilidade</a><p className="age-warning"><ShieldAlert/> Venda proibida para menores de 18 anos.</p></div>
      </section>

      <section id="combos" className="section dark-band">
        <div className="section-head"><div><p className="eyebrow">Tudo combinado</p><h2>Combos para facilitar</h2></div><p>Seleções prontas para você resolver o momento em poucos toques.</p></div>
        <div className="combo-grid">{comboDetails.map(combo => <button className="combo-card" key={combo.id} onClick={() => setSelectedDetail(combo)} aria-label={`Ver itens de ${combo.cardTitle}`}><img src={combo.image} alt={`Imagem representativa de ${combo.cardTitle}`} loading="lazy"/><div className="card-body"><small>Combo</small><h3>{combo.cardTitle}</h3><p>{combo.description}</p><ul>{combo.items.map(item => <li key={item.name}><Star/> {item.name}</li>)}</ul><span className="card-detail-link">Ver itens do combo <ChevronRight/></span></div></button>)}</div>
        <p className="demo-note">Consulte a disponibilidade atual dos itens pelo WhatsApp.</p>
      </section>

      <section id="sobre" className="section about">
        <div className="about-visual"><div><span>SM</span><p>Praticidade que acompanha o seu ritmo.</p></div></div>
        <div><p className="eyebrow">Sobre a SM</p><h2>Seu momento pede praticidade</h2><p className="about-copy">A SM Conveniência nasceu para tornar seus momentos mais práticos. Em um só lugar, você encontra bebidas, salgadinhos, gelo, doces e diversas opções para completar sua noite, encontro ou comemoração.</p><div className="features">{["Variedade", "Facilidade", "Atendimento próximo", "Consultas rápidas", "Opções para cada ocasião"].map(x => <span key={x}><Star/>{x}</span>)}</div></div>
      </section>

      <section id="localizacao" className="section location">
        <a className="map-link" href={storeConfig.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir a localização da SM Conveniência no Google Maps"><iframe className="map-frame" src={storeConfig.mapsEmbedUrl} title="Mapa da SM Conveniência" loading="lazy" tabIndex={-1} /></a>
        <div className="location-info"><p className="eyebrow">Venha até a SM</p><h2>Localização e contato</h2><a className="info-row" href={storeConfig.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin/><div><small>Endereço</small><strong>{storeConfig.address}</strong></div></a><div className="info-row"><Clock3/><div><small>Horário de atendimento</small><strong>{storeConfig.weekdayHours}</strong><strong>{storeConfig.weekendHours}</strong></div></div><a className="info-row" href={contactLink()} target="_blank" rel="noopener noreferrer"><MessageCircle/><div><small>WhatsApp</small><strong>{storeConfig.whatsappDisplay}</strong></div></a><div className="location-actions"><a className="button" href={storeConfig.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin/> Abrir rota no Google Maps</a></div></div>
      </section>

      <section className="final-cta"><p className="eyebrow">Fale com a SM</p><h2>Bateu a vontade? <em>A SM resolve.</em></h2><p>Consulte seus produtos favoritos com a gente pelo WhatsApp.</p><a className="button" href={contactLink()} target="_blank" rel="noopener noreferrer"><MessageCircle/> Entre em contato</a></section>
      <footer><a href="#inicio" className="brand" aria-label="Voltar ao início"><Brand/></a><div className="footer-links"><a href="#promocoes">Promoções</a><a href="#catalogo">Catálogo</a><a href="#tabacaria">Tabacaria</a><a href="#sobre">Sobre</a><a href="#localizacao">Localização</a><a href={storeConfig.mapsUrl} target="_blank" rel="noopener noreferrer">Abrir no Google Maps</a></div><div className="footer-meta"><a href={contactLink()} target="_blank" rel="noopener noreferrer">WhatsApp: {storeConfig.whatsappDisplay}</a><a href={storeConfig.mapsUrl} target="_blank" rel="noopener noreferrer">{storeConfig.address}</a><span className="footer-hours"><Clock3/><span><b>Horário de atendimento</b>{storeConfig.weekdayHours}<br/>{storeConfig.weekendHours}</span></span><span className="footer-age"><ShieldAlert/> Venda proibida para menores de 18 anos.</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SM Conveniência. Todos os direitos reservados.</span><a className="next-dev-credit" href={storeConfig.nextDevUrl} target="_blank" rel="noopener noreferrer">Desenvolvido por Next Dev</a></div></footer>
      <a className="float-whatsapp" href={contactLink()} target="_blank" rel="noopener noreferrer" aria-label="Entrar em contato pelo WhatsApp"><MessageCircle/></a>
      {selectedDetail && <DetailModal detail={selectedDetail} onClose={() => setSelectedDetail(null)}/>}
    </main>
  );
}
