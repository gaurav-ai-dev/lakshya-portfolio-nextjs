"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type DeliverableItem = {
  title: string;
  description: string;
  detail: string;
  icon: any;
  gradientIdx: 1 | 2 | 3;
};

const DeliverablesSection = ({ deliverables }: { deliverables: DeliverableItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? deliverables[openIndex] : null;

  return (
    <section className="section-padding section-bg-dots relative overflow-hidden">
      {/* subtle warm glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[hsl(32_95%_52%/0.10)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[hsl(18_90%_45%/0.08)] blur-3xl" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="label-tag mb-3 block">Deliverables</span>
          <h2 className="heading-section">What you get</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[hsl(32_95%_52%/0.18)]" />

              <div className="relative rounded-2xl border border-border bg-background/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `var(--gradient-icon-${item.gradientIdx})` }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                {/* clean preview (no mess) */}
                <p className="mt-4 text-foreground/90 leading-relaxed line-clamp-2">
                  {item.detail}
                </p>

                {/* functional CTA */}
                <div className="mt-5 flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Included in every engagement
                  </span>

                  <button
                    onClick={() => setOpenIndex(index)}
                    className="text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                  >
                    View details →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal (no in-card expand) */}
      <AnimatePresence>
        {active && openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              className="w-full max-w-2xl rounded-2xl border border-border bg-background shadow-2xl p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `var(--gradient-icon-${active.gradientIdx})` }}
                  >
                    <active.icon className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-xl mb-1">{active.title}</h3>
                    <p className="text-muted-foreground">{active.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => setOpenIndex(null)}
                  className="w-10 h-10 rounded-xl bg-secondary/70 hover:bg-secondary border border-border flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-foreground leading-relaxed">{active.detail}</p>

                {/* Optional: add a CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button className="btn-primary w-full sm:w-auto">Get this deliverable</button>
                  <button
                    className="btn-secondary w-full sm:w-auto"
                    onClick={() => setOpenIndex(null)}
                  >
                    Back to list
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DeliverablesSection;
