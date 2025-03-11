"use client";
import { Mail, Phone, MapPin } from "lucide-react"
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";

const Particles = dynamic(
  () => import("react-particles").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#CA054D]/10" />
    ),
  }
);

export default function Contact() {
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
            fpsLimit: 20,
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
                value: 40,
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
        <h1 className="text-5xl font-bold mb-12 gradient-text">Get in Touch</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xl mb-6">
              I'm always open to new opportunities and collaborations. Whether you have a project in mind or just want
              to say hi, feel free to reach out!
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="text-primary" size={24} />
                <span>sowmyaa2406@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-primary" size={24} />
                <span>00000000</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-primary" size={24} />
                <span>India</span>
              </div>
            </div>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 rounded-md bg-muted text-foreground"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 rounded-md bg-muted text-foreground"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-3 rounded-md bg-muted text-foreground"
                required
              ></textarea>
            </div>
            <button
              type="submit"
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
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

