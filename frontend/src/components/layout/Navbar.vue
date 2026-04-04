<template>
  <nav class="dashboard-nav">
    <div class="nav-container">
      <div class="nav-brand">
        <div class="logo-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h1 class="nav-title">Beready</h1>
      </div>

      <div class="nav-menu">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          active-class="active"
        >
          <component :is="item.icon" class="h-5 w-5" />
          {{ item.name }}
        </router-link>
      </div>

      <div class="nav-user">
        <div class="user-info">
          <div class="user-avatar">
            {{ userInitial }}
          </div>
          <div class="user-details">
            <span class="user-name">{{ userName }}</span>
            <span class="user-email">{{ userEmail }}</span>
          </div>
        </div>
        <Button variant="danger" @click="$emit('logout')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sair
        </Button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '../common/Button.vue'

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
})

defineEmits(['logout'])

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'HomeIcon' },
  { name: 'Perfil', path: '/profile', icon: 'UserIcon' },
  { name: 'Flashcards', path: '/flashcards', icon: 'DocumentIcon' },
  { name: 'Quizes', path: '/quizes', icon: 'ClipboardIcon' },
  { name: 'Prompts IA', path: '/prompts', icon: 'ChatIcon' },
]

const userName = computed(() => props.user?.nome || props.user?.name || 'Usuário')
const userEmail = computed(() => props.user?.email || '')
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())
</script>

<style scoped>
.dashboard-nav {
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon svg {
  color: white;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  gap: 8px;
  background: #f3f4f6;
  padding: 4px;
  border-radius: 12px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 8px;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: white;
  color: var(--primary);
}

.nav-link.active {
  background: white;
  color: var(--primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.user-email {
  font-size: 0.75rem;
  color: #6b7280;
}

@media (max-width: 1024px) {
  .nav-menu {
    display: none;
  }

  .user-details {
    display: none;
  }
}

@media (max-width: 640px) {
  .nav-brand .nav-title {
    display: none;
  }
}
</style>
