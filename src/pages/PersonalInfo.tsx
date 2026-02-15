import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";
import Silk from "../components/Silk";
import MagicBento, { MagicCard } from "../components/MagicBento";
import { 
  MapPin, GraduationCap, Wrench, Briefcase, Mail, 
  Phone, Car, Laptop, Palette, Layout as LayoutIcon, Languages 
} from "lucide-react";
import miFoto from "../../public/imagenes/f2.png";

const PersonalInfo = () => {
  const greenGlow = "34, 197, 94";

  const handleEmailClick = () => {
    const user = "valenciam.sc";
    const domain = "gmail.com";
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-30">
        <Silk
          speed={3}
          scale={1.5}
          color="#8418e2"
          noiseIntensity={1}
          rotation={0.2}
        />
      </div>

      <MagicBento glowColor={greenGlow}>
        <div className="max-w-[var(--page-max-width)] mx-auto px-4 py-16 sm:py-24 relative z-10">
          
          <div className="mb-12">
            <AnimatedSection>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
                <BlurText text="Miquel Valencia Arbona" animateBy="letters" delay={50} />
              </h1>
              <div className="h-1.5 w-20 rounded-full bg-primary mb-6" />
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatedSection delay={0.1}>
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
                  <MagicCard className="rounded-xl">
                    <div className="p-4 border border-border/40 bg-card/40 backdrop-blur-md flex flex-col justify-center h-full">
                      <div 
                        onClick={handleEmailClick}
                        className="flex items-center gap-3 text-sm mb-2 cursor-pointer hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4 text-primary" /> valenciam.sc@gmail.com
                      </div>
                      <div className="flex items-center gap-3 text-sm mb-2"><Phone className="w-4 h-4 text-primary" /> 665 16 67 19</div>
                      <div className="flex items-center gap-3 text-sm mb-2"><MapPin className="w-4 h-4 text-primary" /> Barcelona / Mallorca</div>
                      <div className="flex items-center gap-3 text-sm mb-2"><Car className="w-4 h-4 text-primary" /> Carné de Coche: B</div>
                      <div className="flex items-center gap-3 text-sm text-primary font-medium italic">Disponibilidad inmediata</div>
                    </div>
                  </MagicCard>

                  <div className="h-full">
                    <MagicCard className="rounded-xl h-full">
                      <div className="relative w-full h-full min-h-[160px] border border-border/40 bg-card/40 backdrop-blur-md flex items-center justify-center p-6">
                        <img 
                          src={miFoto} 
                          alt="Miquel Valencia Arbona" 
                          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary shadow-xl"
                        />
                      </div>
                    </MagicCard>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 space-y-8">
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
                      <div className="relative pl-4 border-l border-primary/30">
                        <p className="text-xs text-primary font-bold">2020</p>
                        <h3 className="text-sm font-bold">Título de Bachiller Científico-Tecnológico</h3>
                        <p className="text-xs text-muted-foreground italic">Colegio Santa Maria, Palma de Mallorca</p>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </AnimatedSection>

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

              <AnimatedSection delay={0.4}>
                <MagicCard className="rounded-xl">
                  <div className="p-6 border border-border/40 bg-card/40 backdrop-blur-md">
                    <h2 className="font-heading font-semibold text-xl mb-6 flex items-center gap-2"><Laptop className="w-5 h-5 text-primary" /> Competencias Digitales</h2>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-primary mb-2 flex items-center gap-2"><Wrench className="w-3 h-3"/> Programación e IT</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Python", "Scripting", "Cyberseguridad", "JavaScript", "HTML/CSS/Json", "PHP", "Admin de Sistemas", "Linux", "Windows", "Redes", "Diseño/Logistica Web", "C#"].map(s => (
                            <span key={s} className="px-2 py-1 text-[10px] rounded bg-primary/10 border border-primary/20 text-primary">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase text-primary mb-2 flex items-center gap-2"><LayoutIcon className="w-3 h-3"/> Diseño Técnico (Avanzado)</h4>
                        <div className="flex flex-wrap gap-2">
                          {["AutoCAD 2018-2022 (2D/3D)", "Cype 2022", "Revit 2022"].map(s => (
                            <span key={s} className="px-2 py-1 text-[10px] rounded bg-primary/10 border border-primary/20 text-primary">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase text-primary mb-2 flex items-center gap-2"><Palette className="w-3 h-3"/> Edición y Media</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Photoshop", "Gimp", "Premiere", "After Effects", "FL Studio", "Reaper", "Camtasia"].map(s => (
                            <span key={s} className="px-2 py-1 text-[10px] rounded bg-white/5 border border-white/10 text-muted-foreground">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection delay={0.5}>
                <MagicCard className="rounded-xl h-full">
                  <div className="p-6 border border-border/40 bg-card/40 backdrop-blur-md">
                    <h2 className="font-heading font-semibold text-xl mb-8 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Experiencia Laboral</h2>
                    <div className="space-y-12">
                      <div className="relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">Técnico superior en eficiencia energética</h3>
                            <p className="text-sm text-primary font-medium">Efiquality | 2022 - 2023</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                          <div className="space-y-2">
                            <p className="text-white font-medium text-xs border-b border-primary/20 pb-1">Gestión y Proyectos:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Project Manager: Seguimiento de proyectos del departamento.</li>
                              <li>Coordinación con empresas instaladoras colaboradoras.</li>
                              <li>Diseño y presentación de ofertas comerciales.</li>
                              <li>Actuación dentro del departamento: Plantas fotovoltaica, cargadores electicos de coche, contadores, aerotermia y baterías de condensadores</li>
                              <li>Atención al público y asesoramiento técnico.</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <p className="text-white font-medium text-xs border-b border-primary/20 pb-1">Técnico / Diseño:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Estudio, dimensionado y cálculo fotovoltaico (Suntropy/ICON).</li>
                              <li>Cálculo de consumo y propuestas de instalación.</li>
                              <li>Valoración de precios y presupuestos de los proyectos.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">Técnico superior en eficiencia energética</h3>
                            <p className="text-sm text-primary font-medium">Oasiurba | 2022</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                          <div className="space-y-2">
                            <p className="text-white font-medium text-xs border-b border-primary/20 pb-1">Gestión y Proyectos:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Emisión de certificados energéticos de viviendas y locales</li>
                              <li>Propuestas energéticas de mejora de las viviendas</li>
                              <li>Atención al público</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <p className="text-white font-medium text-xs border-b border-primary/20 pb-1">Técnico / Diseño:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Levantamiento de planos desde cero: AutoCAD, Cype y Revit.</li>
                              <li>Cálculo de instalaciones fotovoltaicas</li>
                              <li>Auditorías y certificados energéticos.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-border/40">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">Prácticas Laborales - Técnico Superior</h3>
                            <p className="text-sm text-primary font-medium">Ciclo Superior (M08) | 2020 - 2021</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 space-y-4">
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            Enfoque en procesos de montaje de instalaciones térmicas, climatización y ventilación.
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div>
                              <p className="text-[10px] font-bold text-primary uppercase">Montaje</p>
                              <p className="text-[11px]">Calefacción, Aire Acondicionado y sistemas de ventilación.</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-primary uppercase">Instalaciones</p>
                              <p className="text-[11px]">ACS, radiadores, soldadura y uniones de tuberías.</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-primary uppercase">Seguridad</p>
                              <p className="text-[11px]">Redacción de Plan básico de Seguridad y salud.</p>
                            </div>
                          </div>
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