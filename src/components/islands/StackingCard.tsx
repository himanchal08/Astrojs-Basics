import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CardItem = {
  title: string;
  description: string;
};

type StackingCardsProps = {
  cards?: CardItem[];
};

export default function StackingCards({ cards = [] }: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const TOP_OFFSET = 80;

      cardEls.forEach((card, i) => {
        card.style.top = `${TOP_OFFSET + i * 24}px`;
        card.style.zIndex = String(i + 1);

        if (i < cardEls.length - 1) {
          gsap.to(card, {
            scale: 0.97,
            ease: "none",
            scrollTrigger: {
              trigger: cardEls[i + 1],
              start: `top ${TOP_OFFSET + i * 24}px`,
              end: `+=220`,
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-5 pb-[60vh]">
      {cards.map((card, i) => (
        <div
          key={card.title + i}
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
          className="sticky w-full rounded-2xl border border-(--color-stone) bg-(--color-ivory) px-8 py-7 shadow-sm will-change-transform"
        >
          <h3 className="text-lg font-bold text-(--color-crimson)">
            {card.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-(--color-slate)">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}
