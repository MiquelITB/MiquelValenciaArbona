import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, User, FolderOpen, Mail } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import LightRays from "../components/LightRays";
import ASCIIText from "../components/ASCIIText";
import CurvedLoop from "../components/CurvedLoop";

const navCards = [
  {
    title: "Sobre Mí",
    description: "Información personal, formación y habilidades",
    icon: User,
    path: "/info",
  },
  {
    title: "Proyectos",
    description: "Trabajos y proyectos realizados",
    icon: FolderOpen,
    path: "/proyectos",
  },
  {
    title: "Contacto",
    description: "Formulario de contacto",
    icon: Mail,
    path: "/contacto",
  },
];

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 relative overflow-hidden bg-background">
      {/* Fondo de Rayos de Luz */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="bottom-center"
          raysColor="#ffffff"
          raysSpeed={0.5}
          lightSpread={2}
          rayLength={3}
          followMouse
        />
      </div>

      {/* Contenedor del Hero */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center mb-12">
        
        {/* ANIMACIÓN 1: ASCII TEXT para el nombre */}
        <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
          <ASCIIText 
            text={"Miquel\nValencia\nArbona"}
            asciiFontSize={8}
            textFontSize={150}
            textColor="#ffffff"
            planeBaseHeight={25}
            enableWaves={false}
          />
        </div>

        {/* ANIMACIÓN 2: CURVED LOOP para el texto de bienvenida */}
        <div className="w-full -mt-8 mb-8 h-32">
          <CurvedLoop 
            marqueeText="Bienvenido a mi CV. Aquí encontrarás mis proyectos, formas de contactar y mi trayectoria"
            speed={1.5}
            curveAmount={150}
            className="fill-primary text-xl font-bold uppercase tracking-widest"
          />
        </div>
      </div> {/* <--- AQUÍ FALTABA ESTE CIERRE */}

      {/* Navegación por tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full relative z-10 px-4">
        {navCards.map((card, i) => (
          <AnimatedSection key={card.path} delay={0.8 + i * 0.1}>
            <Link to={card.path} className="block h-full">
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group p-6 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:glow-primary transition-all duration-300 cursor-pointer h-full flex flex-col"
              >
                <card.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 flex-1">
                  {card.description}
                </p>
                <span className="inline-flex items-center text-xs text-primary font-medium group-hover:gap-2 gap-1 transition-all">
                  Ver más <ArrowRight className="w-3 h-3" />
                </span>
              </motion.div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Index;