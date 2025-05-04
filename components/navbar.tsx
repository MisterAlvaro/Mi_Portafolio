"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Sobre mí", href: "/#about" },
    { name: "Contacto", href: "/#contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-purple-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-white-pink text-xl md:text-2xl font-semibold">
            Portfolio<span className="text-lila-soft">3D</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lavender-pastel hover:text-white-pink transition-colors text-sm lg:text-base"
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault()
                    document.querySelector(link.href.substring(1))?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button className="md:hidden text-white-pink" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-purple-900"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lavender-pastel hover:text-white-pink transition-colors py-2"
                onClick={(e) => {
                  setIsOpen(false)
                  if (link.href.startsWith("/#")) {
                    e.preventDefault()
                    document.querySelector(link.href.substring(1))?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}
