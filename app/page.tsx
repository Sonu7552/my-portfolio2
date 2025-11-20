"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Server, Code, Activity, GitBranch, 
  CheckCircle, AlertCircle, Clock, Cloud, Database, 
  Cpu, Globe, ExternalLink, Github, Linkedin, Mail,
  MapPin, Send, ChevronRight, Download, Sun, Moon,
  GraduationCap, Wrench, Users, ShieldCheck, HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Configurations ---

const PERSONAL_INFO = {
  name: "Muhammad Saqib Afzal",
  title: "Software Engineering Graduate",
  subtitle: "Transitioning to DevOps & Cloud Engineering",
  email: "saqibchauhdary109@gmail.com",
  location: "Lahore, Pakistan",
  github: "https://github.com/Sonu7552",
  linkedin: "https://www.linkedin.com/in/muhammad-saqib-afzal-90a799234/"
};

const EDUCATION = [
  {
    degree: "Bachelor of Science in Software Engineering",
    school: "Superior University, Lahore",
    year: "2020 - 2024",
    desc: "Focused on Software Architecture, SDLC, and Cloud Computing."
  },
  {
    degree: "Intermediate in Pre-Engineering",
    school: "Superior College, Lahore",
    year: "2018 - 2020",
    desc: "Foundation in Mathematics and Physics."
  }
];

const EXPERIENCE = [
  {
    company: "University of Lahore (IT Centre)",
    role: "DevOps Intern",
    period: "Current",
    desc: "Implementing CI/CD pipelines using Jenkins and GitHub Actions. Monitoring system performance and analyzing logs to resolve infrastructure issues. Automating tasks using Bash scripting.",
    tags: ["Jenkins", "Docker", "Bash", "Log Analysis"]
  },
  {
    company: "Freelance / Upwork",
    role: "Web & App Developer",
    period: "2023 - Present",
    desc: "Developing responsive web apps using React.js/Next.js and Android apps using Java/XML. Deploying applications on Vercel and Netlify.",
    tags: ["React", "Next.js", "Android (Java)", "Firebase"]
  }
];

const SKILLS = {
  devops: [
    { name: "Linux Admin (Ubuntu)", level: 80 },
    { name: "Docker & Containerization", level: 75 },
    { name: "Jenkins (CI/CD)", level: 70 },
    { name: "AWS (EC2, Security Groups)", level: 60 },
    { name: "Nginx Reverse Proxy", level: 65 }
  ],
  web: [
    { name: "React.js / Next.js 15", level: 85 },
    { name: "Node.js / REST APIs", level: 75 },
    { name: "Tailwind CSS", level: 90 },
    { name: "MySQL / Database", level: 80 }
  ]
};

const TOOLS = [
  "VS Code", "Termius (SSH)", "Jenkins", "Docker Hub", "Git", "Postman"
];

const PROJECTS = [
  {
    title: "Hybrid DevOps Architecture",
    type: "DevOps Showcase",
    desc: "I didn't just build a website; I built a dual-pipeline engineering showcase. The frontend deploys via Vercel (GitOps) while the backend runs on a self-hosted AWS EC2 instance managed via Jenkins.",
    stack: ["Next.js 15", "AWS EC2", "Jenkins", "Docker", "Nginx"],
    status: "Production",
    link: "#"
  },
  {
    title: "Automated Deployment Pipeline",
    type: "DevOps",
    desc: "Designed a complete CI/CD pipeline with automated testing, building, and deployment stages, significantly reducing manual deployment time.",
    stack: ["Jenkins", "Docker", "GitHub Actions"],
    status: "Production",
  },
  {
    title: "E-Commerce Platform",
    type: "Full Stack",
    desc: "Built a feature-rich e-commerce platform with user authentication, shopping cart functionality, payment integration, and admin dashboards.",
    stack: ["Next.js", "Firebase", "Stripe"],
    status: "Live",
  }
];

