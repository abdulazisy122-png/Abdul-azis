import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Activity, 
  ArrowUpRight, 
  Cpu, 
  Layers, 
  Layout, 
  Mail, 
  Monitor, 
  PenTool, 
  Zap,
  Github,
  Linkedin,
  Instagram,
  Terminal,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const StatusWidget = () => (
  <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-industrial-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-sm">
    <div className="relative">
      <div className="w-2 h-2 bg-industrial-orange rounded-full animate-pulse" />
      <div className="absolute inset-0 w-2 h-2 bg-industrial-orange rounded-full animate-ping opacity-75" />
    </div>
    <span className="text-[10px] font-mono uppercase tracking-widest text-industrial-silver">
      System Status: <span className="text-industrial-orange">Online</span>
    </span>
  </div>
);

const DeploymentSpeedTest = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const toggleTimer = () => {
    if (isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsActive(false);
    } else {
      setTime(0);
      setIsActive(true);
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 0.01);
      }, 10);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 w-64 bg-industrial-black/90 border border-white/10 p-4 rounded-sm backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-mono text-industrial-silver uppercase tracking-tighter">Deployment Speed Test</span>
        <Activity size={12} className="text-industrial-orange" />
      </div>
      <div className="text-4xl font-display italic mb-4 text-white">
        {time.toFixed(3)}<span className="text-sm ml-1 text-industrial-silver">s</span>
      </div>
      <button 
        onClick={toggleTimer}
        className="w-full py-2 bg-industrial-orange text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isActive ? 'ABORT DEPLOY' : 'START DEPLOY'}
        <Zap size={12} />
      </button>
    </div>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 border-l-4 border-industrial-orange pl-6">
    <h2 className="text-5xl md:text-7xl font-display mb-2">{title}</h2>
    {subtitle && <p className="text-industrial-silver font-mono text-xs uppercase tracking-[0.2em]">{subtitle}</p>}
  </div>
);

const ExperienceItem = ({ year, role, company, desc }: { year: string; role: string; company: string; desc: string }) => (
  <div className="group border-b border-white/10 py-8 hover:bg-white/5 transition-colors px-4 -mx-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
      <div className="text-industrial-orange font-display text-2xl italic">{year}</div>
      <div className="md:col-span-2">
        <h3 className="text-xl font-bold mb-1">{role}</h3>
        <p className="text-industrial-silver text-sm font-mono uppercase mb-3">{company}</p>
        <p className="text-industrial-silver/70 text-sm max-w-md">{desc}</p>
      </div>
      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="text-industrial-orange" />
      </div>
    </div>
  </div>
);

