import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";
import Silk from "../components/Silk";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Portfolio Personal",
    description: "Página web personal tipo CV con HTML, CSS y PHP.",
    tags: ["HTML", "CSS", "PHP"],
  },
  {
    title: "Proyecto 2",
    description: "Descripción del segundo proyecto realizado.",
    tags: ["JavaScript", "React"],
  },
  {
    title: "Proyecto 3",
    description: "Descripción del tercer proyecto realizado.",
    tags: ["Java", "SQL"],
  },
];

const Projects = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Silk background */}
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
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
              <BlurText text="Proyectos" animateBy="letters" delay={50} className="" />
            </h1>
            <div className="h-1 w-12 rounded-full bg-primary" />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-lg">
              Una selección de los proyectos en los que he trabajado durante mi formación.
            </p>
          </AnimatedSection>
        </div>

        <div className="cards-container grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={0.3 + i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="project-card p-6 rounded-xl border border-border/60 bg-card/80 backdrop-blur-md hover:border-primary/30 transition-all duration-400 h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </div>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-medium rounded-full border border-border bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
