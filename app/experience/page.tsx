"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react"
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


const experiences = [
  {
    title: "Software Engineer",
    company: "Appiness Interactive",
    period: "September 2024 - Present",
    description:
      "I specialize in building real-time monitoring dashboards for traffic surveillance, facial recognition, and video management, focusing on event visualization, live camera integration, and seamless data handling. Using React, Next.js, TypeScript, JavaScript, Python and styling tools like Shadcn, Chakra UI and Tailwind. Developed real-time event updates via WebSockets and REST APIs. I implemented shift-based event tracking with drilldown charts, allowing users to explore detailed traffic and security events for each shift. Integrated logic to calculate storage and hardware requirements based on camera type, recording duration, and environment. My work also includes handling live RTSP/HLS streams, dynamic server selection, and real-time alert scrolling systems for continuous event updates. I improved search efficiency by 10% in traffic violation lookups through optimized filtering logic and backend queries. Across all projects, I focused on combining visual clarity, functional depth, and performance optimization to deliver seamless user experiences.",
  },
  {
    title: "Junior Software Engineer",
    company: "Indegene",
    period: "July 2022 - September 2024",
    description:
      "Developed dynamic web pages for BI.com, ensuring a optimal user experience. Collaborated on the Page-As-A-Service (PaaS) feature, which enabled business users to quickly create and manage web pages with minimal technical intervention. A key part of my contribution was integrating the Taleo API with SAP SuccessFactors, automating job postings and ensuring seamless candidate data synchronization between the systems. This integration enhanced the overall recruitment process automation by reducing manual data handling and ensuring real-time updates.",
  },
  {
    title: "Program Analyst Trainee (Internship)",
    company: "Cognizant",
    period: "January 2022 - June 2022",
    description:
      "Worked on an eCommerce application, building dynamic product listing pages, category filters, and an interactive cart system using React. Applied advanced state management with Context API and Redux to efficiently handle large product data and user interactions. Streamlined data fetching and synchronization with backend services to ensure real-time updates. Focused on component reusability, performance optimization, and scalable architecture. Gained hands-on experience with SDLC , API integration, and state handling best practices.",
  },
]

export default function Experience() {
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
            fpsLimit: 120,
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 gradient-text">Work Experience</h1>
        <div className="space-y-12 relative">
          <div className="absolute left-8 top-2 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
          {experiences.map((job, index) => (
            <div key={index} className="relative pl-16">
              <div className="absolute left-0 top-2 w-16 h-16 flex items-center justify-center">
                <div className="absolute w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-background rounded-full"></div>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 hover:shadow-lg transition-shadow border border-border/50">
                <div className="flex items-center mb-2">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-bold">{job.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {job.company} | {job.period}
                </p>
                <p>{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