const ProjectCard = ({ title, category, tags, size = "small" }: { title: string; category: string; tags: string[]; size?: "small" | "large" | "wide" }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`relative group overflow-hidden border border-white/10 bg-white/5 p-6 flex flex-col justify-between min-h-[300px] ${
      size === "large" ? "md:row-span-2 md:col-span-2" : size === "wide" ? "md:col-span-2" : ""
    }`}
  >
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-mono text-industrial-orange uppercase tracking-widest">{category}</span>
      <ArrowUpRight size={20} className="text-white/20 group-hover:text-industrial-orange transition-colors" />
    </div>
    <div>
      <h3 className="text-3xl font-display mb-4 group-hover:text-industrial-orange transition-colors">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-[9px] px-2 py-1 bg-white/10 text-industrial-silver uppercase font-mono">{tag}</span>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-1 bg-industrial-orange transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
  </motion.div>
);

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen grid-bg relative selection:bg-industrial-orange">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-industrial-orange z-[60] origin-left"
        style={{ scaleX }}
      />

      <StatusWidget />
      <DeploymentSpeedTest />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-20 border-b border-white/10">
        <div className="absolute top-10 left-6 md:left-20">
          <div className="flex items-center gap-2 text-industrial-orange font-mono text-[10px] tracking-widest uppercase">
            <Terminal size={14} />
            <span>Root@ITB_Network:~/Portfolio</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[12vw] md:text-[10vw] leading-[0.85] mb-4">
            ABDUL AZIS <br />
            <span className="text-industrial-orange">ARRANTISY</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
            <h2 className="text-4xl md:text-6xl text-industrial-silver/50 italic">ARSITEKTUR / DESIGNER</h2>
            <div className="max-w-xs text-xs font-mono text-industrial-silver leading-relaxed uppercase tracking-tighter">
              High-Performance spatial solutions. 
              Engineering aesthetics through code and concrete.
              Based in Bandung, ID.
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 right-6 md:right-20 animate-bounce">
          <div className="w-px h-20 bg-gradient-to-b from-industrial-orange to-transparent" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 md:px-20 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <SectionHeader title="PHILOSOPHY" subtitle="High-Octane Execution" />
          <div className="space-y-8">
            <p className="text-2xl md:text-3xl font-light leading-snug text-industrial-silver">
              I believe in the intersection of <span className="text-white font-bold italic">Structural Integrity</span> and <span className="text-industrial-orange font-bold italic">Digital Fluidity</span>. 
              My background in architecture at ITB provides the foundation for building products that are not just beautiful, but resilient and performant.
            </p>
            <p className="text-industrial-silver/60 leading-relaxed">
              Whether it's designing a physical structure or a digital interface, my approach remains the same: 
              Precision-driven, user-centric, and optimized for speed. I treat every pixel like a structural beam—essential, 
              calculated, and part of a larger, high-performance system.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="border border-white/10 p-4">
                <div className="text-industrial-orange font-display text-3xl mb-1">01</div>
                <div className="text-[10px] font-mono uppercase text-industrial-silver">Structural Thinking</div>
              </div>
              <div className="border border-white/10 p-4">
                <div className="text-industrial-orange font-display text-3xl mb-1">02</div>
                <div className="text-[10px] font-mono uppercase text-industrial-silver">Visual Precision</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 px-6 md:px-20 border-b border-white/10 bg-white/[0.02]">
        <SectionHeader title="EXPERIENCE" subtitle="Professional Trajectory" />
        <div className="max-w-5xl">
          <ExperienceItem 
            year="2023 - PRES"
            role="Lead Architectural Designer"
            company="Studio Arrantisy"
            desc="Spearheading sustainable spatial projects with a focus on brutalist aesthetics and modern engineering."
          />
          <ExperienceItem 
            year="2021 - 2023"
            role="Senior Illustrator & Visual Designer"
            company="Creative Lab Bandung"
            desc="Developing complex visual systems for tech startups and industrial brands across Southeast Asia."
          />
          <ExperienceItem 
            year="2019 - 2021"
            role="Junior Architect"
            company="Urban Dynamics"
            desc="Assisting in large-scale urban planning and structural visualization for government infrastructure."
          />
        </div>
      </section>

      {/* Projects Section - Bento Grid */}
      <section className="py-32 px-6 md:px-20 border-b border-white/10">
        <SectionHeader title="PROJECTS" subtitle="Selected Works" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProjectCard 
            title="MONOLITH RESIDENCE" 
            category="Architecture" 
            tags={["Concrete", "Minimalist", "3D"]} 
            size="large"
          />
          <ProjectCard 
            title="TECH-CORE UI" 
            category="Digital Design" 
            tags={["React", "Framer", "UI/UX"]} 
          />
          <ProjectCard 
            title="INDUSTRIAL ASSETS" 
            category="Illustration" 
            tags={["Vector", "Brutalist", "Print"]} 
          />
          <ProjectCard 
            title="URBAN FLOW SYSTEM" 
            category="Engineering" 
            tags={["AutoCAD", "Simulation", "Data"]} 
            size="wide"
          />
          <ProjectCard 
            title="CYBER-PUNK BRANDING" 
            category="Design" 
            tags={["Identity", "Motion", "Web"]} 
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 md:px-20 border-b border-white/10 bg-white/[0.02]">
        <SectionHeader title="SERVICES" subtitle="What I Offer" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Layers />, title: "Architectural Design", desc: "Modern, sustainable, and brutalist spatial solutions for residential and commercial needs." },
            { icon: <Monitor />, title: "UI/UX Engineering", desc: "High-performance digital interfaces focused on speed, accessibility, and structural clarity." },
            { icon: <PenTool />, title: "Visual Identity", desc: "Bold, industrial-themed branding and illustration systems that command attention." }
          ].map((service, i) => (
            <div key={i} className="border border-white/10 p-8 hover:border-industrial-orange transition-colors group">
              <div className="text-industrial-orange mb-6 group-hover:scale-110 transition-transform inline-block">
                {React.cloneElement(service.icon as React.ReactElement, { size: 40 })}
              </div>
              <h3 className="text-2xl mb-4">{service.title}</h3>
              <p className="text-industrial-silver/60 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="py-32 px-6 md:px-20 border-b border-white/10">
        <SectionHeader title="EDUCATION" subtitle="Academic Foundation" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border border-white/10 p-10 bg-white/5">
            <div className="text-industrial-orange font-mono text-xs mb-4 uppercase tracking-widest">University</div>
            <h3 className="text-3xl mb-2">INSTITUT TEKNOLOGI BANDUNG</h3>
            <p className="text-industrial-silver text-lg italic mb-6">Bachelor of Architecture</p>
            <div className="flex items-center gap-2 text-industrial-silver/50 font-mono text-[10px] uppercase">
              <ChevronRight size={14} />
              <span>GPA: 3.8/4.0</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-industrial-orange font-mono text-xs uppercase tracking-widest mb-6">Certifications</div>
            {[
              "Advanced Structural Engineering - 2023",
              "UI/UX Design Specialization - 2022",
              "Professional Illustrator Masterclass - 2021",
              "Sustainable Design Certification - 2020"
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="w-2 h-2 bg-industrial-orange" />
                <span className="text-industrial-silver font-mono text-xs uppercase">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <SectionHeader title="CONNECT" subtitle="Start a Project" />
            <p className="text-industrial-silver mb-12 max-w-md">
              Ready to build something high-performance? Reach out for collaborations in architecture, design, or digital engineering.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-industrial-orange hover:border-industrial-orange transition-all group">
                <Github className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-industrial-orange hover:border-industrial-orange transition-all group">
                <Linkedin className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-industrial-orange hover:border-industrial-orange transition-all group">
                <Instagram className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:abdulazis@example.com" className="w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-industrial-orange hover:border-industrial-orange transition-all group">
                <Mail className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          <div className="bg-white/5 p-10 border border-white/10">
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-mono uppercase text-industrial-silver mb-2">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-industrial-orange outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-industrial-silver mb-2">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-industrial-orange outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-industrial-silver mb-2">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-2 focus:border-industrial-orange outline-none transition-colors resize-none" />
              </div>
              <button className="w-full py-4 bg-industrial-orange text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                SEND TRANSMISSION
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Marquee Footer */}
      <footer className="py-12 border-t border-white/10 overflow-hidden bg-industrial-black">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-6">
              <span className="text-4xl md:text-6xl font-display italic text-white/20 hover:text-industrial-orange transition-colors cursor-default">REACT</span>
              <span className="text-4xl md:text-6xl font-display italic text-white/20 hover:text-industrial-orange transition-colors cursor-default">NEXT.JS</span>
              <span className="text-4xl md:text-6xl font-display italic text-white/20 hover:text-industrial-orange transition-colors cursor-default">TAILWIND</span>
              <span className="text-4xl md:text-6xl font-display italic text-white/20 hover:text-industrial-orange transition-colors cursor-default">TYPESCRIPT</span>
              <span className="text-4xl md:text-6xl font-display italic text-white/20 hover:text-industrial-orange transition-colors cursor-default">GO</span>
              <span className="text-4xl md:text-6xl font-display italic text-white/20 hover:text-industrial-orange transition-colors cursor-default">AWS</span>
              <span className="text-4xl md:text-6xl font-display italic text-white/20 hover:text-industrial-orange transition-colors cursor-default">DOCKER</span>
            </div>
          ))}
        </div>
        <div className="mt-12 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-industrial-silver/40 uppercase tracking-widest">
          <span>© 2026 ABDUL AZIS ARRANTISY</span>
          <span>Built for High-Performance Execution</span>
          <span>Bandung, Indonesia</span>
        </div>
      </footer>
    </div>
  );
}
