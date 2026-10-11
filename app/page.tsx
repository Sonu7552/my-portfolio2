"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal, Server, Code, Activity, GitBranch,
  CheckCircle, AlertCircle, Clock, Cloud, Cpu, Globe,
  Github, Linkedin, Mail, MapPin, Phone, Send, ChevronRight,
  Download, Sun, Moon, GraduationCap, Wrench, Briefcase, BookOpen, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Content (matches the CV) ---

const PERSONAL_INFO = {
  name: "Muhammad Saqib Afzal",
  title: "Assistant Lecturer in Computer Science",
  subtitle: "Software Engineer",
  summary:
    "Assistant Lecturer in Computer Science at Lahore Leads University, currently pursuing an MPhil in Computer Science, with a BS in Software Engineering. I deliver well-structured lectures, support students of varying abilities, and bring a practical background in programming, web development and DevOps fundamentals to connect classroom theory with real-world applications.",
  email: "saqibchauhdary109@gmail.com",
  phone: "+92 318 4936510",
  location: "Lahore, Pakistan",
  github: "https://github.com/Sonu7552",
  linkedin: "https://www.linkedin.com/in/muhammad-saqib-afzal-90a799234/"
};

const EDUCATION = [
  {
    degree: "MPhil Computer Science",
    school: "Lahore Leads University",
    year: "In progress"
  },
  {
    degree: "BS Software Engineering",
    school: "Superior University, Lahore",
    year: "2020 - 2024"
  },
  {
    degree: "F.Sc Pre-Engineering / Intermediate in Computer Science",
    school: "Superior College, Lahore",
    year: "2018 - 2020"
  },
  {
    degree: "Matric",
    school: "Government School Ali Raza Abad, Lahore",
    year: "2016 - 2018"
  }
];

const EXPERIENCE = [
  {
    company: "Lahore Leads University, Lahore",
    role: "Assistant Lecturer",
    period: "Current",
    points: [
      "Deliver Computer Science instruction in a university environment, helping students build sound conceptual and practical understanding.",
      "Prepare and present organised lessons using appropriate digital and presentation tools."
    ],
    icon: "teach"
  },
  {
    company: "University of Lahore",
    role: "DevOps Intern",
    period: "Oct - Dec 2025",
    points: [
      "Working on CI/CD automation and deployment pipelines.",
      "Learning Docker, GitLab CI/CD and Linux server management.",
      "Assisting with cloud deployment, monitoring and configuration management."
    ],
    icon: "tech"
  }
];

const SKILL_GROUPS = [
  {
    title: "Programming",
    note: "Programming fundamentals (basic)",
    items: ["JavaScript", "Java", "Python", "C++"],
    icon: <Code className="text-emerald-500" size={20} />
  },
  {
    title: "Web Development",
    items: ["HTML5", "CSS3", "React.js (basic)", "Next.js (basic)", "Node.js (basic)"],
    icon: <Globe className="text-blue-500" size={20} />
  },
  {
    title: "DevOps Tools",
    items: ["Git", "GitHub", "GitLab CI/CD", "Docker", "Linux (basic)", "Vercel", "Firebase Hosting"],
    icon: <GitBranch className="text-emerald-500" size={20} />
  },
  {
    title: "Databases",
    items: ["MySQL", "MongoDB (basic)", "Firebase"],
    icon: <Database className="text-amber-500" size={20} />
  },
  {
    title: "Tools",
    items: ["VS Code", "Android Studio", "Figma", "Canva", "MS Office Suite"],
    icon: <Wrench className="text-rose-500" size={20} />
  },
  {
    title: "Teaching & Professional Skills",
    items: [
      "Computer Science instruction",
      "Lesson planning and delivery",
      "Student assessment and support",
      "Word processing and presentation software",
      "Clear communication",
      "Team collaboration"
    ],
    icon: <BookOpen className="text-cyan-500" size={20} />
  }
];

const PROJECTS = [
  {
    title: "Portfolio Website",
    type: "Web Development",
    desc: "Built with Next.js and Tailwind CSS, showcasing projects and skills, with a live infrastructure status dashboard.",
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    status: "Live"
  },
  {
    title: "Management System",
    type: "Full Stack",
    desc: "Web app for small businesses with CRUD functionality and real-time data.",
    stack: ["React", "Node.js", "Firebase"],
    status: "Completed"
  },
  {
    title: "CI/CD Practice Project",
    type: "DevOps",
    desc: "Sample pipeline using GitLab CI/CD for automated builds and deployments.",
    stack: ["GitLab CI/CD", "Docker"],
    status: "Practice"
  }
];

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

