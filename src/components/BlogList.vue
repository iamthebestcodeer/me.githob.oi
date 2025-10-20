<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import Chip from "primevue/chip";
import PrimeDataView from "primevue/dataview";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import blogsData from "../data/blogs.json" with { type: "json" };
import type { BlogPost } from "../types/blog";

const router = useRouter();
const blogs = ref<BlogPost[]>([]);
const selectedTag = ref<string | null>(null);
const allTags = ref<string[]>([]);

onMounted(() => {
  blogs.value = blogsData as BlogPost[];

  // Extract all unique tags
  const tagsSet = new Set<string>();
  for (const blog of blogs.value) {
    for (const tag of blog.tags) {
      tagsSet.add(tag);
    }
  }
  allTags.value = Array.from(tagsSet);
});

const filteredBlogs = computed(() => {
  if (!selectedTag.value) {
    return blogs.value;
  }
  return blogs.value.filter((blog) =>
    blog.tags.includes(selectedTag.value as string)
  );
});

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const goToBlog = (slug: string) => {
  router.push(`/blog/${slug}`);
};

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="blog-container">
    <div class="header-section">
      <div class="header-content">
        <Button icon="pi pi-arrow-left" label="Home" @click="goHome" text />
        <div class="header-title">
          <h1>Blog</h1>
          <p class="subtitle">Thoughts on AI, ML, and Research</p>
        </div>
      </div>
    </div>

    <div class="filters-section" v-if="allTags.length > 0">
      <div class="filter-chips">
        <Chip :label="'All'" @click="selectedTag = null" :class="{ 'active-chip': !selectedTag }" />
        <Chip
          v-for="tag in allTags"
          :key="tag"
          :label="tag"
          @click="selectedTag = tag"
          :class="{ 'active-chip': selectedTag === tag }"
        />
      </div>
    </div>

    <div class="content-section">
      <div v-if="filteredBlogs.length === 0" class="empty-state">
        <i class="pi pi-inbox" style="font-size: 3rem; color: var(--p-text-muted-color)"></i>
        <p>No blog posts yet. Check back soon!</p>
      </div>

      <PrimeDataView v-else :value="filteredBlogs" :layout="'grid'">
        <template #grid="slotProps">
          <div class="grid-layout">
            <Card
              v-for="blog in slotProps.items"
              :key="blog.id"
              class="blog-card"
              @click="goToBlog(blog.slug)"
            >
              <template #header>
                <img v-if="blog.coverImage" :src="blog.coverImage" :alt="blog.title" class="card-image" />
              </template>
              <template #title>
                <h3 class="card-title">{{ blog.title }}</h3>
              </template>
              <template #subtitle>
                <div class="card-meta">
                  <span><i class="pi pi-calendar"></i> {{ formatDate(blog.date) }}</span>
                  <span><i class="pi pi-user"></i> {{ blog.author }}</span>
                </div>
              </template>
              <template #content>
                <p class="card-excerpt">{{ blog.excerpt }}</p>
                <div class="card-tags">
                  <Chip v-for="tag in blog.tags" :key="tag" :label="tag" />
                </div>
              </template>
            </Card>
          </div>
        </template>
      </PrimeDataView>
    </div>
  </div>
</template>

<style scoped>
.blog-container {
  min-height: 100vh;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 2rem;
}

.header-content {
  text-align: center;
  position: relative;
}

.header-content :deep(.p-button) {
  position: absolute;
  left: 0;
  top: 0;
}

.header-title {
  padding: 0 4rem;
}

.header-title h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--p-primary-color), var(--p-primary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--p-text-muted-color);
  font-size: 1.2rem;
}

.filters-section {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.filter-chips {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-chips :deep(.p-chip) {
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--p-surface-100);
}

.filter-chips :deep(.p-chip:hover),
.filter-chips :deep(.active-chip) {
  background: var(--p-primary-color);
  color: var(--p-primary-contrast-color);
}

.content-section {
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-state p {
  color: var(--p-text-muted-color);
  font-size: 1.2rem;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.blog-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--p-card-shadow);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .card-image {
  transform: scale(1.05);
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--p-text-color);
}

.card-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: var(--p-text-muted-color);
  margin-top: 0.5rem;
}

.card-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-excerpt {
  color: var(--p-text-secondary-color);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.card-tags :deep(.p-chip) {
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }

  .header-title h1 {
    font-size: 2rem;
  }

  .header-content :deep(.p-button) {
    position: static;
    margin-bottom: 1rem;
  }

  .header-title {
    padding: 0;
  }
}
</style>
