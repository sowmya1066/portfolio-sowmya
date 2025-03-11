"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Code,
  Sparkles,
} from "lucide-react"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"

// Dynamically import Particles to avoid SSR issues
const Particles = dynamic(() => import("react-particles").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#CA054D]/10" />,
})

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSection, setCurrentSection] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [particlesLoaded, setParticlesLoaded] = useState(false)

  const sections = ["hero", "about", "experience", "projects", "contact"]

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  const particlesInit = async (engine: any) => {
    // This is important to avoid runtime errors
    await import("tsparticles-engine")
    await import("tsparticles-slim").then((mod) => mod.loadSlim(engine))
    setParticlesLoaded(true)
  }

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
      setCurrentSection(index)
    }
  }

  // Handle intersection observer to update current section
  useEffect(() => {
    if (typeof window === "undefined") return

    const observers = sections.map((_, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setCurrentSection(index)
          }
        },
        { threshold: 0.5 },
      )

      if (sectionRefs.current[index]) {
        observer.observe(sectionRefs.current[index]!)
      }

      return observer
    })

    return () => {
      observers.forEach((observer, index) => {
        if (sectionRefs.current[index]) {
          observer.unobserve(sectionRefs.current[index]!)
        }
      })
    }
  }, [])

  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom right, hsl(222.2, 84%, 4.9%), hsl(222.2, 84%, 4.9%), rgba(202, 5, 77, 0.1))",
      }}
    >
      {/* Particles Background */}
      <div className="fixed inset-0 -z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
              
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 1.4,
                },
              },
            },
            particles: {
              color: {
                value: "#CA054D",
              },
              links: {
                color: "#CA054D",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Hero Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        id="hero"
        className="h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden"
      >
        <motion.div
          className="z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 relative">
            <span style={{ color: "#CA054D" }}>Software</span>
            <br />
            <span style={{ color: "#CA054D" }}>Engineer</span>
            <motion.div
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "0.5rem",
                background: "linear-gradient(to right, #CA054D, rgba(202, 5, 77, 0.7), rgba(202, 5, 77, 0.5))",
                opacity: 0.75,
                filter: "blur(16px)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </h1>
          <motion.p
            className="text-xl md:text-2xl mb-12"
            style={{ color: "hsl(215, 20.2%, 65.1%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Crafting digital experiences with code and imagination
          </motion.p>
          <motion.div
            className="flex space-x-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <button
              style={{
                backgroundColor: "#CA054D",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.3s",
              }}
              onClick={() => router.push("/projects")}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(202, 5, 77, 0.8)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#CA054D")}
            >
              View Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              style={{
                backgroundColor: "rgba(202, 5, 77, 0.2)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                fontWeight: 500,
                border: "1px solid rgba(202, 5, 77, 0.5)",
                transition: "background-color 0.3s",
              }}
              onClick={() => router.push("/contact")}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(202, 5, 77, 0.3)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(202, 5, 77, 0.2)")}
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex space-x-6 mt-12 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a
            href="https://github.com/sowmya1066"
            style={{ color: "hsl(var(--foreground))", transition: "color 0.3s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#CA054D")}
            onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--foreground))")}
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/sowmya-g-s-060b95210"
            style={{ color: "hsl(var(--foreground))", transition: "color 0.3s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#CA054D")}
            onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--foreground))")}
          >
            <Linkedin size={24} />
          </a>
          <a
            href="#"
            style={{ color: "hsl(var(--foreground))", transition: "color 0.3s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#CA054D")}
            onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--foreground))")}
          >
            <Twitter size={24} />
          </a>
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            width: "16rem",
            height: "16rem",
            backgroundColor: "rgba(202, 5, 77, 0.2)",
            borderRadius: "9999px",
            filter: "blur(24px)",
          }}
          animate={{
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
          }}
          transition={{ type: "spring", damping: 10, stiffness: 50 }}
        />
      </section>

      {/* Mobile Sections */}
      <div className="md:hidden">
        {/* About Section */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          id="about"
          className="h-screen py-16 px-8 flex flex-col justify-center relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#CA054D" }}>
              About Me
            </h2>

            <div className="grid gap-6 relative">
              {/* Floating code symbols */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "-2.5rem",
                  right: "-1.25rem",
                  color: "rgba(202, 5, 77, 0.3)",
                  zIndex: 0,
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Code size={40} />
              </motion.div>

              <motion.div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "-1.25rem",
                  color: "rgba(202, 5, 77, 0.3)",
                  zIndex: 0,
                }}
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Sparkles size={40} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: "rgba(202, 5, 77, 0.05)",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(202, 5, 77, 0.2)",
                  position: "relative",
                }}
              >
                <p className="text-lg">
                  Hey there! I'm Alex, a creative developer with a passion for building beautiful, interactive web
                  experiences. With 5 years of experience in the field, I love pushing the boundaries of what's possible
                  on the web.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: "rgba(202, 5, 77, 0.1)",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(202, 5, 77, 0.2)",
                  position: "relative",
                }}
              >
                <p className="text-lg">
                  When I'm not coding, you can find me experimenting with new technologies, contributing to open-source
                  projects, or exploring the great outdoors.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 mt-4"
              >
                {["JavaScript", "React", "Next.js", "Node.js", "TypeScript", "UI/UX"].map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: "rgba(202, 5, 77, 0.2)",
                      color: "white",
                      border: "1px solid rgba(202, 5, 77, 0.5)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.875rem",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Background elements */}
          <div
            style={{
              position: "absolute",
              top: "25%",
              right: 0,
              width: "8rem",
              height: "8rem",
              backgroundColor: "rgba(202, 5, 77, 0.1)",
              borderRadius: "9999px",
              filter: "blur(24px)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "25%",
              left: 0,
              width: "10rem",
              height: "10rem",
              backgroundColor: "rgba(202, 5, 77, 0.05)",
              borderRadius: "9999px",
              filter: "blur(24px)",
            }}
          ></div>
        </section>

        {/* Work Experience Section */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          id="experience"
          className="h-screen py-16 px-8 flex flex-col justify-center relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#CA054D" }}>
              Work Experience
            </h2>
            <div className="space-y-8 relative">
              {/* Timeline line */}
              <div
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "0.5rem",
                  bottom: 0,
                  width: "0.125rem",
                  background: "linear-gradient(to bottom, #CA054D, transparent)",
                }}
              ></div>

              {[
                {
                  title: "Senior Frontend Developer",
                  company: "TechCorp Inc.",
                  period: "2021 - Present",
                  description:
                    "Led the development of a complex SPA using React and GraphQL. Improved site performance by 40%.",
                },
                {
                  title: "Full Stack Developer",
                  company: "WebSolutions Ltd.",
                  period: "2018 - 2021",
                  description:
                    "Developed and maintained multiple client websites. Implemented CI/CD pipelines for faster deployments.",
                },
                {
                  title: "Junior Developer",
                  company: "StartUp Innovations",
                  period: "2016 - 2018",
                  description:
                    "Assisted in the development of a mobile app using React Native. Learned and applied Agile methodologies.",
                },
              ].map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  style={{ paddingLeft: "2.5rem", position: "relative" }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "0.5rem",
                      width: "1.5rem",
                      height: "1.5rem",
                      backgroundColor: "#CA054D",
                      borderRadius: "9999px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "0.75rem",
                        height: "0.75rem",
                        backgroundColor: "hsl(var(--background))",
                        borderRadius: "9999px",
                      }}
                    ></div>
                  </div>

                  <Card
                    style={{
                      transition: "box-shadow 0.3s",
                      border: "1px solid rgba(202, 5, 77, 0.2)",
                      backgroundColor: "rgba(34, 39, 55, 0.5)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <CardContent style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                        <Briefcase
                          style={{ marginRight: "0.5rem", height: "1.25rem", width: "1.25rem", color: "#CA054D" }}
                        />
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{job.title}</h3>
                      </div>
                      <p style={{ color: "hsl(215, 20.2%, 65.1%)", marginBottom: "0.5rem" }}>
                        {job.company} | {job.period}
                      </p>
                      <p>{job.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Background elements */}
          <div
            style={{
              position: "absolute",
              top: "33%",
              right: 0,
              width: "10rem",
              height: "10rem",
              backgroundColor: "rgba(202, 5, 77, 0.1)",
              borderRadius: "9999px",
              filter: "blur(24px)",
            }}
          ></div>
        </section>

        {/* Projects Section */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          id="projects"
          className="h-screen py-16 px-8 flex flex-col justify-center relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#CA054D" }}>
              Projects
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "AI-Powered Task Manager",
                  description: "A smart to-do app that uses AI to prioritize and categorize tasks.",
                  tags: ["React", "Node.js", "OpenAI API"],
                  image: "/placeholder.svg?height=200&width=400&text=AI+Task+Manager",
                },
                {
                  title: "Virtual Reality Portfolio",
                  description: "An immersive VR experience showcasing web development projects.",
                  tags: ["Three.js", "WebVR", "React"],
                  image: "/placeholder.svg?height=200&width=400&text=VR+Portfolio",
                },
                {
                  title: "Blockchain Voting System",
                  description: "A secure and transparent voting platform built on blockchain technology.",
                  tags: ["Solidity", "Ethereum", "Web3.js"],
                  image: "/placeholder.svg?height=200&width=400&text=Blockchain+Voting",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card
                    style={{
                      overflow: "hidden",
                      transition: "box-shadow 0.3s",
                      border: "1px solid rgba(202, 5, 77, 0.2)",
                      backgroundColor: "rgba(34, 39, 55, 0.5)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        style={{ width: "100%", height: "12rem", objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, hsl(222.2, 84%, 4.9%), transparent)",
                        }}
                      ></div>
                    </div>
                    <CardContent style={{ padding: "1.5rem" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>{project.title}</h3>
                      <p style={{ color: "hsl(215, 20.2%, 65.1%)", marginBottom: "1rem" }}>{project.description}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            style={{
                              backgroundColor: "rgba(202, 5, 77, 0.2)",
                              color: "white",
                              border: "1px solid rgba(202, 5, 77, 0.5)",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "9999px",
                              fontSize: "0.875rem",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "0.375rem",
                            border: "1px solid rgba(202, 5, 77, 0.5)",
                            backgroundColor: "transparent",
                            color: "white",
                            fontSize: "0.875rem",
                            transition: "background-color 0.3s",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(202, 5, 77, 0.2)")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <Github style={{ marginRight: "0.5rem", height: "1rem", width: "1rem" }} /> Code
                        </button>
                        <button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "0.375rem",
                            backgroundColor: "#CA054D",
                            color: "white",
                            fontSize: "0.875rem",
                            transition: "background-color 0.3s",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(202, 5, 77, 0.8)")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#CA054D")}
                        >
                          <ExternalLink style={{ marginRight: "0.5rem", height: "1rem", width: "1rem" }} /> Demo
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Background elements */}
          <div
            style={{
              position: "absolute",
              bottom: "25%",
              left: 0,
              width: "10rem",
              height: "10rem",
              backgroundColor: "rgba(202, 5, 77, 0.1)",
              borderRadius: "9999px",
              filter: "blur(24px)",
            }}
          ></div>
        </section>

        {/* Contact Section */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          id="contact"
          className="h-screen py-16 px-8 flex flex-col justify-center relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#CA054D" }}>
              Get in Touch
            </h2>
            <p className="text-lg mb-6">
              I'm always open to new opportunities and collaborations. Whether you have a project in mind or just want
              to say hi, feel free to reach out!
            </p>
            <form className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="name"
                  style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    backgroundColor: "hsl(217.2, 32.6%, 17.5%)",
                    color: "hsl(var(--foreground))",
                    border: "1px solid rgba(202, 5, 77, 0.2)",
                    outline: "none",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#CA054D"
                    e.currentTarget.style.boxShadow = "0 0 0 1px #CA054D"
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(202, 5, 77, 0.2)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                  required
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="email"
                  style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    backgroundColor: "hsl(217.2, 32.6%, 17.5%)",
                    color: "hsl(var(--foreground))",
                    border: "1px solid rgba(202, 5, 77, 0.2)",
                    outline: "none",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#CA054D"
                    e.currentTarget.style.boxShadow = "0 0 0 1px #CA054D"
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(202, 5, 77, 0.2)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                  required
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="message"
                  style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    backgroundColor: "hsl(217.2, 32.6%, 17.5%)",
                    color: "hsl(var(--foreground))",
                    border: "1px solid rgba(202, 5, 77, 0.2)",
                    outline: "none",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#CA054D"
                    e.currentTarget.style.boxShadow = "0 0 0 1px #CA054D"
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(202, 5, 77, 0.2)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                  required
                ></textarea>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#CA054D",
                    color: "white",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    fontWeight: 500,
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(202, 5, 77, 0.8)")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#CA054D")}
                >
                  Send Message
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* Background elements */}
          <div
            style={{
              position: "absolute",
              top: "25%",
              right: 0,
              width: "10rem",
              height: "10rem",
              backgroundColor: "rgba(202, 5, 77, 0.1)",
              borderRadius: "9999px",
              filter: "blur(24px)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "33%",
              left: 0,
              width: "8rem",
              height: "8rem",
              backgroundColor: "rgba(202, 5, 77, 0.05)",
              borderRadius: "9999px",
              filter: "blur(24px)",
            }}
          ></div>
        </section>

        {/* Navigation Buttons */}
        <div
          style={{
            position: "fixed",
            bottom: "1rem",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            zIndex: 50,
          }}
        >
          <button
            onClick={() => scrollToSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            style={{
              backgroundColor: "rgba(34, 39, 55, 0.2)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(202, 5, 77, 0.5)",
              borderRadius: "0.375rem",
              width: "2.5rem",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s",
              opacity: currentSection === 0 ? 0.5 : 1,
              cursor: currentSection === 0 ? "not-allowed" : "pointer",
            }}
            onMouseOver={(e) => {
              if (currentSection !== 0) {
                e.currentTarget.style.backgroundColor = "rgba(202, 5, 77, 0.2)"
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(34, 39, 55, 0.2)"
            }}
          >
            <ChevronLeft style={{ height: "1rem", width: "1rem" }} />
          </button>
          <button
            onClick={() => scrollToSection(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
            style={{
              backgroundColor: "rgba(34, 39, 55, 0.2)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(202, 5, 77, 0.5)",
              borderRadius: "0.375rem",
              width: "2.5rem",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s",
              opacity: currentSection === sections.length - 1 ? 0.5 : 1,
              cursor: currentSection === sections.length - 1 ? "not-allowed" : "pointer",
            }}
            onMouseOver={(e) => {
              if (currentSection !== sections.length - 1) {
                e.currentTarget.style.backgroundColor = "rgba(202, 5, 77, 0.2)"
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(34, 39, 55, 0.2)"
            }}
          >
            <ChevronRight style={{ height: "1rem", width: "1rem" }} />
          </button>
        </div>
      </div>
    </main>
  )
}

