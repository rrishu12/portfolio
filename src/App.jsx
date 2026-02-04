import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Users, Award, ChevronDown, Menu, X, Send, Heart, Coffee, Plane, Camera } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Github Projects",
      description: "Projects across web development and data analytics.",
      tags: ["React", "Angular", "Tailwind CSS", "HTML5", "CSS", "SQL", "Python"],
      image: "/portfolio/github.jpg",
      link: "https://github.com/rrishu12?tab=repositories"
    },
    {
      title: "Design System & UI Kit",
      description: "Comprehensive design systems created in Figma with reusable components",
      tags: ["Figma", "Design System", "UI/UX"],
      image: "/portfolio/ui.jpg",
      link: "https://www.figma.com/design/Hoe20vphh6QG5G5eAW0Ahm/Project-Designs?node-id=0-1&p=f&t=5igbWK8JG07azA1X-0"
    },
  ];

  const testimonials = [
    {
      name: "Jaya Tulsaini",
      role: "Frontend Lead, FINARKEIN",
      content: "Rishu consistently delivered high-quality work with a strong understanding of fintech requirements and deadlines. She was reliable, proactive, and a great collaborator within the team. What impressed me most was her problem-solving approach, she didn't just implement designs, she thought critically about user experience and technical feasibility. Her ability to work independently while also being an excellent team player made her a cornerstone of our frontend development efforts. She would be an asset to any team.",
      avatar: "JT"
    },
    {
      name: "Athanasia Polyzogopoulou",
      role: "Student Assistant, LEGO",
      content: "I really enjoyed working with Rishu in web communication design projects and getting to know her better during our data science course. She has a rare mix of a solid computer science background and a deeply user-centered approach to UX design, which makes collaborating with her both inspiring and effective. What I personally admire most about Rishu is how naturally she thinks from the user’s perspective. She asks the right questions, pays close attention to details that truly matter for usability and creates experiences that are clear and intuitive. Beyond her skills, she is a pleasure to work with. She's thoughtful, curious and brings a calm, intelligent presence to teamwork. I would wholeheartedly recommend her to any team looking for a UX designer who combines technical understanding, empathy for users and strong communication skills.",
      avatar: "AP"
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Angular", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"] },
    { category: "Design", items: ["Figma", "Canva", "UI/UX Design", "Responsive Design", "Design Systems"] },
    { category: "Tools", items: ["Git", "GitHub", "Notion", "VS Code"] },
    { category: "SoMe", items: ["Video Editing (CapCut, iMovie)", "Social Media Analytics", "Digital Creation"]}
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setFormStatus({ type: 'loading', message: 'Sending...' });

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_key: '3f8e54ac-4ed4-4306-8742-f94fe3547348', // Get free key from web3forms.com
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      })
    });

    if (response.ok) {
      setFormStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      throw new Error('Failed to send');
    }
  } catch (error) {
    setFormStatus({ type: 'error', message: 'Failed to send message. Please email me directly at rishubhatt2412@gmail.com' });
  }

  setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Rishu
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Skills', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Projects', 'Skills', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 hover:bg-purple-900/50 rounded-md transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Hi, I'm <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Rishu</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-4">
             Frontend Developer & Communication Designer

            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Master's student in Web Communication Design at SDU Kolding, Denmark. 
I build responsive web applications, design intuitive user interfaces, 
and create engaging digital experiences.    </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-purple-400 rounded-full font-semibold hover:bg-purple-400/20 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/rrishu12?tab=repositories" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors transform hover:scale-110">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/rishu-bhatt" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors transform hover:scale-110">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-purple-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">About Me</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A little more about who I am and what drives me
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Main Bio */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm border border-slate-700">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Who I Am</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
  <p>
    Hey there! I'm Rishu, a creative technologist with a passion for building beautiful, functional digital experiences. Originally from India, I'm currently pursuing my Master's in Web Communication Design in Denmark, where I get to blend my love for coding with visual storytelling.
  </p>
  <p>
    I believe that great design isn't just about aesthetics, it's about creating meaningful connections between people and technology. Whether I'm writing clean code, designing intuitive interfaces, analyzing data to uncover insights, or creating content for social media, my goal is always to make technology more human and accessible.
  </p>
  <p>
    My journey in tech started with curiosity and has evolved into a full-fledged career where I get to wear multiple hats: developer, designer, analyst, content creator, and digital storyteller. 
  </p>
