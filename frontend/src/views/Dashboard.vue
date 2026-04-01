<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">Beready</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Olá, {{ user?.nome }}</span>
            <button
              @click="handleLogout"
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
          <p class="text-gray-600">Bem-vindo ao Beready! Seu aprendizado de inglês começa aqui.</p>

          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-900">Flashcards</h3>
              <p class="text-blue-700">Estude com flashcards</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-semibold text-green-900">Quizes</h3>
              <p class="text-green-700">Teste seus conhecimentos</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h3 class="font-semibold text-purple-900">Prompts</h3>
              <p class="text-purple-700">Gerador de prompts com IA</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../services/api'

const router = useRouter()
const user = ref<any>(null)

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
})

const handleLogout = async () => {
  try {
    await auth.logout()
    localStorage.removeItem('user')
    router.push('/login')
  } catch (err) {
    console.error('Erro ao fazer logout:', err)
  }
}
</script>
