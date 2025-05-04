"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { projects } from "@/lib/data"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Code,
  User,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  PenTool,
  Database,
  Layout,
  Smartphone,
  Server,
} from "lucide-react"
import {
  SiReact,
  SiVuedotjs,
  SiLaravel,
  SiNodedotjs,
  SiNextdotjs,
  SiSpring,
  SiTailwindcss,
  SiBootstrap,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiGit
} from "react-icons/si"

type FaceType = "front" | "right" | "back" | "left" | "top" | "bottom";

export default function SimpleCube() {
  const router = useRouter()
  const cubeRef = useRef(null)
  const [currentFace, setCurrentFace] = useState<FaceType>("front")
  const [isRotating, setIsRotating] = useState(true)
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Calcular el tamaño del cubo basado en el tamaño de la pantalla
  const cubeSize = isMobile ? "w-72 h-72" : isTablet ? "w-96 h-96" : "w-[28rem] h-[28rem]"
  const translateZ = isMobile ? "12rem" : isTablet ? "16rem" : "20rem"

  // Detener rotación automática si el usuario prefiere reducir el movimiento
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRotating(false)
    }
  }, [prefersReducedMotion])

  // Rotación automática
  useEffect(() => {
    if (!isRotating) return

    const faces = ["front", "right", "back", "left", "top", "bottom"]
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % faces.length
      setCurrentFace(faces[currentIndex] as FaceType)
    }, 5000)

    return () => clearInterval(interval)
  }, [isRotating])

  // Función para manejar la rotación del cubo
  const rotateTo = (face: FaceType) => {
    setCurrentFace(face)
    setIsRotating(false)
  }

  // Mapeo de caras a transformaciones CSS
  const faceTransforms = {
    front: "rotateY(0deg)",
    right: "rotateY(-90deg)",
    back: "rotateY(-180deg)",
    left: "rotateY(90deg)",
    top: "rotateX(-90deg)",
    bottom: "rotateX(90deg)",
  }

  // Navegar a la sección correspondiente
  const handleFaceClick = (face: FaceType) => {
    if (face === "top") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
    } else if (face === "bottom") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    } else if (face === "back") {
      router.push(`/projects/${projects[0].slug}`)
    }
  }

  // Datos de experiencia para la cara izquierda
  const experiences = [
    { year: "2022-Presente", role: "Full Stack Developer", company: "BBK Marketing Solutions" },
    { year: "2023-2025", role: "Full Stack Developer", company: "Salyam" },
    { year: "2024-Presente", role: "Full Stack Developer", company: "Empet" },
  ]

  // Datos de habilidades para la cara derecha
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

  // Soporte para gestos táctiles
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    setIsRotating(false)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartX.current || !touchStartY.current) return

    const touchEndX = e.touches[0].clientX
    const touchEndY = e.touches[0].clientY
    const diffX = touchStartX.current - touchEndX
    const diffY = touchStartY.current - touchEndY

    // Determinar la dirección del swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Swipe horizontal
      if (diffX > 50) {
        // Swipe izquierda
        if (currentFace === "front") rotateTo("right")
        else if (currentFace === "right") rotateTo("back")
        else if (currentFace === "back") rotateTo("left")
        else if (currentFace === "left") rotateTo("front")
      } else if (diffX < -50) {
        // Swipe derecha
        if (currentFace === "front") rotateTo("left")
        else if (currentFace === "left") rotateTo("back")
        else if (currentFace === "back") rotateTo("right")
        else if (currentFace === "right") rotateTo("front")
      }
    } else {
      // Swipe vertical
      if (diffY > 50) {
        // Swipe arriba
        if (currentFace !== "bottom") rotateTo("bottom")
      } else if (diffY < -50) {
        // Swipe abajo
        if (currentFace !== "top") rotateTo("top")
      }
    }

    touchStartX.current = 0
    touchStartY.current = 0
  }

  return (
    <div className="w-full h-full flex items-center justify-center perspective-1000">
      <motion.div
        className={`relative ${cubeSize} preserve-3d cursor-pointer`}
        initial={{ y: 0 }}
        animate={{
          y: [0, -20, 0],
          transform: faceTransforms[currentFace],
        }}
        transition={{
          y: { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" },
          transform: { duration: 1, ease: "easeInOut" },
        }}
        ref={cubeRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Cara 1: Frontal - Perfil */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ transform: `translateZ(${translateZ})` }}
          onClick={() => handleFaceClick("front")}
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image src="/images/profile.webp" alt="Perfil" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-lavender-dark bg-opacity-70 flex flex-col items-center justify-center p-4">
              <h2 className="text-white-pink text-2xl md:text-3xl lg:text-4xl font-semibold">Alvaro Ismael</h2>
              <p className="text-lavender-pastel mt-2 text-center text-sm md:text-base lg:text-lg">
                Desarrollador Web & Diseñador UI
              </p>
              <div className="mt-4 px-4 py-2 bg-lila-soft bg-opacity-70 rounded-md">
                <p className="text-white-pink text-xs md:text-sm">Creando soluciones digitales de principio a fin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cara 2: Trasera - Proyecto Destacado */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ transform: `rotateY(180deg) translateZ(${translateZ})` }}
          onClick={() => handleFaceClick("back")}
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image src="/images/digital-wardrobe-transparent-screen.webp" alt={projects[0].title} fill className="object-cover" />
            <div className="absolute inset-0 bg-purple-900 bg-opacity-70 flex flex-col items-center justify-center p-4">
              <div className="bg-lila-soft px-2 py-1 rounded-md text-xs text-white-pink mb-2">PROYECTO DESTACADO</div>
              <h3 className="text-white-pink text-xl md:text-2xl font-semibold text-center">{projects[0].title}</h3>
              <p className="text-lavender-pastel mt-2 text-xs md:text-sm text-center line-clamp-3">
                {projects[0].description}
              </p>
              <button className="mt-4 bg-white-pink text-purple-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-lavender-pastel transition-colors">
                Ver detalles
              </button>
            </div>
          </div>
        </div>

        {/* Cara 3: Derecha - Habilidades */}
        <div
          className="absolute w-full h-full backface-hidden bg-lavender-dark"
          style={{ transform: `rotateY(90deg) translateZ(${translateZ})` }}
          onClick={() => handleFaceClick("right")}
        >
          <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col">
            <h3 className="text-white-pink text-xl md:text-2xl font-semibold mb-4 text-center">Habilidades</h3>
            <div className="grid grid-cols-4 gap-3 md:gap-4 flex-1">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white-pink bg-opacity-90 flex items-center justify-center">
                    <div className="text-lavender-dark">{skill.icon}</div>
                  </div>
                  <span className="text-white-pink text-xs md:text-sm mt-1">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cara 4: Izquierda - Experiencia */}
        <div
          className="absolute w-full h-full backface-hidden bg-lila-soft"
          style={{ transform: `rotateY(-90deg) translateZ(${translateZ})` }}
          onClick={() => handleFaceClick("left")}
        >
          <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col">
            <h3 className="text-white-pink text-xl md:text-2xl font-semibold mb-4 text-center">Experiencia</h3>
            <div className="flex-1 flex flex-col justify-center">
              {experiences.map((exp, index) => (
                <div key={index} className="mb-4 relative pl-6">
                  {index < experiences.length - 1 && (
                    <div className="absolute left-2 top-6 w-0.5 h-full bg-white-pink bg-opacity-30"></div>
                  )}
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white-pink"></div>
                  <div className="mb-1">
                    <span className="text-white-pink text-xs md:text-sm font-semibold bg-purple-900 px-2 py-0.5 rounded">
                      {exp.year}
                    </span>
                  </div>
                  <h4 className="text-white-pink text-sm md:text-base font-medium">{exp.role}</h4>
                  <p className="text-white-pink text-xs md:text-sm opacity-80">{exp.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cara 5: Superior - Sobre mí */}
        <div
          className="absolute w-full h-full backface-hidden bg-lavender-dark"
          style={{ transform: `rotateX(90deg) translateZ(${translateZ})` }}
          onClick={() => handleFaceClick("top")}
        >
          <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col items-center justify-center">
            <User className="text-white-pink w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 mb-4" />
            <h3 className="text-white-pink text-xl md:text-2xl font-semibold mb-2">Sobre Mí</h3>
            <p className="text-white-pink text-center text-sm md:text-base lg:text-lg">
              "Desarrollador Full Stack apasionado por crear soluciones web completas y escalables"
            </p>
            <div className="mt-6 flex space-x-6 md:space-x-8">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white-pink flex items-center justify-center">
                  <Server className="w-5 h-5 md:w-6 md:h-6 text-lavender-dark" />
                </div>
                <span className="text-white-pink text-xs md:text-sm mt-1">Backend</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white-pink flex items-center justify-center">
                  <Layout className="w-5 h-5 md:w-6 md:h-6 text-lavender-dark" />
                </div>
                <span className="text-white-pink text-xs md:text-sm mt-1">Frontend</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white-pink flex items-center justify-center">
                  <Database className="w-5 h-5 md:w-6 md:h-6 text-lavender-dark" />
                </div>
                <span className="text-white-pink text-xs md:text-sm mt-1">Bases de Datos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cara 6: Inferior - Contacto */}
        <div
          className="absolute w-full h-full backface-hidden bg-lavender-dark"
          style={{ transform: `rotateX(-90deg) translateZ(${translateZ})` }}
          onClick={() => handleFaceClick("bottom")}
        >
          <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col items-center justify-center">
            <h3 className="text-white-pink text-xl md:text-2xl font-semibold mb-4">¡Hablemos!</h3>
            <div className="grid grid-cols-1 gap-4 md:gap-6 w-full max-w-sm">
              <a 
                href="https://www.linkedin.com/in/alvaro-ismael-a14b44359/" 
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center space-x-4 bg-white-pink bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition-all group" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white-pink flex items-center justify-center group-hover:bg-lila-soft transition-colors">
                  <Linkedin className="w-6 h-6 md:w-7 md:h-7 text-lavender-dark group-hover:text-white-pink transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white-pink font-medium">LinkedIn</span>
                  <span className="text-lavender-pastel text-sm">Alvaro Ismael</span>
                </div>
              </a>
              <a 
                href="https://wa.me/+5356943149" 
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center space-x-4 bg-white-pink bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition-all group" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white-pink flex items-center justify-center group-hover:bg-lila-soft transition-colors">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-lavender-dark group-hover:text-white-pink transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white-pink font-medium">WhatsApp</span>
                  <span className="text-lavender-pastel text-sm">+53 56943149</span>
                </div>
              </a>
              <a 
                href="mailto:alvaro.ismael.urgelles.revilla@gmail.com" 
                className="flex items-center space-x-4 bg-white-pink bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition-all group" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white-pink flex items-center justify-center group-hover:bg-lila-soft transition-colors">
                  <Mail className="w-6 h-6 md:w-7 md:h-7 text-lavender-dark group-hover:text-white-pink transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white-pink font-medium">Email</span>
                  <span className="text-lavender-pastel text-sm">alvaro.ismael.urgelles.revilla@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Efecto de brillo en los bordes */}
        <div
          className="absolute w-full h-full border-2 border-lavender-pastel border-opacity-30 backface-hidden"
          style={{
            transform: "scale(1.03)",
            boxShadow: "0 0 15px rgba(219, 182, 238, 0.5)",
          }}
        ></div>
      </motion.div>

      {/* Controles de navegación */}
      <div className="absolute bottom-[0px] flex space-x-3">
        <button
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors ${
            currentFace === "front" ? "bg-white-pink" : "bg-lavender-pastel opacity-50 hover:opacity-100"
          }`}
          onClick={() => rotateTo("front")}
          aria-label="Ver perfil"
        ></button>
        <button
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors ${
            currentFace === "back" ? "bg-white-pink" : "bg-lavender-pastel opacity-50 hover:opacity-100"
          }`}
          onClick={() => rotateTo("back")}
          aria-label="Ver proyecto destacado"
        ></button>
        <button
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors ${
            currentFace === "right" ? "bg-white-pink" : "bg-lavender-pastel opacity-50 hover:opacity-100"
          }`}
          onClick={() => rotateTo("right")}
          aria-label="Ver habilidades"
        ></button>
        <button
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors ${
            currentFace === "left" ? "bg-white-pink" : "bg-lavender-pastel opacity-50 hover:opacity-100"
          }`}
          onClick={() => rotateTo("left")}
          aria-label="Ver experiencia"
        ></button>
        <button
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors ${
            currentFace === "top" ? "bg-white-pink" : "bg-lavender-pastel opacity-50 hover:opacity-100"
          }`}
          onClick={() => rotateTo("top")}
          aria-label="Ver sobre mí"
        ></button>
        <button
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors ${
            currentFace === "bottom" ? "bg-white-pink" : "bg-lavender-pastel opacity-50 hover:opacity-100"
          }`}
          onClick={() => rotateTo("bottom")}
          aria-label="Ver contacto"
        ></button>
      </div>
    </div>
  )
}
