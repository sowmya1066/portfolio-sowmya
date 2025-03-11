"use client";
import { Github, Linkedin, Twitter } from "lucide-react"
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";


const Particles = dynamic(
  () => import("react-particles").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#CA054D]/10" />
    ),
  }
);
export default function About() {
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  return (
    <div className="min-h-screen pt-20 p-8">
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
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
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
                speed: 0.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 60,
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
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 gradient-text">About Me</h1>
         <div className="relative">
            <div className="w-64 h-64 rounded-full overflow-hidden mx-auto mb-20">
              <img src="/placeholder.svg?height=256&width=256" alt="Alex" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-accent/20 blur-3xl -z-10"></div>
          </div>
        <div className="grid md:grid-cols-1 gap-12 items-center">
          <div style={{
                backgroundColor: "rgba(0, 0, 0, 0)",

                color: "white",
                padding: "0.75rem 1.5rem",
                border: "1px solid rgba(128, 128, 128, 0.2)",
                borderRadius: "10px",
                
              }}>
            <p className="text-xl mb-6">
              I specialize in developing real-time dashboards, data visualizations, and seamless monitoring tools for smart surveillance and security solutions across Video, Face and Traffic Management Systems. My work focuses on transforming raw data into clear, actionable insights through intuitive interfaces designed for operational ease.
            </p>
            <p className="text-xl mb-6">
             Earlier in my journey, I contributed to a pharmaceutical career platform, enhancing job search APIs to deliver faster, more accurate job discovery experiences for candidates exploring opportunities in the healthcare sector.
            </p>
           <p className="text-xl mb-6">
              With every project, my focus remains the same — creating solutions that not only work flawlessly but also enhance the way users interact with technology. Constantly learning and evolving, I see every line of code as an opportunity to create something impactful.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/sowmya1066" className="text-foreground hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/sowmya-g-s-060b95210" className="text-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