const CHALLENGES = [
  {
    title: "The RAM Crash (Free Tier Constraints)",
    icon: <Activity size={20} className="text-rose-500" />,
    problem: "The AWS t2.micro instance (1GB RAM) crashed during `npm build` due to memory exhaustion.",
    solution: "I diagnosed the OOM Kill (Out of Memory) and configured 2GB of Linux Swap Memory to stabilize the build process."
  },
  {
    title: "The \"No Space Left\" Error",
    icon: <HardDrive size={20} className="text-amber-500" />,
    problem: "Jenkins builds failed because the default 8GB EBS volume filled up with Docker images.",
    solution: "I performed a live EBS Volume Expansion to 20GB and resized the Linux filesystem using `growpart` and `resize2fs` without downtime."
  },
  {
    title: "Container Orchestration",
    icon: <Users size={20} className="text-blue-500" />, // Placeholder icon
    problem: "Needed to update the application without downtime or port conflicts.",
    solution: "Implemented a Jenkins Pipeline that builds the new Docker image, stops the old container, and spins up the new one mapped to Nginx Port 80."
  }
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

// --- Components ---

const PipelineStep = ({ label, status, duration, isDark }: { label: string, status: 'success' | 'running' | 'pending' | 'failed', duration?: string, isDark: boolean }) => {
  const getColors = () => {
    if (isDark) {
        switch(status) {
          case 'success': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50';
          case 'running': return 'bg-blue-500/10 text-blue-400 border-blue-500/50 animate-pulse';
          case 'failed': return 'bg-rose-500/10 text-rose-400 border-rose-500/50';
          default: return 'bg-slate-800 text-slate-500 border-slate-700';
        }
    } else {
        switch(status) {
          case 'success': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
          case 'running': return 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse';
          case 'failed': return 'bg-rose-100 text-rose-700 border-rose-200';
          default: return 'bg-slate-100 text-slate-400 border-slate-200';
        }
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-3 rounded border ${getColors()} min-w-[100px] transition-all`}>
      <div className="text-xs font-mono mb-1">{label}</div>
      <div className="mb-1">
        {status === 'success' && <CheckCircle size={16} />}
        {status === 'running' && <Activity size={16} className="animate-spin" />}
        {status === 'pending' && <Clock size={16} />}
        {status === 'failed' && <AlertCircle size={16} />}
      </div>
      {duration && <div className="text-[10px] opacity-75">{duration}</div>}
    </div>
  );
};

const LogViewer = ({ isDark }: { isDark: boolean }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messages = [
      "[JENKINS] Triggering Pipeline: Portfolio-CI...",
      "[AWS] Checking EC2 Resources (t2.micro)...",
      "[LINUX] Swap Memory Status: 2GB Available (OK)",
      "[DOCKER] Building image: node:20-alpine...",
      "[BUILD] Next.js Standalone Output generated",
      "[DOCKER] Stopping old container...",
      "[DOCKER] Starting new container on Port 3000...",
      "[NGINX] Reloading Proxy Configuration...",
      "[SUCCESS] 🚀 Application Live on AWS EC2"
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLogs(prev => [...prev, `> ${new Date().toISOString().split('T')[1].split('.')[0]} ${messages[i]}`]);
        i++;
      } else {
        setLogs([]); 
        i = 0;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const containerClass = isDark ? "bg-slate-950 border-slate-800" : "bg-slate-900 border-slate-300 text-slate-100";

  return (
    <div className={`${containerClass} rounded-lg border p-4 font-mono text-xs h-64 overflow-hidden flex flex-col shadow-inner transition-colors`}>
      <div className="flex items-center justify-between mb-2 border-b border-slate-700 pb-2">
        <span className="text-slate-400 flex items-center gap-2"><Terminal size={12}/> jenkins-console-output</span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
        </div>
      </div>
      <div ref={scrollRef} className="overflow-y-auto flex-1 space-y-1 text-emerald-500/90 font-mono">
        <AnimatePresence>
          {logs.map((log, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="break-all"
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="animate-pulse text-emerald-500">_</div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, unit, trend, color = "text-white", isDark }: any) => {
    const cardClass = isDark 
        ? "bg-slate-900 border-slate-800 shadow-lg" 
        : "bg-white border-slate-200 shadow-lg hover:shadow-xl";
    
    const textColor = (!isDark && color === "text-white") ? "text-slate-900" : color;

    return (
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className={`${cardClass} p-4 rounded-lg border transition-colors`}
      >
        <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">{label}</div>
        <div className="flex items-baseline space-x-1">
          <span className={`text-2xl font-bold ${textColor}`}>{value}</span>
          <span className="text-xs text-slate-400">{unit}</span>
        </div>
        {trend && (
          <div className={`text-xs mt-2 ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last hr
          </div>
        )}
      </motion.div>
    );
};

