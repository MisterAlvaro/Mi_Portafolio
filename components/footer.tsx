import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-purple-900 py-8 border-t border-lavender-pastel border-opacity-30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-white-pink text-xl font-semibold">
              Portfolio<span className="text-lila-soft">3D</span>
            </Link>
            <p className="text-lavender-pastel mt-2 text-sm">Diseño y desarrollo de experiencias digitales únicas</p>
          </div>

          <div className="flex space-x-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-pink hover:text-lila-soft transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-pink hover:text-lila-soft transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-pink hover:text-lila-soft transition-colors"
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-pink hover:text-lila-soft transition-colors"
            >
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-lavender-pastel border-opacity-30 text-center">
          <p className="text-lavender-pastel text-sm">
            © {new Date().getFullYear()} Portfolio3D. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
