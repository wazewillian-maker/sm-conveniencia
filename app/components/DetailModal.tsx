"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { ImageIcon, MessageCircle, ShieldAlert, X } from "lucide-react";
import type { DetailGroup } from "../../src/data/details";
import { whatsappLink } from "../../src/data/storeConfig";

type DetailModalProps = {
  detail: DetailGroup;
  onClose: () => void;
};

export function DetailModal({ detail, onClose }: DetailModalProps) {
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
    <div className={`detail-backdrop ${closing ? "is-closing" : ""}`} onMouseDown={event => {
      if (event.target === event.currentTarget) requestClose();
    }}>
      <div
        ref={dialogRef}
        className={`detail-modal ${detail.type === "combo" ? "combo-detail-modal" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
        aria-describedby="detail-modal-description"
      >
        <button ref={closeButtonRef} className="detail-close" onClick={requestClose} aria-label="Fechar detalhes"><X/></button>
        <div className="detail-hero">
          {detail.image ? (
            <img src={detail.image} alt={detail.cardTitle} loading="lazy"/>
          ) : (
            <div className="detail-image-placeholder detail-hero-placeholder" role="img" aria-label="Imagem não cadastrada">
              <ImageIcon/><span>Imagem não cadastrada</span>
            </div>
          )}
          <div>
            <small>{detail.type === "combo" ? "Detalhes do combo" : "Espaço Tabacaria"}</small>
            <h2 id="detail-modal-title">{detail.title}</h2>
            <p id="detail-modal-description">{detail.description}</p>
          </div>
        </div>
        <div className="detail-items">
          {detail.items.map((item, index) => (
            <article className="detail-item" key={`${item.name}-${index}`}>
              {item.image ? (
                <img src={item.image} alt={item.name} loading="lazy"/>
              ) : (
                <div className="detail-image-placeholder" role="img" aria-label={`Imagem não cadastrada para ${item.name}`}>
                  <ImageIcon/><span>Imagem não cadastrada</span>
                </div>
              )}
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <small>{item.availability}</small>
              </div>
            </article>
          ))}
        </div>
        {detail.ageRestricted && <p className="modal-age-warning"><ShieldAlert/> Venda proibida para menores de 18 anos.</p>}
        <div className="detail-footer">
          <a className="button" href={whatsappLink(detail.whatsappMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle/> {detail.buttonLabel}</a>
          <button className="detail-back" onClick={requestClose}>Voltar ao site</button>
        </div>
      </div>
    </div>
  );
}
