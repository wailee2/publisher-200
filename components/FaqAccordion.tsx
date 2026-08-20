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
              className="w-full flex items-center justify-between gap-6 py-6 text-left  "
              aria-expanded={isOpen}
            >
              <span className=" font-medium text-large text-text-primary">
                {item.question}
              </span>
              <span
                className={`text-2xl text-text-primary shrink-0 inline-block
                            transition-transform duration-500 ease-out
                            ${isOpen ? "rotate-180" : "rotate-0"}`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* height animator: 0fr -> 1fr smoothly expands/collapses the answer */}
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-out 
                          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden min-h-0">
                <p className=" text-text-secondary pb-8 max-w-xl">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}