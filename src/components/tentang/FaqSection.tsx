"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/tentangData";

export default function FaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqFilter, setFaqFilter] = useState<"semua" | "umum" | "jp" | "teknis">("semua");

  const filteredFaqs =
    faqFilter === "semua"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((f) => f.category === faqFilter);

  return (
    <section id="faq" className="py-24 max-w-[1000px] mx-auto px-6 sm:px-10">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0a2244]">
          PUSAT INFORMASI &amp; FAQ
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081730] tracking-tight mt-1">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Pedoman ringkas terkait mekanisme jam pelajaran, konfidensialitas, dan teknis platform.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {[
          { id: "semua", label: "Semua Kategori" },
          { id: "jp", label: "Jam Pelajaran (JP)" },
          { id: "umum", label: "Prinsip Layanan" },
          { id: "teknis", label: "Teknis & SIASN" },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFaqFilter(f.id as any)}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
              faqFilter === f.id
                ? "bg-[#0a2244] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Accordion Items */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="text-sm font-bold text-[#081730]">
                  {faq.question}
                </span>
                <span className="text-slate-400 font-bold text-lg shrink-0">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Action Row */}
      <div className="mt-12 p-6 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="text-sm font-bold text-[#081730]">
            Masih memiliki pertanyaan terkait sesi Anda?
          </h4>
          <p className="text-xs text-slate-600">
            Hubungi Helpdesk BPSDMP Kemenhub atau mulai pendaftaran sesi melalui SSO SIK.
          </p>
        </div>
        <Link
          href="/login"
          className="px-5 py-2.5 rounded-lg bg-[#0a2244] hover:bg-[#113366] text-white text-xs font-bold transition-all shadow-xs shrink-0"
        >
          Masuk SSO SIK →
        </Link>
      </div>
    </section>
  );
}
