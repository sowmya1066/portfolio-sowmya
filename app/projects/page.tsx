import {useEffect, useState} from "react";
import { ExternalLink, Github, Code, Sparkles } from "lucide-react"
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Particles to avoid SSR issues
const Particles = dynamic(
  () => import("react-particles").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#CA054D]/10" />
    ),
  }
);
const projects = [
  {
    title: "Next Food",
    description: "A recipe-sharing platform built with Nextjs, where users can explore community and share their favorite recipes.",
    image: "/placeholder.svg?height=300&width=400&text=Neon+Dreams",
    tags: ["Next.js", "Javascript", "SQLite"],
    links: {
      github: "https://github.com/sowmya1066/nextjs",
      live: "https://next-food-iota.vercel.app/meals",
    },
  },
  {
    title: "E-commerce ShopOn",
    description: "An e-commerce shopping app built with Express.js, handling meal data retrieval and order processing via REST APIs",
    image: "/placeholder.svg?height=300&width=400&text=Crypto+Dashboard",
    tags: ["React", "NodeJS", "ExpressJS", "RestAPIs"],
    links: {
      github: "https://github.com/sowmya1066/shopon",
      live: "https://shopon-green.vercel.app/",
    },
  },
  {
    title: "Zen List",
    description: "Create your todo's using machine learning algorithms",
    image: "/placeholder.svg?height=300&width=400&text=AI+Art+Generator",
    tags: ["Python", "TensorFlow", "React"],
    links: {
      github: "https://github.com/sowmya1066/ZenList",
      live: "https://zen-list.vercel.app/",
    },
  },
  {
    title: "Wheel Trek",
    description: "An interactive map application using Leaflet that lets users log and visualize their cycling routes and activity details.",
    image: "/placeholder.svg?height=300&width=400&text=Crypto+Dashboard",
    tags: ["JavaScript", "API Integration", "Leaflet"],
    links: {
      github: "https://github.com/sowmya1066/wheeltrek",
      live: "https://wheeltrek-sowmya.netlify.app/",
    },
  },
]

export default function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const particlesInit = async (engine: any) => {
    // This is important to avoid runtime errors
    await import("tsparticles-engine");
    await import("tsparticles-slim").then((mod) => mod.loadSlim(engine));
    setParticlesLoaded(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const tagVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };


  return (
    <div className="min-h-screen pt-20 p-8 relative">
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
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "gentle",
                  parallax: {
                    enable: true,
                    force: 10,
                    smooth: 10,
                  },
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 2,
                },
                gentle: {
                  radius: 100,
                  factor: 3,
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
                opacity: 0.3,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 1000,
                },
                value: 60,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Floating elements */}
      <motion.div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          color: "rgba(202, 5, 77, 0.3)",
          zIndex: 0,
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Code size={60} />
      </motion.div>

      <motion.div
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          color: "rgba(202, 5, 77, 0.3)",
          zIndex: 0,
        }}
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Sparkles size={50} />
      </motion.div>

      {/* Glowing orb that follows mouse */}
      <motion.div
        className="hidden md:block"
        style={{
          position: "fixed",
          width: "20rem",
          height: "20rem",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(202, 5, 77, 0.15) 0%, rgba(202, 5, 77, 0) 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 100,
          mass: 0.8,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-5xl font-bold mb-12 gradient-text">My Projects</h1>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              style={{
                border: "1px solid rgba(202, 5, 77, 0.2)",
                backgroundColor: "rgba(34, 39, 55, 0.5)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="relative overflow-hidden h-48">
                <motion.img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background to-transparent"
                  initial={{ opacity: 0.7 }}
                  animate={{
                    opacity: hoveredCard === index ? 0.9 : 0.7,
                    background:
                      hoveredCard === index
                        ? "linear-gradient(to top, rgba(34, 39, 55, 1), rgba(34, 39, 55, 0.5), transparent)"
                        : "linear-gradient(to top, rgba(34, 39, 55, 1), transparent)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="p-6">
                <motion.h3
                  className="text-2xl font-bold mb-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-muted-foreground mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index + 0.1, duration: 0.5 }}
                >
                  {project.description}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      variants={tagVariants}
                      className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-full text-sm"
                      style={{
                        border: "1px solid rgba(202, 5, 77, 0.3)",
                        backgroundColor: "rgba(202, 5, 77, 0.3)",
                      }}
                      whileHover={{
                        backgroundColor: "rgba(202, 5, 77, 0.3)",
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  className="flex space-x-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index + 0.2, duration: 0.5 }}
                >
                  <motion.a
                    href={project.links.github}
                    className="text-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href={project.links.live}
                    className="text-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

