import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import lotusIcon from "../../assets/lotus-icon.png"

const navLinks = [
  { label: "O que é PLEASE?", href: "#please" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Começar", href: "#cta" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-1 cursor-pointer"
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              <img src={lotusIcon} alt="Lotus Icon" className="h-8 w-8" />
            </span>
          </div>
          <span className="font-semibold text-lg underline underline-offset-4 decoration-primary">Âncora</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleSmoothScroll(link.href)}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <Link
          to="/login"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition shadow-sm"
        >
          Login
        </Link>
      </div>
    </header>
  )
}