<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { BlogPost } from '../types/blog';
import blogsData from '../data/blogs.json';

const router = useRouter();
const blogs = ref<BlogPost[]>([]);
const selectedTag = ref<string | null>(null);
const allTags = ref<string[]>([]);

onMounted(() => {
  blogs.value = blogsData as BlogPost[];

  // Extract all unique tags
  const tagsSet = new Set<string>();
  blogs.value.forEach((blog) => {
    blog.tags.forEach((tag) => tagsSet.add(tag));
  });
  allTags.value = Array.from(tagsSet);
});

const filteredBlogs = () => {
  if (!selectedTag.value) return blogs.value;
  return blogs.value.filter((blog) => blog.tags.includes(selectedTag.value!));
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const goToBlog = (slug: string) => {
  router.push(`/blog/${slug}`);
};

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="glass-container">
    <header class="glass-panel">
      <div class="blog-header">
        <button @click="goHome" class="back-button"><i class="fas fa-arrow-left"></i> Home</button>
        <h1>Blog</h1>
        <p class="blog-subtitle">Thoughts on AI, ML, and Research</p>
      </div>
    </header>

    <div class="blog-filters glass-panel" v-if="allTags.length > 0">
      <button @click="selectedTag = null" :class="['tag-filter', { active: !selectedTag }]">
        All
      </button>
      <button
        v-for="tag in allTags"
        :key="tag"
        @click="selectedTag = tag"
        :class="['tag-filter', { active: selectedTag === tag }]"
      >
        {{ tag }}
      </button>
    </div>

    <main class="blog-grid">
      <div v-if="filteredBlogs().length === 0" class="glass-panel no-blogs">
        <p>No blog posts yet. Check back soon!</p>
      </div>

      <article
        v-for="blog in filteredBlogs()"
        :key="blog.id"
        class="glass-panel blog-card"
        @click="goToBlog(blog.slug)"
      >
        <div v-if="blog.coverImage" class="blog-cover">
          <img :src="blog.coverImage" :alt="blog.title" />
        </div>
        <div class="blog-content">
          <div class="blog-meta">
            <span class="blog-date">{{ formatDate(blog.date) }}</span>
            <span class="blog-author">by {{ blog.author }}</span>
          </div>
          <h2 class="blog-title">{{ blog.title }}</h2>
          <p class="blog-excerpt">{{ blog.excerpt }}</p>
          <div class="blog-tags">
            <span v-for="tag in blog.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<style scoped>
.glass-container {
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  padding: 2.5rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.blog-header {
  text-align: center;
  position: relative;
}

.back-button {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(99, 102, 241, 0.8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.back-button:hover {
  background: rgba(99, 102, 241, 1);
}

.blog-header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.blog-subtitle {
  color: #6b7280;
  font-size: 1.2rem;
}

.blog-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1.5rem;
}

.tag-filter {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.tag-filter:hover,
.tag-filter.active {
  background: rgba(99, 102, 241, 0.8);
  color: white;
  border-color: #6366f1;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.blog-card {
  cursor: pointer;
  padding: 0;
  overflow: hidden;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.25);
}

.blog-cover {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-cover img {
  transform: scale(1.05);
}

.blog-content {
  padding: 2rem;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.blog-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.blog-excerpt {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.blog-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
}

.no-blogs {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }

  .blog-header h1 {
    font-size: 2rem;
  }

  .back-button {
    position: static;
    margin-bottom: 1rem;
  }
}
</style>
