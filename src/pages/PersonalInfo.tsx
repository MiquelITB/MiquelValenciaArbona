import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";
import Silk from "../components/Silk";
import MagicBento, { MagicCard } from "../components/MagicBento";
import { 
  MapPin, GraduationCap, Wrench, Briefcase, Mail, 
  Phone, Car, Laptop, Palette, Layout as LayoutIcon, Languages 
} from "lucide-react";
import miFoto from "/workspaces/MiquelValenciaArbona/tmp/imagenes/f2.jpeg";

const PersonalInfo = () => {
  const greenGlow = "34, 197, 94";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Fondo de seda original */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Silk
          speed={3}
          scale={1.5}
          color="#8418e2"
          noiseIntensity={1}
          rotation={0.2}
        />
      </div>

      {/* Contenedor principal de MagicBento para el spotlight global */}
      <MagicBento glowColor={greenGlow}>
        <div className="max-w-[var(--page-max-width)] mx-auto px-4 py-16 sm:py-24 relative z-10">
          
          {/* Cabecera */}
          <div className="mb-12">
            <AnimatedSection>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
                <BlurText text="Miquel Valencia Arbona" animateBy="letters" delay={50} />
              </h1>
              <div className="h-1.5 w-20 rounded-full bg-primary mb-6" />
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatedSection delay={0.1}>
                {/* Aplicamos MagicCard a la caja de Perfil */}
                <MagicCard className="rounded-xl h-full">
                  <div className="flex flex-col gap-3 p-6 border border-border/40 bg-card/40 backdrop-blur-md h-full">
                    <h2 className="text-primary font-bold uppercase tracking-wider text-xs mb-2">Perfil Profesional</h2>
                    <p className="text-sm text-foreground leading-relaxed">
                      Técnico en Administrador de Sistemas Informáticos y Redes enfocado a la Ciberseguridad. 
                      Tengo 25 años y busco la oportunidad de adquirir experiencia y poder formar parte de un equipo que me permita crecer profesionalmente.
                      Mi experiencia laboral se centra en la eficiencia energética, pero estoy muy motivado para dar el salto al mundo IT y aportar mis habilidades técnicas, capacidad de aprendizaje y pasión por la tecnología.
                    </p>
                  </div>
                </MagicCard>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                  {/* MagicCard para Contacto */}
                  <MagicCard className="rounded-xl">
                    <div className="p-4 border border-border/40 bg-card/40 backdrop-blur-md flex flex-col justify-center h-full">
                      <div className="flex items-center gap-3 text-sm mb-2"><Mail className="w-4 h-4 text-primary" /> valenciam.sc@gmail.com</div>
                      <div className="flex items-center gap-3 text-sm mb-2"><Phone className="w-4 h-4 text-primary" /> 665 16 67 19</div>
                      <div className="flex items-center gap-3 text-sm mb-2"><MapPin className="w-4 h-4 text-primary" /> Barcelona / Mallorca</div>
                      <div className="flex items-center gap-3 text-sm mb-2"><Car className="w-4 h-4 text-primary" /> Carné de Coche: B</div>
                      <div className="flex items-center gap-3 text-sm text-primary font-medium italic">Disponibilidad inmediata</div>
                    </div>
                  </MagicCard>

                  <div className="p-4 rounded-xl border border-border/40 bg-card/40 backdrop-blur-md flex flex-col justify-center">
                    <div className="flex flex-col items-center">
                      <img 
                        src={miFoto} 
                        alt="Miquel Valencia Arbona" 
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 space-y-8">
              {/* Titulaciones */}
              <AnimatedSection delay={0.3}>
                <MagicCard className="rounded-xl">
                  <div className="p-6 border border-border/40 bg-card/40 backdrop-blur-md">
                    <h2 className="font-heading font-semibold text-xl mb-6 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" /> Titulaciones</h2>
                    <div className="space-y-6">
                      <div className="relative pl-4 border-l border-primary/30">
                        <p className="text-xs text-primary font-bold">2024 - Actualidad</p>
                        <h3 className="text-sm font-bold">GS Administrador de Sistemas Informáticos y Redes (Ciberseguridad)</h3>
                        <p className="text-xs text-muted-foreground italic">Institut Tecnológic de Barcelona</p>
                      </div>
                      <div className="relative pl-4 border-l border-primary/30">
                        <p className="text-xs text-primary font-bold">2020 - 2022</p>
                        <h3 className="text-sm font-bold">GS Eficiencia Energética y Energía Solar Térmica</h3>
                        <p className="text-xs text-muted-foreground italic">Institut Escola del Treball, Barcelona</p>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </AnimatedSection>

              {/* SECCIÓN IDIOMAS IMPLEMENTADA */}
              <AnimatedSection delay={0.35}>
                <MagicCard className="rounded-xl">
                  <div className="p-6 border border-border/40 bg-card/40 backdrop-blur-md">
                    <h2 className="font-heading font-semibold text-xl mb-6 flex items-center gap-2"><Languages className="w-5 h-5 text-primary" /> Idiomas</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-sm font-medium">Catalán / Valenciano</span>
                        <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">Nativo</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-sm font-medium">Castellano</span>
                        <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">Nativo</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Inglés</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase bg-white/5 px-2 py-0.5 rounded">A2 / B1</span>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </AnimatedSection>

              {/* Competencias */}
              <AnimatedSection delay={0.4}>
                <MagicCard className="rounded-xl">
                  <div className="p-6 border border-border/40 bg-card/40 backdrop-blur-md">
                    <h2 className="font-heading font-semibold text-xl mb-6 flex items-center gap-2"><Laptop className="w-5 h-5 text-primary" /> Competencias Digitales</h2>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-primary mb-2 flex items-center gap-2"><Wrench className="w-3 h-3"/> Programación e IT</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Python", "Scripting", "Cyberseguridad", "Linux", "Windows", "Redes", "C#"].map(s => (
                            <span key={s} className="px-2 py-1 text-[10px] rounded bg-primary/10 border border-primary/20 text-primary">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </AnimatedSection>
            </div>

            {/* Experiencia Laboral */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection delay={0.5}>
                <MagicCard className="rounded-xl h-full">
                  <div className="p-6 border border-border/40 bg-card/40 backdrop-blur-md h-full">
                    <h2 className="font-heading font-semibold text-xl mb-8 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Experiencia Laboral</h2>
                    <div className="space-y-12">
                      <div className="relative">
                        <h3 className="text-lg font-bold">Técnico superior en eficiencia energética</h3>
                        <p className="text-sm text-primary font-medium mb-4">Efiquality | 2022 - 2023</p>
                        <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                          <ul className="list-disc list-inside space-y-1">
                            <li>Project Manager: Seguimiento de proyectos.</li>
                            <li>Coordinación con instaladoras.</li>
                            <li>Ofertas comerciales y atención técnica.</li>
                          </ul>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Estudio y cálculo fotovoltaico.</li>
                            <li>Valoración de presupuestos.</li>
                          </ul>
                        </div>
                      </div>
                      {/* Oasiurba */}
                      <div className="pt-8 border-t border-white/5">
                        <h3 className="text-lg font-bold">Técnico superior en eficiencia energética</h3>
                        <p className="text-sm text-primary font-medium mb-4">Oasiurba | 2022</p>
                        <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                          <ul className="list-disc list-inside space-y-1">
                            <li>Certificados energéticos.</li>
                            <li>Levantamiento de planos: AutoCAD, Revit.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </MagicBento>
    </div>
  );
};

export default PersonalInfo;