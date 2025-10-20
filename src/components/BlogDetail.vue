<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { BlogPost } from '../types/blog';
import blogsData from '../data/blogs.json';

const router = useRouter();
const route = useRoute();
const blog = ref<BlogPost | null>(null);

onMounted(() => {
  const slug = route.params.slug as string;
  const foundBlog = (blogsData as BlogPost[]).find((b) => b.slug === slug);

  if (foundBlog) {
    blog.value = foundBlog;
  } else {
    router.push('/blog');
  }
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const goBack = () => {
  router.push('/blog');
};

const formattedContent = computed(() => {
  if (!blog.value) return '';
  return blog.value.content
    .split('\n')
    .map((p) => `<p>${p}</p>`)
    .join('');
});
</script>

<template>
  <div v-if="blog" class="glass-container">
    <header class="glass-panel">
      <button @click="goBack" class="back-button">
        <i class="fas fa-arrow-left"></i> Back to Blog
      </button>
    </header>

    <article class="glass-panel blog-article">
      <div v-if="blog.coverImage" class="article-cover">
        <img :src="blog.coverImage" :alt="blog.title" />
      </div>

      <div class="article-header">
        <h1 class="article-title">{{ blog.title }}</h1>
        <div class="article-meta">
          <span class="meta-item">
            <i class="fas fa-calendar"></i> {{ formatDate(blog.date) }}
          </span>
          <span class="meta-item"> <i class="fas fa-user"></i> {{ blog.author }} </span>
        </div>
        <div class="article-tags">
          <span v-for="tag in blog.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <div class="article-content" v-html="formattedContent"></div>
    </article>
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
}

.back-button {
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

.blog-article {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.article-cover {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 2rem;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-header {
  margin-bottom: 3rem;
  text-align: center;
}

.article-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  gap: 2rem;
  justify-content: center;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.article-tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tag {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.9rem;
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #1f2937;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(h2) {
  font-size: 1.8rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.article-content :deep(h3) {
  font-size: 1.4rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #374151;
}

.article-content :deep(code) {
  background: rgba(99, 102, 241, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.article-content :deep(pre) {
  background: rgba(31, 41, 55, 0.9);
  color: #f3f4f6;
  padding: 1.5rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 2rem 0;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #6366f1;
  padding-left: 1.5rem;
  margin: 2rem 0;
  color: #4b5563;
  font-style: italic;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 2rem;
  }

  .article-cover {
    height: 250px;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .article-content {
    font-size: 1rem;
  }
}
</style>
