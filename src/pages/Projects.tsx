import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";
import Silk from "../components/Silk";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";

const projects = [
  {
    title: "Infraestructura CPD en AWS",
    description: "Página web personal con HTML, CSS, json, javascript y PHP. Creamos una infraestructura en la nube de AWS con una pagina que alojaba una gran variedad de servicios como streaming de audio, video, compartir archivos y monitoraje de seguridad. Es un servicio redundante con alta disponibilidad y escalabilidad, con un diseño de red seguro y eficiente.",
    tags: ["AWS", "HTML", "CSS", "PHP"],
    serveis: ["Servicio de audio (Icecast2 y ezstream)", "Servicio de vídeo: FFmpeg", "Bases de datos: MySQL", "Web: Nginx", "Cockpit", "Samba", "Servicio SFTP", "UFW", "Fail2ban (Monitorage y seguridad)"],
    link: "https://github.com/MiquelITB/Projecte-Transversal-ASIXc1B.git"
  },
  {
    title: "Extagram en Docker",
    description: "Desarrollo de una aplicación web llamada Extragram utilizando Docker. Extragram es una aplicación de microblogging que permite a los usuarios compartir fotos y mensajes cortos. Utilizamos Docker para crear un entorno de desarrollo y producción consistente, lo que facilita la implementación y el mantenimiento de la aplicación. La aplicación se compone de varios servicios, incluyendo una base de datos MariaDB, un servidor web Nginx y una aplicación PHP para manejar la lógica del negocio.",
    tags: ["Docker", "AWS", "HTML", "CSS", "PHP", "JavaScript", "MariaDB"],
    serveis: ["Bases de datos: MariaDB", "Web: Nginx y Apache2", "Docker Compose", "ProfHub"],
    link: "https://github.com/rusH050/2526-P0.1-ASIXc2BC-G02.git"
  },
  {
    title: "Depuración de datos con Python",
    description: "Con Python, hemos limpiado y depurado un conjunto de datos recogidos en la web de AEMET: eliminar valores atípicos, corregir errores y manejar datos faltantes procurando procesar los datos de manera eficiente y precisa para su posterior análisis.",
    tags: ["Python", "CSV"],
    link: "https://miquelitb.github.io/TA06-Grup3-Izan-Miquel-Jordi/"
  },
  {
    title: "Estudio Energético",
    description: "A partir de los datos de consumo del instituto del ITB, hemos realizado un estudio energético para identificar oportunidades de mejora en la eficiencia energética. Hemos analizado los datos de consumo, identificado patrones y propuesto medidas para reducir el consumo energético y mejorar la sostenibilidad del instituto.",
    tags: ["CSV", "HTML", "CSS", "JavaScript"],
    link: "https://miquelitb.github.io/Estudio-Energetico/"
  },
];

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-40">
        <Silk
          speed={5}
          scale={1.2}
          color="#8418e2"
          noiseIntensity={1.5}
          rotation={0.5}
        />
      </div>

      <div className="max-w-[var(--page-max-width)] mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="mb-12">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2 text-foreground">
              <BlurText text="Proyectos" animateBy="letters" delay={50} />
            </h1>
            <div className="h-1 w-12 rounded-full bg-primary" />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-lg">
              Una selección de los proyectos en los que he trabajado durante mi formación.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={0.3 + i * 0.1}>
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  filter: hoveredIndex !== null && hoveredIndex !== i ? "blur(4px)" : "blur(0px)",
                  opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.4 : 1,
                  scale: hoveredIndex === i ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
                className="group p-6 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md hover:border-primary/40 transition-colors flex flex-col h-full shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {project.serveis && (
                  <div className="mb-6 space-y-2">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-primary">Servicios:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {project.serveis.map((srv) => (
                        <div key={srv} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-primary/70" />
                          {srv}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-bold rounded-md border border-primary/20 bg-primary/5 text-primary uppercase tracking-tight"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
