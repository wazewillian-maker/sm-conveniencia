"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ImageIcon, MessageCircle, X } from "lucide-react";
import type { Category } from "../../src/data/catalog";
import { categoryDisplayNames, type CategoryProduct } from "../../src/data/categoryCatalog";
import { whatsappLink } from "../../src/data/storeConfig";

type CategoryCatalogModalProps = {
  category: Category;
  products: CategoryProduct[];
  onClose: () => void;
};

export function CategoryCatalogModal({ category, products, onClose }: CategoryCatalogModalProps) {
  const categoryName = categoryDisplayNames[category];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);

  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onClose, 180);
  };

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])"))
        .filter(element => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  // requestClose deliberately uses the current modal state.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`detail-backdrop category-catalog-backdrop ${closing ? "is-closing" : ""}`} onMouseDown={event => {
      if (event.target === event.currentTarget) requestClose();
    }}>
      <div ref={dialogRef} className="detail-modal category-catalog-modal" role="dialog" aria-modal="true" aria-labelledby="category-catalog-title" aria-describedby="category-catalog-description">
        <button ref={closeButtonRef} className="detail-close" onClick={requestClose} aria-label="Fechar categoria"><X/></button>
        <header className="category-catalog-header">
          <button className="category-back" onClick={requestClose}><ArrowLeft/> Voltar ao catálogo</button>
          <small>Catálogo SM</small>
          <h2 id="category-catalog-title">{categoryName}</h2>
          <p id="category-catalog-description">{products.length} {products.length === 1 ? "produto disponível" : "produtos disponíveis"}</p>
        </header>
        {products.length ? (
          <div className="category-product-grid">
            {products.map(product => (
              <article className="category-product-card" key={product.id ?? product.image ?? product.name}>
                <div className="category-product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} loading="lazy"/>
                  ) : (
                    <div className="detail-image-placeholder" role="img" aria-label={`Imagem não cadastrada para ${product.name}`}>
                      <ImageIcon/><span>Imagem não cadastrada</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3>{product.name}</h3>
                  <a className="button full" href={whatsappLink(`Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar a disponibilidade de ${product.name}.`)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle/> Consultar disponibilidade
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="category-catalog-empty">
            <p>As fotos individuais desta categoria ainda não foram adicionadas.</p>
            <a className="button" href={whatsappLink(`Olá! Encontrei a SM Conveniência pelo site e gostaria de consultar os produtos disponíveis na categoria ${categoryName}.`)} target="_blank" rel="noopener noreferrer">
              <MessageCircle/> Consultar disponibilidade
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
