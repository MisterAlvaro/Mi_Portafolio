"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log(formData)
    alert("¡Gracias por tu mensaje! Te responderé pronto.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 bg-purple-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-white-pink text-center">Contacto</h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="name" className="block text-lavender-pastel mb-2 text-sm md:text-base">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md bg-white-pink border border-lila-soft focus:border-lila-soft focus:ring-2 focus:ring-lila-soft text-purple-900 text-sm md:text-base"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lavender-pastel mb-2 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md bg-white-pink border border-lila-soft focus:border-lila-soft focus:ring-2 focus:ring-lila-soft text-purple-900 text-sm md:text-base"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lavender-pastel mb-2 text-sm md:text-base">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-md bg-white-pink border border-lila-soft focus:border-lila-soft focus:ring-2 focus:ring-lila-soft text-purple-900 text-sm md:text-base"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-lila-soft hover:bg-lavender-dark text-white-pink py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
            >
              Enviar mensaje
              <Send size={18} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
