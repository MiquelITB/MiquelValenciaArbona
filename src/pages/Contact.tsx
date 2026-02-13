import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";
import DarkVeil from "../components/DarkVeil";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Por favor, rellena todos los campos obligatorios.");
      return;
    }

    setSending(true);

    // Configuración de EmailJS
    const serviceId = "service_so80q9x"; 
    const templateId = "template_t1e27iw";
    const publicKey = "yG8mCgGfyb9mz25h2";

    const templateParams = {
      name: form.name,
      email: form.email,
      subject: form.subject || "Sin asunto",
      message: form.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          toast.success("¡Mensaje enviado! Te responderé pronto.");
          setForm({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("Error:", error);
          toast.error("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
        }
      )
      .finally(() => {
        setSending(false);
      });
  };

  const inputClasses =
    "w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Fondo DarkVeil */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          baseColor="#000000"
          veilColor="#8418e2"
          depth={6}
          speed={0.5}
          opacity={0.7}
        />
      </div>

      <div className="max-w-[var(--page-max-width)] mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="mb-12">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
              <BlurText text="Contacto" animateBy="letters" delay={50} className="" />
            </h1>
            <div className="h-1 w-12 rounded-full bg-primary" />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-lg">
              ¿Tienes alguna pregunta o propuesta? No dudes en escribirme.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3}>
          <form
            onSubmit={handleSubmit}
            className="max-w-xl space-y-5 p-6 sm:p-8 rounded-xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={inputClasses}
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={inputClasses}
                  maxLength={255}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Asunto
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Asunto del mensaje"
                className={inputClasses}
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Mensaje *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                rows={5}
                className={inputClasses + " resize-none"}
                maxLength={1000}
              />
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:glow-primary transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {sending ? "Enviando..." : "Enviar mensaje"}
            </motion.button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;