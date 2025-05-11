"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="py-10 md:py-20 lg:py-24 bg-lavender-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-white-pink text-center">Sobre Mí</h2>

          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-20 justify-between">
            <div className="md:w-1/3 md:px-4">
              <div className="relative w-70 h-70 md:w-82 md:h-82 lg:w-80 lg:h-80 mx-auto rounded-full overflow-hidden border-4 border-lila-soft shadow-lg">
                <Image src="/images/personal.jpg" alt="Foto de perfil" fill className="object-cover" />
              </div>
            </div>

            <div className="md:w-2/3 md:pl-8">
              <p className="text-lavender-pastel mb-4 text-sm md:text-base">
                Soy un desarrollador Full Stack apasionado por crear soluciones web completas y escalables. Me destaco en el desarrollo tanto Frontend como Backend, con experiencia en múltiples tecnologías y frameworks modernos.
              </p>
              <p className="text-lavender-pastel mb-4 text-sm md:text-base">
                Mi enfoque integral me permite desarrollar aplicaciones web de principio a fin, desde la interfaz de usuario hasta la arquitectura del servidor y bases de datos, asegurando un producto robusto y eficiente.
              </p>
              <p className="text-lavender-pastel text-sm md:text-base">
                Constantemente me mantengo actualizado con las últimas tecnologías y mejores prácticas del desarrollo web, buscando siempre la excelencia técnica en cada proyecto.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-purple-900 p-3 rounded-lg text-center">
                  <h3 className="text-white-pink font-semibold text-sm md:text-base">Frontend</h3>
                  <p className="text-lavender-pastel text-xs md:text-sm">Next.js, Vue, React</p>
                </div>
                <div className="bg-purple-900 p-3 rounded-lg text-center">
                  <h3 className="text-white-pink font-semibold text-sm md:text-base">CSS</h3>
                  <p className="text-lavender-pastel text-xs md:text-sm">Tailwind, CSS3, Bootstrap</p>
                </div>
                <div className="bg-purple-900 p-3 rounded-lg text-center">
                  <h3 className="text-white-pink font-semibold text-sm md:text-base">Backend</h3>
                  <p className="text-lavender-pastel text-xs md:text-sm whitespace-normal">Laravel, SpringBoot, PostgreSQL, MongoDB, MySQL</p>
                </div>
                <div className="bg-purple-900 p-3 rounded-lg text-center">
                  <h3 className="text-white-pink font-semibold text-sm md:text-base">Base</h3>
                  <p className="text-lavender-pastel text-xs md:text-sm">HTML5, JavaScript, PHP, TypeScript, C++, Java</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
