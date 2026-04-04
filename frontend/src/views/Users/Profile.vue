<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-header-background"></div>
      <div class="profile-content">
        <div class="profile-avatar">
          <div class="avatar-placeholder">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <div class="profile-info">
          <h1 class="profile-name">{{ user?.nome || 'Carregando...' }}</h1>
          <p class="profile-email">{{ user?.email || '' }}</p>
        </div>
        <div class="profile-actions">
          <Button variant="outline" @click="$router.push('/profile/edit')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Editar Perfil
          </Button>
          <Button variant="secondary" @click="$router.push('/dashboard')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar
          </Button>
        </div>
      </div>
    </div>

    <div class="profile-body">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card class="profile-card">
          <template #header>
            <h3 class="card-title">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Informações Pessoais
            </h3>
          </template>
          <div class="profile-info-group">
            <label class="profile-info-label">Nome Completo</label>
            <p class="profile-info-value">{{ user?.nome || '-' }}</p>
          </div>
          <div class="profile-info-group">
            <label class="profile-info-label">E-mail</label>
            <p class="profile-info-value">{{ user?.email || '-' }}</p>
          </div>
          <div class="profile-info-group">
            <label class="profile-info-label">Telefone</label>
            <p class="profile-info-value">{{ user?.telefone || 'Não informado' }}</p>
          </div>
        </Card>

        <Card class="profile-card">
          <template #header>
            <h3 class="card-title">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Preferências de Aprendizado
            </h3>
          </template>
          <div class="profile-info-group">
            <label class="profile-info-label">Nível de Inglês</label>
            <p class="profile-info-value">{{ getNivelIngles(user?.nivel_ingles) }}</p>
          </div>
          <div class="profile-info-group">
            <label class="profile-info-label">Idioma Preferido</label>
            <p class="profile-info-value">{{ getIdiomaPreferido(user?.idioma_preferido) }}</p>
          </div>
          <div class="profile-info-group">
            <label class="profile-info-label">Status</label>
            <p class="profile-info-value">
              <span
                class="profile-status-badge"
                :class="
                  user?.status === 'ativo' ? 'profile-status-active' : 'profile-status-inactive'
                "
              >
                {{ user?.status === 'ativo' ? 'Ativo' : 'Inativo' }}
              </span>
            </p>
          </div>
        </Card>
      </div>

      <Card class="profile-card profile-mt-6">
        <template #header>
          <h3 class="card-title">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Objetivos de Aprendizado
          </h3>
        </template>
        <p class="profile-info-value profile-objectives-text">
          {{ user?.objetivos_aprendizado || 'Nenhum objetivo definido' }}
        </p>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'

const router = useRouter()
const user = ref<any>(null)

const getNivelIngles = (nivel: string) => {
  const niveis: Record<string, string> = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
  }
  return niveis[nivel] || nivel || 'Não informado'
}

const getIdiomaPreferido = (idioma: string) => {
  const idiomas: Record<string, string> = {
    'pt-BR': 'Português (Brasil)',
    en: 'Inglês',
    es: 'Espanhol',
  }
  return idiomas[idioma] || idioma || 'Não informado'
}

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    try {
      user.value = JSON.parse(userData)
    } catch (e) {
      console.error('Erro ao carregar usuário:', e)
    }
  }
  if (!user.value) router.push('/login')
})
</script>

<style scoped>
@import '@/styles/views/users/profile.css';
</style>