// --- Main Application ---

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('portfolio');
  const [metrics, setMetrics] = useState({ cpu: 0, mem: 0, uptime: 0, region: '...' });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // --- REAL-TIME DATA FETCHING ---
  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        setMetrics({
          cpu: data.cpu,
          mem: data.memory,
          uptime: data.uptime,
          region: data.region
        });
      } catch (err) {
        console.error("Monitoring Error:", err);
      }
    };

    // Fetch immediately and then every 3 seconds
    fetchHealth();
    const interval = setInterval(fetchHealth, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSend = () => {
    const { name, email, message } = formData;
    if (!name || !message) {
      alert("Please fill in your name and message.");
      return;
    }
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Portfolio Contact: ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
  };

  // Helper Classes
  const bgClass = isDarkMode ? "bg-slate-950 text-slate-200" : "bg-slate-50 text-slate-800";
  const navClass = isDarkMode ? "bg-slate-950/80 border-white/5" : "bg-white/80 border-slate-200 shadow-sm";
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-md";
  const headingClass = isDarkMode ? "text-white" : "text-slate-900";
  const subHeadingClass = isDarkMode ? "text-slate-300" : "text-slate-700";
  const textMutedClass = isDarkMode ? "text-slate-400" : "text-slate-500";
  const inputClass = isDarkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900";

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${bgClass}`}>
      
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${navClass}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('portfolio')}>
              <Terminal className="text-emerald-500" size={24} />
              <span className="font-bold text-xl tracking-tight">Saqib.<span className="text-emerald-500">DevOps</span></span>
            </div>
            
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="hidden md:flex items-baseline space-x-2">
                {['portfolio', 'dashboard'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveSection(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize flex items-center gap-2
                        ${activeSection === tab 
                            ? 'bg-emerald-500/10 text-emerald-500 font-bold' 
                            : `${textMutedClass} hover:bg-emerald-500/5 hover:text-emerald-500`}`}
                    >
                        {tab === 'dashboard' && <Activity size={16} />}
                        {tab}
                    </button>
                ))}
                <a 
                    href="#contact" 
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${textMutedClass} hover:text-emerald-500`}
                >
                    Contact
                </a>
                </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
        
        {activeSection === 'portfolio' ? (
          <motion.div 
            key="portfolio"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-24"
          >
            
            {/* Hero Section */}
            <motion.section variants={itemVariants} className="relative py-10 sm:py-20">
              <div className="absolute top-0 right-0 -z-10 opacity-20 animate-pulse">
                 <Cloud size={300} className="text-emerald-900" />
              </div>
              <div className="max-w-3xl">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-mono mb-6 border border-emerald-500/20"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Actively Looking for DevOps Roles
                </motion.div>
                <h1 className={`text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-tight ${headingClass}`}>
                  Hi, I'm <span className="text-emerald-500">{PERSONAL_INFO.name}</span>.
                </h1>
                <h2 className={`text-2xl sm:text-4xl font-bold mb-6 ${subHeadingClass}`}>
                    {PERSONAL_INFO.title} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                    Transitioning to DevOps
                   </span>
                </h2>
                <p className={`text-lg mb-8 leading-relaxed max-w-2xl ${textMutedClass}`}>
                  I didn't just build a website; I built a <strong>Hybrid DevOps Architecture</strong>.
                  This portfolio demonstrates my ability to manage <strong>AWS Infrastructure</strong>, 
                  orchestrate <strong>Docker Containers</strong>, and build automated <strong>CI/CD Pipelines</strong>.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveSection('dashboard')}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20 hover:-translate-y-1"
                  >
                    See Real-Time Monitor <ChevronRight size={18}/>
                  </button>
                  <a 
                    href="/cv.pdf" 
                    download="Muhammad_Saqib_CV.pdf"
                    className={`px-6 py-3 border hover:bg-emerald-500/5 rounded-lg transition-all font-medium flex items-center gap-2 ${isDarkMode ? 'border-slate-700 text-slate-300 hover:border-slate-500' : 'border-slate-300 text-slate-700 hover:border-emerald-500'}`}
                  >
                    <Download size={18} /> Download Resume
                  </a>
                </div>
              </div>
            </motion.section>

             {/* Skills Section */}
            <motion.section variants={itemVariants} id="skills">
              <div className="flex items-center gap-2 mb-8">
                <Cpu className="text-emerald-500" />
                <h2 className={`text-3xl font-bold ${headingClass}`}>Technical Stack</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className={`${cardClass} p-6 rounded-2xl transition-all border-emerald-500/20`}>
                  <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${headingClass}`}>
                    <GitBranch className="text-emerald-500" size={20} /> DevOps & Cloud (Focus)
                  </h3>
                  <div className="space-y-4">
                    {SKILLS.devops.map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={subHeadingClass}>{skill.name}</span>
                          <span className={textMutedClass}>{skill.level}%</span>
                        </div>
                        <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-emerald-500 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                 <div className={`${cardClass} p-6 rounded-2xl transition-all`}>
                  <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${headingClass}`}>
                    <Globe className="text-blue-500" size={20} /> Software Development
                  </h3>
                  <div className="space-y-4">
                    {SKILLS.web.map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={subHeadingClass}>{skill.name}</span>
                          <span className={textMutedClass}>{skill.level}%</span>
                        </div>
                        <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-blue-500 rounded-full" 
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Tools Banner */}
              <div className={`mt-8 ${cardClass} p-6 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4`}>
                  <div className="flex items-center gap-2 font-bold text-lg">
                    <Wrench className="text-emerald-500" />
                    <span className={headingClass}>Tools & Platforms:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {TOOLS.map(tool => (
                      <span key={tool} className={`px-3 py-1 rounded-full text-sm font-mono ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
                        {tool}
                      </span>
                    ))}
                  </div>
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section variants={itemVariants}>
               <h2 className={`text-3xl font-bold mb-8 ${headingClass}`}>Projects & Architecture</h2>
               <div className="grid md:grid-cols-2 gap-6">
                 {PROJECTS.map((project, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ y: -5 }}
                     className={`group ${cardClass} hover:border-emerald-500/50 rounded-xl p-6 transition-all`}
                   >
                     <div className="flex justify-between items-start mb-4">
                       <div className={`p-2 rounded-lg ${project.type.includes('DevOps') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                         {project.type.includes('DevOps') ? <Server size={20}/> : <Code size={20}/>}
                       </div>
                       <span className={`text-xs px-2 py-1 rounded-full border ${isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                         {project.status}
                       </span>
                     </div>
                     <h3 className={`text-lg font-bold mb-2 group-hover:text-emerald-500 transition-colors ${headingClass}`}>{project.title}</h3>
                     <p className={`${textMutedClass} text-sm mb-4`}>{project.desc}</p>
                     <div className="flex flex-wrap gap-2">
                       {project.stack.map(tech => (
                         <span key={tech} className="text-xs font-mono text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded">
                           {tech}
                         </span>
                       ))}
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.section>

            {/* Challenges Section */}
            <motion.section variants={itemVariants}>
              <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${headingClass}`}>
                <ShieldCheck className="text-emerald-500" /> Real-World Challenges Solved
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {CHALLENGES.map((challenge, index) => (
                  <div key={index} className={`${cardClass} p-6 rounded-xl border shadow-sm transition-all hover:shadow-md`}>
                    <div className="mb-4">{challenge.icon}</div>
                    <h3 className={`font-bold text-lg mb-2 ${headingClass}`}>{challenge.title}</h3>
                    <div className="space-y-3">
                      <div>
                         <span className="text-xs font-bold text-rose-500 uppercase">The Problem:</span>
                         <p className={`${textMutedClass} text-sm leading-relaxed`}>{challenge.problem}</p>
                      </div>
                      <div>
                         <span className="text-xs font-bold text-emerald-500 uppercase">My Solution:</span>
                         <p className={`${textMutedClass} text-sm leading-relaxed`}>{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Education Section */}
             <motion.section variants={itemVariants}>
              <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${headingClass}`}>
                <GraduationCap className="text-emerald-500" /> Education
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {EDUCATION.map((edu, index) => (
                  <div key={index} className={`${cardClass} p-6 rounded-xl border shadow-sm transition-all`}>
                    <div className={`font-bold text-lg ${headingClass}`}>{edu.school}</div>
                    <div className={`text-emerald-500 text-sm font-mono mb-2`}>{edu.year}</div>
                    <div className={`font-semibold ${subHeadingClass} mb-2`}>{edu.degree}</div>
                    <p className={`${textMutedClass} text-sm`}>{edu.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section variants={itemVariants} id="contact" className={`py-12 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <h2 className={`text-3xl font-bold mb-8 text-center ${headingClass}`}>Let's Connect</h2>
              <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {/* Left Column: Info */}
                <div className="space-y-6">
                  <p className={`${textMutedClass} text-lg leading-relaxed`}>
                    I am actively searching for entry-level **DevOps** or **Software Engineering** positions. 
                    I have hands-on experience with **AWS**, **Jenkins**, and **Docker** in production-like environments.
                  </p>
                  <div className="space-y-4">
                    <div className={`flex items-center gap-4 ${subHeadingClass}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border text-emerald-500 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <Mail size={20} />
                      </div>
                      <span>{PERSONAL_INFO.email}</span>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <a href={PERSONAL_INFO.github} target="_blank" className={`p-3 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-emerald-500 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500 hover:text-emerald-600'}`}>
                          <Github size={20} />
                        </a>
                        <a href={PERSONAL_INFO.linkedin} target="_blank" className={`p-3 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-emerald-500 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500 hover:text-emerald-600'}`}>
                          <Linkedin size={20} />
                        </a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Form */}
                <form className={`space-y-4 ${cardClass} p-6 rounded-xl border shadow-xl`}>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${textMutedClass}`}>Recruiter / Company Name</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${inputClass}`} 
                        placeholder="HR Manager" 
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${textMutedClass}`}>Email</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${inputClass}`} 
                        placeholder="hr@company.com" 
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${textMutedClass}`}>Message</label>
                    <textarea 
                        rows={4} 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${inputClass}`} 
                        placeholder="We saw your AWS project and want to interview you..."
                    ></textarea>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleSend}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
                  >
                    Send Message <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.section>

          </motion.div>
        ) : (
          // DASHBOARD VIEW (REAL DATA)
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
             <div className="flex items-center justify-between mb-8">
               <div>
                 <h1 className={`text-2xl font-bold ${headingClass}`}>Infrastructure Status</h1>
                 <p className={`${textMutedClass} text-sm`}>Environment: Vercel Serverless Container</p>
               </div>
               <div className="flex items-center gap-2 text-xs font-mono bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  LIVE METRICS ({metrics.region})
               </div>
             </div>

             {/* Top Metrics */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <MetricCard label="Avg CPU Load" value={`${metrics.cpu}%`} unit="vCPU" trend={2.4} isDark={isDarkMode} />
                <MetricCard label="Memory Usage" value={`${metrics.mem}`} unit="MB" trend={-0.5} isDark={isDarkMode} />
                <MetricCard label="Container Uptime" value={metrics.uptime} unit="sec" trend={12} color="text-blue-500" isDark={isDarkMode} />
                <MetricCard label="Health Check" value="PASS" unit="200 OK" color="text-emerald-500" isDark={isDarkMode} />
             </div>

             {/* Pipeline Visualization */}
             <div className={`${cardClass} rounded-xl border p-6 mb-8 shadow-lg`}>
                <h3 className={`${subHeadingClass} text-sm font-semibold mb-6 flex items-center gap-2`}>
                  <GitBranch size={16} /> DevOps Pipeline (Jenkinsfile)
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                   <PipelineStep label="Git Push" status="success" duration="1s" isDark={isDarkMode} />
                   <div className={`h-0.5 w-6 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                   <PipelineStep label="Build Image" status="success" duration="120s" isDark={isDarkMode} />
                   <div className={`h-0.5 w-6 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                   <PipelineStep label="Stop Old" status="success" duration="2s" isDark={isDarkMode} />
                   <div className={`h-0.5 w-6 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                   <PipelineStep label="Run New" status="running" duration="Starting..." isDark={isDarkMode} />
                   <div className={`h-0.5 w-6 border-t border-dashed ${isDarkMode ? 'bg-slate-700 border-slate-500' : 'bg-slate-300 border-slate-400'}`}></div>
                   <PipelineStep label="Nginx Proxy" status="pending" isDark={isDarkMode} />
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                {/* Deployments */}
                <div className={`${cardClass} rounded-xl border p-6 shadow-lg`}>
                   <h3 className={`${subHeadingClass} text-sm font-semibold mb-4`}>Recent Infrastructure Actions</h3>
                   <div className="space-y-4">
                      <div className={`flex items-center justify-between text-sm border-b pb-2 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                           <span className={`${subHeadingClass} font-mono`}>Expanded EBS Volume (20GB)</span>
                        </div>
                        <span className={`${textMutedClass} text-xs`}>2h ago</span>
                      </div>
                      <div className={`flex items-center justify-between text-sm border-b pb-2 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                           <span className={`${subHeadingClass} font-mono`}>Configured Swap Space</span>
                        </div>
                        <span className={`${textMutedClass} text-xs`}>5h ago</span>
                      </div>
                      <div className={`flex items-center justify-between text-sm border-b pb-2 last:border-0 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                           <span className={`${subHeadingClass} font-mono`}>Updated Nginx Config</span>
                        </div>
                        <span className={`${textMutedClass} text-xs`}>1d ago</span>
                      </div>
                   </div>
                </div>

                {/* Terminal/Logs */}
                <div className="flex flex-col">
                   <h3 className={`${subHeadingClass} text-sm font-semibold mb-4`}>Real-time Server Logs</h3>
                   <LogViewer isDark={isDarkMode} />
                </div>
             </div>
          </motion.div>
        )}
        </AnimatePresence>
      </main>
    </div>
  );
}