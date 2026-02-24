export const staticContent = {
  hero: {
    name: 'Dave E. Matchica',
    role: 'IT Student & Aspiring Web Developer',
    tagline:
      'Passionate about crafting dynamic, responsive web experiences that drive real results — from boosting engagement to improving conversion rates.',
    stat1_num: '3+',
    stat1_label: 'projects built',
    stat2_num: '10+',
    stat2_label: 'technologies',
    stat3_num: '3rd',
    stat3_label: 'year IT student',
    avatar_url: '',   // populated after first upload via admin panel
  },
  about: {
    bio1: "I'm a passionate web developer currently pursuing my BS in Information Technology at Caraga State University. I partner with businesses to create dynamic, responsive websites that drive real results.",
    bio2: 'I specialize in clean, maintainable code and best practices to build fast, accessible, and scalable solutions — allowing business owners to focus on what they do best while I handle the technical complexity.',
    bio3: 'From interactive front-end interfaces to robust back-end APIs, I enjoy building complete solutions that look great and perform even better.',
    strengths:
      'Self-directed learner who thrives both independently and in collaborative team environments. Strong problem-solver with effective communication skills.',
    location: 'Ipil, Gigaquit, SDN, Philippines',
    email: 'devvkun@gmail.com',
    phone: '+63 938 604 5189',
    status: 'Open to work',
  },
  education: {
    school: 'Caraga State University — Main Campus',
    degree: 'Bachelor of Science in Information Technology',
    period: '2021 — PRESENT (Expected 2027)',
    description:
      'Currently pursuing a comprehensive IT degree covering full-stack web development, database management, software engineering principles, and systems analysis. Actively building real-world projects alongside academic learning.',
  },
  contact: {
    email: 'devvkun@gmail.com',
    phone: '+63 938 604 5189',
    github: 'https://github.com/davematchica',
    linkedin: 'https://linkedin.com/in/dave-matchica-718859290',
    instagram: 'Dave Matchica',
  },
}

export const staticProjects = [
  {
    id: '1',
    title: 'Dynamic Portfolio Website with CMS',
    description:
      'A fully dynamic portfolio website backed by a content management system, enabling easy updates without code changes. Features a clean UI with smooth transitions and real-time content rendering.',
    tech_stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MySQL'],
    demo_url: 'https://judith-portfolio-six.vercel.app/',
    github_url: '',
    emoji: '💼',
    accent_color: '#6366f1',
    sort_order: 1,
  },
  {
    id: '2',
    title: 'Lost Artifact — Mini 3D Game',
    description:
      'An immersive browser-based 3D mini-game built with Three.js. Players navigate a 3D environment to find hidden artifacts, showcasing advanced JavaScript and WebGL capabilities.',
    tech_stack: ['Three.js', 'Node.js', 'JavaScript', 'WebGL'],
    demo_url: 'https://davematchica.github.io/lost_artifact/',
    github_url: 'https://github.com/davematchica',
    emoji: '🎮',
    accent_color: '#22d3ee',
    sort_order: 2,
  },
  {
    id: '3',
    title: 'Smart Gadget Hub',
    description:
      'A full-stack e-commerce platform for tech gadgets built with a modern React frontend and RESTful API backend. Features product listings, filtering, and a clean shopping experience.',
    tech_stack: ['ReactJS', 'TailwindCSS', 'Node.js', 'Express', 'REST API', 'PostgreSQL'],
    demo_url: 'https://smart-gadget-hub-frontend.vercel.app/',
    github_url: 'https://github.com/davematchica',
    emoji: '🛒',
    accent_color: '#a78bfa',
    sort_order: 3,
  },
]

export const staticSkills = [
  { id: '1', category: 'frontend', name: 'HTML5', color_class: 'tag-indigo' },
  { id: '2', category: 'frontend', name: 'CSS3', color_class: 'tag-indigo' },
  { id: '3', category: 'frontend', name: 'JavaScript ES6+', color_class: 'tag-indigo' },
  { id: '4', category: 'frontend', name: 'React', color_class: 'tag-indigo' },
  { id: '5', category: 'frontend', name: 'Vue.js', color_class: 'tag-indigo' },
  { id: '6', category: 'frontend', name: 'Bootstrap', color_class: 'tag-indigo' },
  { id: '7', category: 'frontend', name: 'Tailwind CSS', color_class: 'tag-indigo' },
  { id: '8', category: 'backend', name: 'Node.js', color_class: 'tag-cyan' },
  { id: '9', category: 'backend', name: 'Express.js', color_class: 'tag-cyan' },
  { id: '10', category: 'backend', name: 'Python', color_class: 'tag-cyan' },
  { id: '11', category: 'backend', name: 'RESTful API', color_class: 'tag-cyan' },
  { id: '12', category: 'database', name: 'MySQL', color_class: 'tag-violet' },
  { id: '13', category: 'database', name: 'PostgreSQL', color_class: 'tag-violet' },
  { id: '14', category: 'tools', name: 'Git', color_class: 'tag-green' },
  { id: '15', category: 'tools', name: 'GitHub', color_class: 'tag-green' },
  { id: '16', category: 'tools', name: 'Figma', color_class: 'tag-green' },
  { id: '17', category: 'tools', name: 'Netlify', color_class: 'tag-green' },
  { id: '18', category: 'tools', name: 'Vercel', color_class: 'tag-green' },
  { id: '19', category: 'tools', name: 'Heroku', color_class: 'tag-green' },
  { id: '20', category: 'soft', name: 'Communication', color_class: 'tag-indigo' },
  { id: '21', category: 'soft', name: 'Team Collaboration', color_class: 'tag-indigo' },
  { id: '22', category: 'soft', name: 'Self-directed', color_class: 'tag-indigo' },
  { id: '23', category: 'soft', name: 'Problem-solving', color_class: 'tag-indigo' },
]