"use client"

import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import ProjectsGrid from "@/components/projects-grid"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParticlesBackground from "@/components/particles-background"
import { useStore } from "@/lib/store"
import SimpleCube from "@/components/simple-cube"
import { SiReact, SiVuedotjs, SiLaravel, SiNodedotjs, SiNextdotjs, SiTailwindcss, SiBootstrap, SiMysql, SiMongodb, SiPostgresql, SiGit, SiSpring } from "react-icons/si"

const skills = [
  { name: "React", icon: <SiReact className="w-6 h-6" /> },
  { name: "Vue", icon: <SiVuedotjs className="w-6 h-6" /> },
  { name: "Laravel", icon: <SiLaravel className="w-6 h-6" /> },
  { name: "Node.js", icon: <SiNodedotjs className="w-6 h-6" /> },
  { name: "Next.js", icon: <SiNextdotjs className="w-6 h-6" /> },
  { name: "SpringBoot", icon: <SiSpring className="w-6 h-6" /> }, 
  { name: "Tailwind", icon: <SiTailwindcss className="w-6 h-6" /> },
  { name: "Bootstrap", icon: <SiBootstrap className="w-6 h-6" /> },
  { name: "MySQL", icon: <SiMysql className="w-6 h-6" /> },
  { name: "MongoDB", icon: <SiMongodb className="w-6 h-6" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="w-6 h-6" /> },
  { name: "Git", icon: <SiGit className="w-6 h-6" /> },
]

export default function Home() {
  const { viewMode, toggleViewMode } = useStore()
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-lavender-dark text-white-pink">
      <ParticlesBackground />
      <Navbar />

      <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[90vh] relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 text-white-pink">
            Mi Portafolio Creativo
          </h1>
          <p className="text-lavender-pastel text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
            Diseño y desarrollo de experiencias digitales únicas e interactivas
          </p>
        </motion.div>

        <div className="w-full flex justify-center mb-8 md:mb-12">
          <button
            onClick={toggleViewMode}
            className="bg-lila-soft hover:bg-lavender-dark transition-colors px-4 py-2 rounded-md text-white-pink text-sm md:text-base"
          >
            {viewMode === "cube" ? "Ver Proyectos" : "Atras"}
          </button>
        </div>

        <div className={`w-full ${viewMode === "cube" ? "h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]" : "mb-20"}`}>
          {viewMode === "cube" ? <SimpleCube /> : <ProjectsGrid />}
        </div>
      </section>

      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
