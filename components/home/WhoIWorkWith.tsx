"use client"
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const idealClients = [
  "Brands spending $50K+ monthly on paid acquisition",
  "Teams ready to invest in measurement infrastructure",
  "Companies prioritizing profitable growth over vanity metrics",
  "Founders who value strategic thinking and data-driven decisions",
  "Organizations with product-market fit looking to scale",
];

const notIdealFor = [
  "Looking for overnight viral growth hacks",
  "Not ready to invest in proper tracking and analytics",
  "Want to micromanage every creative decision",
  "Expecting results without testing budgets",
  "Need a full-service agency for execution only",
];

const quickFitQuestions = [
  { question: "Monthly ad spend over $30K?", points: 2 },
  { question: "Have conversion tracking in place?", points: 1 },
  { question: "Looking for strategic partnership, not just execution?", points: 2 },
  { question: "Ready for at least 3-month engagement?", points: 1 },
];

const WhoIWorkWith = () => {
  const [activeTab, setActiveTab] = useState<'ideal' | 'not'>('ideal');
  const [showFitTest, setShowFitTest] = useState(false);
  const [fitAnswers, setFitAnswers] = useState<boolean[]>([]);

  const calculateFit = () => {
    const score = fitAnswers.reduce((acc, answer, idx) => {
      return acc + (answer ? quickFitQuestions[idx].points : 0);
    }, 0);
    const maxScore = quickFitQuestions.reduce((acc, q) => acc + q.points, 0);
    return Math.round((score / maxScore) * 100);
  };

  return (
    <section className="section-padding section-bg-mesh relative overflow-hidden">
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="label-tag mb-3 block">Fit Assessment</span>
          <h2 className="heading-section mb-3">
            Who I work with — and who I don't
          </h2>
          <p className="text-body-lg">
            Great partnerships start with alignment. Here's how to know if we're a good fit.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tabs Section */}
          <div className="lg:col-span-2">
            {/* Premium Tab Buttons */}
            <div className="tabs-glow mb-6 w-fit">
              <button
                onClick={() => setActiveTab('ideal')}
                className={`tab-glow flex items-center gap-2 ${activeTab === 'ideal' ? 'tab-glow-active' : ''}`}
              >
                <Check className="w-4 h-4" />
                Ideal Partners
              </button>
              <button
                onClick={() => setActiveTab('not')}
                className={`tab-glow flex items-center gap-2 ${activeTab === 'not' ? 'tab-glow-active' : ''}`}
              >
                <X className="w-4 h-4" />
                Not a Fit
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-background p-6 rounded-2xl border border-border shadow-lg"
              >
                {activeTab === 'ideal' ? (
                  <ul className="space-y-4">
                    {idealClients.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div 
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: 'var(--gradient-icon-2)' }}
                        >
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-4">
                    {notIdealFor.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>

            <Link href="/about" className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:gap-3 transition-all text-sm">
              Learn more about my approach
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Fit Test Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-background p-6 rounded-2xl border border-border h-fit shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gradient-icon-3)' }}
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Quick Fit Test</h3>
                <p className="text-xs text-muted-foreground">30 seconds</p>
              </div>
            </div>

            {!showFitTest ? (
              <button
                onClick={() => setShowFitTest(true)}
                className="btn-primary w-full"
              >
                Check Your Fit
              </button>
            ) : (
              <div className="space-y-4">
                {quickFitQuestions.map((q, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm text-foreground">{q.question}</span>
                    <div className="flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const newAnswers = [...fitAnswers];
                          newAnswers[idx] = true;
                          setFitAnswers(newAnswers);
                        }}
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={fitAnswers[idx] === true ? { 
                          background: 'var(--gradient-tab)', 
                          color: 'white' 
                        } : { 
                          background: 'hsl(var(--secondary))' 
                        }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const newAnswers = [...fitAnswers];
                          newAnswers[idx] = false;
                          setFitAnswers(newAnswers);
                        }}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          fitAnswers[idx] === false 
                            ? 'bg-destructive text-destructive-foreground' 
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}

                {fitAnswers.length === quickFitQuestions.length && fitAnswers.every(a => a !== undefined) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pt-4 border-t border-border"
                  >
                    <div className="text-center">
                      <p 
                        className="stat-number text-transparent bg-clip-text"
                        style={{ backgroundImage: 'var(--gradient-tab)' }}
                      >
                        {calculateFit()}%
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">Fit Score</p>
                      <Link href="/contact" className="btn-primary w-full text-sm">
                        Let's Talk
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Retention stat */}
            <div className="mt-6 pt-4 border-t border-border text-center">
              <p 
                className="stat-number text-2xl text-transparent bg-clip-text"
                style={{ backgroundImage: 'var(--gradient-tab)' }}
              >
                100%
              </p>
              <p className="text-xs text-muted-foreground">Client retention (6mo+ partnerships)</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoIWorkWith;
