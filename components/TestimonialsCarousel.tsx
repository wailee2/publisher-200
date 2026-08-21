"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import type { Testimonial } from "@/lib/types";
import { ArrowRight, ArrowLeft } from "lucide-react";

const MOBILE_BREAKPOINT = 640; // matches Tailwind's `sm`
const MOBILE_GUTTER = 16; // small natural left/right padding on mobile, in px

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [sidePad, setSidePad] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const dragMoved = useRef(false);
  const rafId = useRef<number | null>(null);

  const updateEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  // on mobile: small natural gutter, no centering.
  // on larger screens: pad enough to center the first/last card.
  const updateSidePad = useCallback(() => {
    const el = scrollRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;

    const mobile = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(mobile);

    if (mobile) {
      setSidePad(MOBILE_GUTTER);
    } else {
      setSidePad(Math.max((el.clientWidth - card.offsetWidth) / 2, 0));
    }
  }, []);

  const applyTilt = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const delta = cardCenter - containerCenter;
      const distance = Math.abs(delta);
      const maxDistance = card.offsetWidth * 1.1;
      const t = Math.min(distance / maxDistance, 1);

      const rotate = Math.sign(delta) * t * 10;
      const scale = 1 - t * 0.12;
      const translateY = t * 18;
      const opacity = 1 - t * 0.3;

      card.style.transform = `rotate(${rotate}deg) scale(${scale}) translateY(${translateY}px)`;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(Math.round((1 - t) * 10));
    });
  }, []);

  const onScroll = useCallback(() => {
    updateEdges();
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(applyTilt);
  }, [updateEdges, applyTilt]);

  useEffect(() => {
  const el = scrollRef.current;
  if (!el) return;

  // defer initial measurement to next frame — avoids calling setState
  // synchronously during the effect's commit phase
  const initId = requestAnimationFrame(() => {
    updateEdges();
    updateSidePad();
    applyTilt();
  });

  el.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateEdges);
  window.addEventListener("resize", updateSidePad);
  window.addEventListener("resize", applyTilt);

  return () => {
    cancelAnimationFrame(initId);
    el.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", updateEdges);
    window.removeEventListener("resize", updateSidePad);
    window.removeEventListener("resize", applyTilt);
    if (rafId.current) cancelAnimationFrame(rafId.current);
  };
}, [onScroll, updateEdges, updateSidePad, applyTilt, testimonials]);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  // --- mouse drag-to-scroll (desktop only; touch uses native scrolling) ---
  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    dragMoved.current = false;
    dragStartX.current = e.pageX;
    dragStartScroll.current = el.scrollLeft;
    el.classList.add("cursor-grabbing");
    el.classList.remove("cursor-grab");
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el || !isDragging.current) return;
    e.preventDefault();
    const delta = e.pageX - dragStartX.current;
    if (Math.abs(delta) > 4) dragMoved.current = true;
    el.scrollLeft = dragStartScroll.current - delta;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(applyTilt);
  };

  const endDrag = () => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = false;
    el.classList.remove("cursor-grabbing");
    el.classList.add("cursor-grab");
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onClickCapture={onClickCapture}
        style={{ paddingLeft: sidePad, paddingRight: sidePad, paddingTop: "1.5rem", paddingBottom: "2.5rem" }}
        className="flex flex-nowrap gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth cursor-grab select-none
                  w-full min-w-0 touch-pan-x
                  [-ms-overflow-style:none] scrollbar-width:none [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t: Testimonial, i: number) => {
          const photoUrl = t.authorPhoto
            ? urlForImage(t.authorPhoto).width(80).height(80).url()
            : null;
          return (
            <div
              key={t._id}
              data-card
              ref={(node) => { cardRefs.current[i] = node; }}
              style={{ transition: "transform 300ms ease-out, opacity 300ms ease-out" }}
              className={`bg-card-bg rounded-2xl p-6 flex flex-col justify-between min-h-90
                        w-[82vw] xs:w-[75vw] sm:w-100
                        shrink-0 will-change-transform
                        ${isMobile ? "snap-start" : "snap-center"} snap-always`}
            >
              <p className="">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 mt-6">
                <div className="size-10 rounded-full bg-bg overflow-hidden relative shrink-0">
                  {photoUrl && (
                    <Image src={photoUrl} alt={t.authorName} fill className="object-cover" draggable={false} />
                  )}
                </div>
                <div>
                  <p className="capitalize font-semibold">{t.authorName}</p>
                  {t.authorRole && (
                    <p className="text-xsmall text-text-muted">{t.authorRole}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 mt-2">
        <button
          onClick={() => scrollByCard("left")}
          disabled={!canScrollLeft}
          aria-label="Previous testimonial"
          className="size-12.5 rounded-full bg-primary hover:scale-90 hover:enabled:bg-primary/70 transition-all duration-300
                    flex items-center justify-center
                    disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="size-7.5 text-white "  />
        </button>
        <button
          onClick={() => scrollByCard("right")}
          disabled={!canScrollRight}
          aria-label="Next testimonial"
          className="size-12.5 rounded-full bg-primary hover:scale-90 hover:enabled:bg-primary/70 transition-all duration-300
                    flex items-center justify-center
                    disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowRight className="size-7.5 text-white " /> 
        </button>
      </div>
    </div>
  );
}