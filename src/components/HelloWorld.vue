<script setup lang="ts">
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Card from "primevue/card";
import Chip from "primevue/chip";
import Divider from "primevue/divider";
import ScrollTop from "primevue/scrolltop";
import Toolbar from "primevue/toolbar";
import { useRouter } from "vue-router";
import owlImage from "/owl.jpg";

const router = useRouter();

const skills: Record<string, string[]> = {
  Languages: ["Julia", "Python", "JavaScript/TypeScript", "Bash"],
  "AI/ML": [
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "Computer Vision",
    "NLP",
  ],
  "Web & Cloud": ["HTML/CSS", "REST APIs", "MongoDB", "SQL", "Docker", "Git"],
  Tools: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "OpenCV"],
};

const currentYear = new Date().getFullYear();
const startYear = 2024;
const experienceYears = currentYear - startYear;

const githubUrl = "https://github.com/iamthebestcodeer";
const emailHref = "mailto:kitty-thud-economy@duck.com";
const xUrl = "https://x.com/nest_elf";
</script>

<template>
  <div class="page">
    <!-- Topbar -->
    <Toolbar class="topbar">
      <template #start>
        <div class="start">
          <Avatar :image="owlImage" shape="circle" size="large" />
          <div class="brand">
            <span class="title">AI & ML Researcher</span>
            <span class="subtitle">Machine Learning Testing & Research</span>
          </div>
        </div>
      </template>
      <template #end>
        <div class="actions">
          <Button label="Blog" icon="pi pi-book" @click="router.push('/blog')" text />
          <Button label="GitHub" icon="pi pi-github" as="a" :href="githubUrl" target="_blank" rel="noopener" text />
          <Button label="X" icon="pi pi-twitter" as="a" :href="xUrl" target="_blank" rel="noopener" text />
          <Button label="Email" icon="pi pi-envelope" as="a" :href="emailHref" text />
        </div>
      </template>
    </Toolbar>

    <div class="content">
      <!-- About -->
      <Card class="card">
        <template #title>
          <div class="card-title">
            <i class="pi pi-user"></i>
            <span>About Me</span>
          </div>
        </template>
        <template #content>
          <p>
            Hello! I'm Shuey, a dedicated Machine Learning Researcher<template v-if="experienceYears >= 4"> with over {{ experienceYears }}+ years of experience</template>. My passion lies in exploring the frontiers of AI and building innovative ML solutions to complex problems. I especially enjoy working with machine learning in Julia.
          </p>
          <p>
            My research spans computer vision, NLP, and deep learning. I'm fascinated by the theoretical
            foundations of ML and their practical applications in real-world scenarios.
          </p>
          <Divider />
          <div class="cta">
            <Button label="View Blog" icon="pi pi-book" @click="router.push('/blog')" />
            <Button label="GitHub" icon="pi pi-github" as="a" :href="githubUrl" target="_blank" rel="noopener" severity="secondary" outlined />
            <Button label="X" icon="pi pi-twitter" as="a" :href="xUrl" target="_blank" rel="noopener" severity="secondary" outlined />
          </div>
        </template>
      </Card>

      <!-- Skills -->
      <Card class="card">
        <template #title>
          <div class="card-title">
            <i class="pi pi-cog"></i>
            <span>Technical Skills</span>
          </div>
        </template>
        <template #content>
          <div class="skills">
            <div v-for="(items, category) in skills" :key="category" class="skill-col">
              <h3 class="category">{{ category }}</h3>
              <div class="chips">
                <Chip v-for="skill in items" :key="skill" :label="skill" />
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Contact -->
      <Card class="card">
        <template #title>
          <div class="card-title">
            <i class="pi pi-send"></i>
            <span>Get In Touch</span>
          </div>
        </template>
        <template #content>
          <div class="contact">
            <Button label="Email Me" icon="pi pi-envelope" as="a" :href="emailHref" />
            <Button label="GitHub" icon="pi pi-github" as="a" :href="githubUrl" target="_blank" rel="noopener" severity="secondary" outlined />
            <Button label="X" icon="pi pi-twitter" as="a" :href="xUrl" target="_blank" rel="noopener" severity="secondary" outlined />
          </div>
        </template>
      </Card>
    </div>

    <ScrollTop :threshold="400" icon="pi pi-arrow-up" />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.topbar {
  border-radius: 1rem;
}

.start {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.title {
  font-weight: 700;
}

.subtitle {
  font-size: 0.9rem;
  color: var(--p-text-muted-color);
}

.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.card {
  height: 100%;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.contact {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
</style>
