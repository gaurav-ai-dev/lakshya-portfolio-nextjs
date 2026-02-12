"use client"
import { motion } from "framer-motion";
import { Mail, Calendar, ArrowRight, Check, Clock } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import contactHero from "@/assets/contact-hero.jpg";
import Image from "next/image";

const benefits = [
  "Free 30-minute strategy call",
  "Custom growth assessment",
  "No-obligation consultation"
];

const Contact_1 = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", budget: "", message: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log(formData); };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden section-bg-mesh">
          <div className="absolute inset-0 z-0">
            <Image src={contactHero} alt="Contact" className="w-full h-full object-cover opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          </div>
          <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="label-tag mb-4 block">Get in Touch</span>
              <h1 className="heading-display mb-6">
                Let's build something{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-tab)' }}>profitable</span> together
              </h1>
              <p className="text-body-lg max-w-2xl mx-auto">Whether you're looking to scale your paid acquisition or need strategic guidance.</p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section-padding section-bg-accent">
          <div className="section-container grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="heading-subsection mb-6">Start with a conversation</h2>
              <p className="text-body mb-8">Every great partnership starts with understanding your business and goals.</p>
              
              <div className="space-y-4 mb-12">
                {benefits.map((b, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `var(--gradient-icon-${(i % 3) + 1})` }}
                    >
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{b}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-4">
                <motion.a 
                  href="mailto:hello@marketpro.com" 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-icon-1)' }}
                  >
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Email me directly</p>
                    <p className="text-sm text-muted-foreground">hello@marketpro.com</p>
                  </div>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-icon-2)' }}
                  >
                    <Calendar className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Schedule a call</p>
                    <p className="text-sm text-muted-foreground">Pick a time that works</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="card-minimal shadow-xl">
                <h3 className="text-xl font-semibold mb-6">Tell me about your project</h3>
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300" 
                        placeholder="John Smith" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300" 
                        placeholder="john@company.com" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input 
                      type="text" 
                      value={formData.company} 
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300" 
                      placeholder="Your company" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Ad Spend</label>
                    <select 
                      value={formData.budget} 
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })} 
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                    >
                      <option value="">Select a range</option>
                      <option value="under-25k">Under $25K/month</option>
                      <option value="25k-50k">$25K - $50K/month</option>
                      <option value="50k-100k">$50K - $100K/month</option>
                      <option value="100k+">$100K+/month</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">How can I help? *</label>
                    <textarea 
                      required 
                      rows={4} 
                      value={formData.message} 
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all duration-300" 
                      placeholder="Tell me about your business..." 
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full gap-2 py-3.5">
                    Send Message <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />Response within 24 hours
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact_1;
