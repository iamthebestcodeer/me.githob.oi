<script setup lang="ts">
import { ref, onMounted } from 'vue';

const skills = {
  'Languages': ['Julia', 'Python', 'JavaScript/TypeScript', 'C/C#', 'Bash', 'Kotlin'],
  'AI/ML': ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP'],
  'Web & Cloud': ['HTML/CSS', 'REST APIs', 'MongoDB', 'SQL', 'Docker', 'Git'],
  'Tools': ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV']
};

const currentYear = new Date().getFullYear();
const experienceYears = currentYear - 2020; // Adjust starting year as needed

// Animation on scroll
const animatedElements = ref<HTMLElement[]>([]);

onMounted(() => {
  animatedElements.value = Array.from(document.querySelectorAll('.fade-in'));
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.value.forEach(el => observer.observe(el));
});
</script>

<template>
  <div class="glass-container">
    <!-- Header Section -->
    <header class="glass-panel fade-in">
      <div class="header-content">
        <img src="../owl.jpg" alt="Profile Picture" class="profile-pic" />
        <div class="header-text">
          <h1 class="name">AI & ML Researcher</h1>
          <h2 class="subtitle">Specializing in Machine Learning Testing & Research</h2>
          <div class="social-links">
            <a href="#" class="social-icon" title="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="#" class="social-icon" title="Email">
              <i class="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- About Section -->
      <section class="glass-panel fade-in">
  <h2>About Me</h2>
  <p>Hello! I'm Shuey, a dedicated Machine Learning Researcher with over {{ experienceYears }}+ years of experience in the field. My passion lies in exploring the frontiers of artificial intelligence and developing innovative ML solutions to complex problems. I especially enjoy working with machine learning in Julia.</p>
  <p>My research spans various domains including computer vision, natural language processing, and deep learning. I'm particularly fascinated by the theoretical foundations of machine learning and their practical applications in real-world scenarios.</p>
</section>

      <!-- Skills Section -->
      <section class="glass-panel fade-in">
        <h2>Technical Skills</h2>
        <div class="skills-grid">
          <div v-for="(items, category) in skills" :key="category" class="skill-category">
            <h3>{{ category }}</h3>
            <ul>
              <li v-for="skill in items" :key="skill">
                <span class="skill-name">{{ skill }}</span>
                <div class="skill-bar">
                  <div class="skill-level" :style="{ width: Math.floor(Math.random() * 40) + 60 + '%' }"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </main>

    <!-- Contact Section -->
    <footer class="glass-panel fade-in">
      <h2>Get In Touch</h2>
      <div class="contact-methods">
        <a href="mailto:your.email@example.com" class="contact-button">
          <i class="fas fa-envelope"></i> Email Me
        </a>
        <a href="#" class="contact-button">
          <i class="fab fa-github"></i> GitHub
        </a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

:root {
  --primary: #6366f1;
  --primary-light: #818cf8;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  --text: #1f2937;
  --text-light: #6b7280;
  --bg: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  --glass: rgba(255, 255, 255, 0.2);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: var(--text);
  background: var(--bg);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.glass-container {
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.glass-panel {
  background: var(--glass);
  border-radius: 1.5rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  padding: 2.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.glass-panel.visible {
  opacity: 1;
  transform: translateY(0);
}

.glass-panel:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.25);
}

/* Header Styles */
header {
  margin-top: 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.profile-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.profile-pic:hover {
  transform: scale(1.05);
}

.header-text {
  flex: 1;
  min-width: 300px;
}

.name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(45deg, var(--primary), var(--accent));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-light);
  font-weight: 400;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-3px);
}

/* Main Content */
.main-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

section {
  margin-bottom: 0;
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: var(--text);
  position: relative;
  display: inline-block;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 50px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 2px;
}

p {
  line-height: 1.8;
  color: var(--text);
  margin-bottom: 1.5rem;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skill-category h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--primary);
}

.skill-category ul {
  list-style: none;
}

.skill-category li {
  margin-bottom: 1rem;
}

.skill-name {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
}

.skill-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.skill-level {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 4px;
  transition: width 1s ease-in-out;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.3);
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-dot {
  position: absolute;
  left: -2rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary);
  border: 3px solid white;
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-content {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
}

.timeline-content h3 {
  margin-top: 0;
  color: var(--primary);
}

.timeline-company {
  color: var(--primary-light);
  font-weight: 500;
  margin: 0.25rem 0;
}

.timeline-date {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  display: block;
}

/* Footer */
footer {
  text-align: center;
  padding: 3rem 2rem;
  margin-top: auto;
}

.contact-methods {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  background: var(--primary-light);
}

.contact-button i {
  font-size: 1.1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .glass-panel {
    padding: 1.5rem;
  }
  
  .name {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
