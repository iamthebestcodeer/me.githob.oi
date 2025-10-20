<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import Chip from "primevue/chip";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import blogsData from "../data/blogs.json" with { type: "json" };
import type { BlogPost } from "../types/blog";

const router = useRouter();
const route = useRoute();
const blog = ref<BlogPost | null>(null);

onMounted(() => {
  const slug = route.params.slug as string;
  const foundBlog = (blogsData as BlogPost[]).find((b) => b.slug === slug);

  if (foundBlog) {
    blog.value = foundBlog;
  } else {
    router.push("/blog");
  }
});

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const goBack = () => {
  router.push("/blog");
};

const formattedContent = computed(() => {
  if (!blog.value) {
    return "";
  }
  return blog.value.content
    .split("\n")
    .map((p) => `<p>${p}</p>`)
    .join("");
});
</script>

<template>
  <div v-if="blog" class="blog-detail-container">
    <div class="header-section">
      <Button icon="pi pi-arrow-left" label="Back to Blog" @click="goBack" text />
    </div>

    <Card class="blog-article">
      <template #header>
        <img v-if="blog.coverImage" :src="blog.coverImage" :alt="blog.title" class="article-cover" />
      </template>
      <template #title>
        <h1 class="article-title">{{ blog.title }}</h1>
      </template>
      <template #subtitle>
        <div class="article-meta">
          <span class="meta-item">
            <i class="pi pi-calendar"></i> {{ formatDate(blog.date) }}
          </span>
          <span class="meta-item">
            <i class="pi pi-user"></i> {{ blog.author }}
          </span>
        </div>
        <div class="article-tags">
          <Chip v-for="tag in blog.tags" :key="tag" :label="tag" />
        </div>
      </template>
      <template #content>
        <div class="article-content" v-html="formattedContent"></div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.blog-detail-container {
  min-height: 100vh;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 2rem;
}

.blog-article {
  width: 100%;
}

.article-cover {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.article-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--p-text-color);
  line-height: 1.2;
  text-align: center;
}

.article-meta {
  display: flex;
  gap: 2rem;
  justify-content: center;
  color: var(--p-text-muted-color);
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
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
  margin-top: 1rem;
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--p-text-color);
  margin-top: 2rem;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(h2) {
  font-size: 1.8rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--p-text-color);
  font-weight: 600;
}

.article-content :deep(h3) {
  font-size: 1.4rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: var(--p-text-color);
  font-weight: 600;
}

.article-content :deep(code) {
  background: var(--p-surface-100);
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--p-primary-color);
}

.article-content :deep(pre) {
  background: var(--p-surface-900);
  color: var(--p-surface-0);
  padding: 1.5rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 2rem 0;
}

.article-content :deep(blockquote) {
  border-left: 4px solid var(--p-primary-color);
  padding-left: 1.5rem;
  margin: 2rem 0;
  color: var(--p-text-secondary-color);
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
