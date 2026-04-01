<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Beready</h2>
        <p class="mt-2 text-center text-sm text-gray-600">Faça login para continuar</p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">E-mail</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="E-mail"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Senha</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Senha"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="/forgot-password" class="font-medium text-primary-600 hover:text-primary-500">
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </div>

        <div class="text-center text-sm">
          <p class="text-gray-600">
            Não tem uma conta?
            <a href="/register" class="font-medium text-primary-600 hover:text-primary-500">
              Cadastre-se
            </a>
          </p>
        </div>

        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/services/api'

const router = useRouter()
const loading = ref(false)
const error = ref('')
const form = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await auth.login(form.value)

    if (response.data.success) {
      // Salvar dados do usuário
      localStorage.setItem('user', JSON.stringify(response.data.data))
      // Redirecionar para dashboard
      router.push('/dashboard')
    } else {
      error.value = response.data.message || 'Erro ao fazer login'
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro de conexão com o servidor'
  } finally {
    loading.value = false
  }
}
</script>