// --- Components ---

const PipelineStep = ({ label, status, duration, isDark }: { label: string, status: 'success' | 'running' | 'pending' | 'failed', duration?: string, isDark: boolean }) => {
  const getColors = () => {
    if (isDark) {
      switch (status) {
        case 'success': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50';
        case 'running': return 'bg-blue-500/10 text-blue-400 border-blue-500/50 animate-pulse';
        case 'failed': return 'bg-rose-500/10 text-rose-400 border-rose-500/50';
        default: return 'bg-slate-800 text-slate-500 border-slate-700';
      }
    } else {
      switch (status) {
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
      "[PIPELINE] Triggering pipeline: Portfolio-CI...",
      "[DOCKER] Building image: node:20-alpine...",
      "[BUILD] Next.js standalone output generated",
      "[DOCKER] Stopping old container...",
      "[DOCKER] Starting new container on Port 3000...",
      "[SUCCESS] Application live"
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
        <span className="text-slate-400 flex items-center gap-2"><Terminal size={12} /> pipeline-console-output</span>
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
  const chipClass = isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700';
  const contactIconClass = `w-10 h-10 rounded-full flex items-center justify-center border text-emerald-500 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${bgClass}`}>

      {/* Navbar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${navClass}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('portfolio')}>
              <Terminal className="text-emerald-500" size={24} />
              <span className="font-bold text-xl tracking-tight">Saqib<span className="text-emerald-500">.dev</span></span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label="Toggle light and dark mode"
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-mono mb-6 border border-emerald-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {PERSONAL_INFO.location}
                  </div>
                  <h1 className={`text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-tight ${headingClass}`}>
                    Hi, I&apos;m <span className="text-emerald-500">{PERSONAL_INFO.name}</span>.
                  </h1>
                  <h2 className={`text-2xl sm:text-4xl font-bold mb-6 ${subHeadingClass}`}>
                    {PERSONAL_INFO.title} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                      and {PERSONAL_INFO.subtitle}
                    </span>
                  </h2>
                  <p className={`text-lg mb-8 leading-relaxed max-w-2xl ${textMutedClass}`}>
                    {PERSONAL_INFO.summary}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#experience"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20 hover:-translate-y-1"
                    >
                      View experience <ChevronRight size={18} />
                    </a>
                    <a
                      href="/cv.pdf"
                      download="Muhammad_Saqib_Afzal_CV.pdf"
                      className={`px-6 py-3 border hover:bg-emerald-500/5 rounded-lg transition-all font-medium flex items-center gap-2 ${isDarkMode ? 'border-slate-700 text-slate-300 hover:border-slate-500' : 'border-slate-300 text-slate-700 hover:border-emerald-500'}`}
                    >
                      <Download size={18} /> Download resume
                    </a>
                  </div>
                </div>
              </motion.section>

              {/* Experience Section */}
              <motion.section variants={itemVariants} id="experience">
                <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${headingClass}`}>
                  <Briefcase className="text-emerald-500" /> Experience
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {EXPERIENCE.map((exp, index) => (
                    <div key={index} className={`${cardClass} p-6 rounded-xl border shadow-sm transition-all`}>
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className={`font-bold text-lg ${headingClass}`}>{exp.role}</h3>
                        <span className="text-emerald-500 text-sm font-mono whitespace-nowrap">{exp.period}</span>
                      </div>
                      <div className={`font-semibold mb-3 ${subHeadingClass}`}>{exp.company}</div>
                      <ul className={`list-disc pl-5 space-y-1 text-sm leading-relaxed ${textMutedClass}`}>
                        {exp.points.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Skills Section */}
              <motion.section variants={itemVariants} id="skills">
                <div className="flex items-center gap-2 mb-8">
                  <Cpu className="text-emerald-500" />
                  <h2 className={`text-3xl font-bold ${headingClass}`}>Skills</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SKILL_GROUPS.map(group => (
                    <div key={group.title} className={`${cardClass} p-6 rounded-2xl border transition-all`}>
                      <h3 className={`text-lg font-semibold mb-1 flex items-center gap-2 ${headingClass}`}>
                        {group.icon} {group.title}
                      </h3>
                      {group.note && <p className={`text-xs mb-3 ${textMutedClass}`}>{group.note}</p>}
                      <div className={`flex flex-wrap gap-2 ${group.note ? '' : 'mt-3'}`}>
                        {group.items.map(item => (
                          <span key={item} className={`px-3 py-1 rounded-full text-sm ${chipClass}`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Projects Section */}
              <motion.section variants={itemVariants}>
                <h2 className={`text-3xl font-bold mb-8 ${headingClass}`}>Key projects</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {PROJECTS.map((project, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className={`group ${cardClass} border hover:border-emerald-500/50 rounded-xl p-6 transition-all`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg ${project.type.includes('DevOps') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                          {project.type.includes('DevOps') ? <Server size={20} /> : <Code size={20} />}
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

              {/* Education Section */}
              <motion.section variants={itemVariants}>
                <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${headingClass}`}>
                  <GraduationCap className="text-emerald-500" /> Education
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {EDUCATION.map((edu, index) => (
                    <div key={index} className={`${cardClass} p-6 rounded-xl border shadow-sm transition-all`}>
                      <div className="text-emerald-500 text-sm font-mono mb-2">{edu.year}</div>
                      <div className={`font-bold text-lg mb-1 ${headingClass}`}>{edu.degree}</div>
                      <div className={`${textMutedClass} text-sm`}>{edu.school}</div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Contact Section */}
              <motion.section variants={itemVariants} id="contact" className={`py-12 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <h2 className={`text-3xl font-bold mb-8 text-center ${headingClass}`}>Let&apos;s connect</h2>
                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                  {/* Left Column: Info */}
                  <div className="space-y-6">
                    <p className={`${textMutedClass} text-lg leading-relaxed`}>
                      I am open to academic and software engineering opportunities. Send a message or reach me directly using the details below.
                    </p>
                    <div className="space-y-4">
                      <div className={`flex items-center gap-4 ${subHeadingClass}`}>
                        <div className={contactIconClass}><Mail size={20} /></div>
                        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
                      </div>
                      <div className={`flex items-center gap-4 ${subHeadingClass}`}>
                        <div className={contactIconClass}><Phone size={20} /></div>
                        <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`}>{PERSONAL_INFO.phone}</a>
                      </div>
                      <div className={`flex items-center gap-4 ${subHeadingClass}`}>
                        <div className={contactIconClass}><MapPin size={20} /></div>
                        <span>{PERSONAL_INFO.location}</span>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={`p-3 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-emerald-500 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500 hover:text-emerald-600'}`}>
                          <Github size={20} />
                        </a>
                        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`p-3 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-emerald-500 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500 hover:text-emerald-600'}`}>
                          <Linkedin size={20} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Form */}
                  <form className={`space-y-4 ${cardClass} p-6 rounded-xl border shadow-xl`}>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${textMutedClass}`}>Your name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${inputClass}`}
                        placeholder="Your name"
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
                        placeholder="you@example.com"
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
                        placeholder="How can I help?"
                      ></textarea>
                    </div>
                    <button
                      type="button"
                      onClick={handleSend}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
                    >
                      Send message <Send size={18} />
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
                  <h1 className={`text-2xl font-bold ${headingClass}`}>Infrastructure status</h1>
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
                  <GitBranch size={16} /> CI/CD pipeline (demo)
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <PipelineStep label="Git Push" status="success" duration="1s" isDark={isDarkMode} />
                  <div className={`h-0.5 w-6 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                  <PipelineStep label="Build Image" status="success" duration="120s" isDark={isDarkMode} />
                  <div className={`h-0.5 w-6 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                  <PipelineStep label="Stop Old" status="success" duration="2s" isDark={isDarkMode} />
                  <div className={`h-0.5 w-6 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                  <PipelineStep label="Run New" status="running" duration="Starting..." isDark={isDarkMode} />
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className={`${subHeadingClass} text-sm font-semibold mb-4`}>Pipeline console</h3>
                <LogViewer isDark={isDarkMode} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}