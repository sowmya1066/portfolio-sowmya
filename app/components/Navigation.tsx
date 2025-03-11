"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const Navigation = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <motion.nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(34, 39, 55, 0.8)",
        backdropFilter: "blur(12px)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#CA054D",
            }}
          >
            Sowmya G S
          </Link>
          <div style={{ display: isMobile ? "block" : "none" }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                color: "hsl(var(--foreground))",
                transition: "color 0.3s",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#CA054D")}
              onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--foreground))")}
            >
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
          <ul
            style={{
              display: isMobile ? "none" : "flex",
              gap: "1.5rem",
            }}
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={isMobile ? `/#${item.name.toLowerCase()}` : item.path}
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    transition: "color 0.3s",
                    color: pathname === item.path ? "#CA054D" : "hsl(var(--foreground))",
                    position: "relative",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#CA054D")}
                  onMouseOut={(e) => {
                    if (pathname !== item.path) {
                      e.currentTarget.style.color = "hsl(var(--foreground))"
                    }
                  }}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div
                      style={{
                        position: "absolute",
                        bottom: "-4px",
                        left: 0,
                        right: 0,
                        height: "2px",
                        backgroundColor: "#CA054D",
                      }}
                      layoutId="underline"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isOpen && (
        <motion.div
          style={{ display: isMobile ? "block" : "none" }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <ul style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={`/#${item.name.toLowerCase()}`}
                  style={{
                    display: "block",
                    padding: "0.5rem 0",
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    transition: "color 0.3s",
                    color: pathname === item.path ? "#CA054D" : "hsl(var(--foreground))",
                  }}
                  onClick={() => setIsOpen(false)}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#CA054D")}
                  onMouseOut={(e) => {
                    if (pathname !== item.path) {
                      e.currentTarget.style.color = "hsl(var(--foreground))"
                    }
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navigation

