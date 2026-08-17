"use client";

import { useState } from "react";

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?._id ?? null);

  return (
    <div className="divide-y divide-border border-t border-border">
      {items.map((item) => {
        const isOpen = openId === item._id;
        return (
          <div key={item._id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item._id)}
              className="w-full flex items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-body text-base font-medium text-text-primary">
                {item.question}
              </span>
              <span className="text-xl text-text-primary flex-shrink-0">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="font-body text-sm text-text-secondary pb-6 max-w-2xl">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
