"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/data"

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-12">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-lavender-pastel rounded-lg overflow-hidden shadow-lg flex flex-col h-full"
        >
          <div className="relative h-48 md:h-56 lg:h-64">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-purple-900 bg-opacity-0 hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lila-soft hover:bg-lavender-dark text-white-pink px-4 py-2 rounded-md transition-colors text-sm md:text-base"
              >
                Ver proyecto
              </Link>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-purple-900 font-semibold text-lg md:text-xl mb-2">{project.title}</h3>
            <p className="text-purple-900 text-xs md:text-sm mb-4">{project.description}</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-xs bg-lavender-dark text-white-pink px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
