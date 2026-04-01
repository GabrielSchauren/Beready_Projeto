<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Criar conta</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Preencha os dados abaixo para se cadastrar
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="nome" class="sr-only">Nome</label>
            <input
              id="nome"
              v-model="form.nome"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Nome completo"
            />
          </div>
          <div>
            <label for="email" class="sr-only">E-mail</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="E-mail"
            />
          </div>
          <div>
            <label for="senha" class="sr-only">Senha</label>
            <input
              id="senha"
              v-model="form.senha"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Senha"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
          </button>
        </div>

        <div class="text-center text-sm">
          <p class="text-gray-600">
            Já tem uma conta?
            <a href="/login" class="font-medium text-blue-600 hover:text-blue-500"> Faça login </a>
          </p>
        </div>

        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
        <p v-if="success" class="text-green-500 text-sm text-center">{{ success }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../services/api'

const router = useRouter()
const loading = ref(false)
const error = ref('')
const success = ref('')
const form = ref({
  nome: '',
  email: '',
  senha: '',
})

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await auth.register(form.value)

    if (response.data.success) {
      success.value = 'Cadastro realizado com sucesso! Redirecionando...'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      error.value = response.data.message || 'Erro ao cadastrar'
    }
  } catch (err: any) {
    console.error('Erro na requisição:', err)

    if (err.response) {
      const message = err.response.data?.message || 'Erro no servidor'
      error.value = message
    } else if (err.request) {
      error.value = 'Servidor não respondeu. Verifique se o backend está rodando.'
    } else {
      error.value = err.message || 'Erro ao conectar com o servidor'
    }
  } finally {
    loading.value = false
  }
}
</script>