</div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm border border-slate-700">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">What I'm Up To</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Code className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Master's Student</h4>
                      <p className="text-gray-400 text-sm">Studying Web Communication Design at SDU Kolding in Denmark, diving deep into UX, frontend development, and digital communication strategies.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Content Creator</h4>
                      <p className="text-gray-400 text-sm">Running a YouTube channel documenting my expat life in Denmark, sharing insights about culture, student life, and navigating life abroad.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Interests & Fun Facts */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm border border-slate-700">
  <h3 className="text-2xl font-bold mb-6 text-purple-400">What I Love</h3>
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Coffee className="text-purple-400" size={20} />
      <p className="text-gray-300">Can't choose between chai and coffee—so I drink both! ☕</p>
    </div>
    <div className="flex items-center gap-3">
      <Camera className="text-purple-400" size={20} />
      <p className="text-gray-300">Movie nights and binge-watching series (always open to recommendations!)</p>
    </div>
    <div className="flex items-center gap-3">
      <Plane className="text-purple-400" size={20} />
      <p className="text-gray-300">Exploring new places and cultures</p>
    </div>
    <div className="flex items-center gap-3">
      <Heart className="text-purple-400" size={20} />
      <p className="text-gray-300">Embracing hygge—cozy evenings, candles, and just relaxing</p>
    </div>
  </div>
</div>

              <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm border border-slate-700">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Beyond the Code</h3>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>When I'm not coding, you'll find me filming content for my YouTube channel or exploring Denmark's cozy cafés</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Always up for collaborating on creative projects that merge technology with social impact</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Currently trying to master Danish (it's harder than React, trust me!)</span>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 backdrop-blur-sm border border-purple-500/30">
                <p className="text-center text-gray-300 italic">
                  "Good design is finding the perfect balance between functionality and feeling at home."
                </p>
                <p className="text-center text-purple-400 text-sm mt-2">My daily mantra ✨</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A selection of work showcasing web development and design expertise
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 transform hover:-translate-y-2"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300 border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target='_blank'
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View Website <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Skills & Expertise</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Technical skills and tools I use to bring ideas to life
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 hover:border-purple-500 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-400">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, i) => (
                    <li key={i} className="text-gray-300 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">What People Say</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Testimonials from clients and collaborators
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 hover:border-purple-500 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Let's Work Together</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind? Fill out the form below or email me directly at <a href="mailto:rishubhatt2412@gmail.com" className="text-purple-400 hover:text-purple-300">rishubhatt2412@gmail.com</a>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm border border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Project inquiry"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className="w-full px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus.type === 'loading' ? 'Sending...' : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
                {formStatus.message && (
                  <div className={`p-4 rounded-lg ${
                    formStatus.type === 'success' ? 'bg-green-500/20 text-green-300' :
                    formStatus.type === 'error' ? 'bg-red-500/20 text-red-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h3 className="text-xl font-bold mb-4 text-purple-400">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="text-purple-400 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:rishubhatt2412@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                        rishubhatt2412@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Linkedin className="text-purple-400 mt-1" size={20} />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <a href="https://www.linkedin.com/in/rishu-bhatt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                        /in/rishu-bhatt
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Github className="text-purple-400 mt-1" size={20} />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <a href="https://github.com/rrishu12?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                        @rishu
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h3 className="text-xl font-bold mb-4 text-purple-400">Location</h3>
                <p className="text-gray-400">Currently based in Denmark 🇩🇰</p>
                <p className="text-gray-400 mt-2">Available for remote work and collaborations worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2026 Rishu Bhatt. Built with React & Tailwind CSS.</p>
          <p className="mt-2 text-sm">Hosted on Github</p>
        </div>
      </footer>
    </div>
  );
}
