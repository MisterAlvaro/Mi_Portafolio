"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError(false)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      // Envía los datos utilizando la API Fetch
      const response = await fetch("https://formsubmit.co/alvaro.ismael.urgelles.revilla@gmail.com", {
        method: "POST",
        body: formData
      })
      
      if (response.ok) {
        setSuccess(true)
        formRef.current?.reset()
        setFormData({ name: "", email: "", message: "" })
      } else {
        setError(true)
      }
    } catch (error) {
      console.error("Error sending form:", error)
      setError(true)
    } finally {
      setLoading(false)
    }
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

          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="space-y-4 md:space-y-6"
            action="https://formsubmit.co/alvaro.ismael.urgelles.revilla@gmail.com"
            method="POST"
          >
            {/* Hidden input for FormSubmit.co */}
            <input type="hidden" name="_next" value="https://your-portfolio-url.com/thanks" />
            <input type="hidden" name="_subject" value="Nuevo mensaje de contacto desde Portfolio" />
            <input type="hidden" name="_captcha" value="false" />
            
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
              className={`w-full py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors text-sm md:text-base ${
                loading ? 'bg-lavender-dark cursor-wait' : 'bg-lila-soft hover:bg-lavender-dark'
              } text-white-pink`}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar mensaje'}
              <Send size={18} />
            </motion.button>
            
            {success && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-md mt-2">
                ¡Gracias por tu mensaje! Te responderé pronto.
              </div>
            )}
            
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-md mt-2">
                Hubo un problema al enviar tu mensaje. Por favor, inténtalo nuevamente.
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
