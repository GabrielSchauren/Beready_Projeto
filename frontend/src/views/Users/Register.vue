<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <div class="header-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 class="register-title">Criar Conta</h1>
          <p class="register-subtitle">Junte-se à nossa comunidade de aprendizado</p>
        </div>

        <div class="register-body">
          <div v-if="flashMessage" class="flash-message" :class="flashType">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="flashType === 'success'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ flashMessage }}
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="register-form-grid">
              <div class="register-section">
                <h3 class="register-section-title">
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
                <Input
                  v-model="form.nome"
                  label="Nome Completo *"
                  placeholder="Seu nome completo"
                  required
                  :error="errors.nome"
                />
                <Input
                  v-model="form.email"
                  label="E-mail *"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  required
                  :error="errors.email"
                />
                <Input
                  v-model="form.telefone"
                  label="Telefone"
                  placeholder="(99) 99999-9999"
                  @input="formatTelefone"
                />
              </div>

              <div class="register-section">
                <h3 class="register-section-title">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Segurança
                </h3>
                <div class="form-group">
                  <label class="form-label">Senha *</label>
                  <div class="input-container password-container">
                    <input
                      v-model="form.senha"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-input password-input"
                      placeholder="Crie uma senha segura"
                      required
                      @input="checkPasswordStrength"
                    />
                    <button
                      type="button"
                      class="toggle-password"
                      @click="showPassword = !showPassword"
                    >
                      <svg
                        v-if="!showPassword"
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <svg
                        v-else
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
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="register-password-strength">
                    <div class="register-strength-bar">
                      <div
                        class="register-strength-fill"
                        :class="strengthClass"
                        :style="{ width: strengthWidth }"
                      ></div>
                    </div>
                    <div class="register-strength-text">{{ strengthText }}</div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Confirmar Senha *</label>
                  <div class="input-container password-container">
                    <input
                      v-model="form.confirmar_senha"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="form-input password-input"
                      placeholder="Digite a senha novamente"
                      required
                      @input="checkPasswordMatch"
                    />
                    <button
                      type="button"
                      class="toggle-password"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <svg
                        v-if="!showConfirmPassword"
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <svg
                        v-else
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
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    v-if="form.confirmar_senha"
                    class="register-password-match"
                    :class="{ matching: passwordsMatch, 'not-matching': !passwordsMatch }"
                  >
                    <svg
                      v-if="passwordsMatch"
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <svg
                      v-else
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
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{{
                      passwordsMatch ? 'As senhas coincidem' : 'As senhas não coincidem'
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="register-section">
                <h3 class="register-section-title">
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
                <div class="form-group">
                  <label class="form-label">Nível de Inglês</label>
                  <div class="input-container select-container">
                    <select v-model="form.nivel_ingles" class="form-input select-input">
                      <option value="">Selecione seu nível</option>
                      <option value="iniciante">Iniciante</option>
                      <option value="intermediario">Intermediário</option>
                      <option value="avancado">Avançado</option>
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="select-arrow"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Idioma Preferido</label>
                  <div class="input-container select-container">
                    <select v-model="form.idioma_preferido" class="form-input select-input">
                      <option value="">Selecione o idioma</option>
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en">Inglês</option>
                      <option value="es">Espanhol</option>
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="select-arrow"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Objetivos de Aprendizado</label>
                  <div class="input-container textarea-container">
                    <textarea
                      v-model="form.objetivos_aprendizado"
                      rows="3"
                      class="form-input textarea-input"
                      placeholder="Descreva seus objetivos..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="register-form-actions">
              <Button variant="secondary" type="button" @click="$router.push('/login')"
                >Cancelar</Button
              >
              <Button type="submit" :loading="loading">Criar Minha Conta</Button>
            </div>
          </form>

          <div class="register-login-redirect">
            <p>Já tem uma conta? <router-link to="/login">Fazer Login</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import { useForm } from '@/composables/useForm'

const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const flashMessage = ref('')
const flashType = ref('')
const strengthClass = ref('')
const strengthText = ref('Força da senha')
const strengthWidth = ref('0%')

const { form, errors, validate } = useForm({
  nome: '',
  email: '',
  telefone: '',
  senha: '',
  confirmar_senha: '',
  nivel_ingles: '',
  idioma_preferido: '',
  objetivos_aprendizado: '',
})

const passwordsMatch = computed(() => form.senha === form.confirmar_senha)

const formatTelefone = (e: Event) => {
  const target = e.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  if (value.length <= 11) {
    if (value.length <= 2) value = value.replace(/^(\d{0,2})/, '($1')
    else if (value.length <= 7) value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2')
    else if (value.length <= 11) value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    target.value = value
    form.telefone = value
  }
}

const checkPasswordStrength = () => {
  const password = form.senha
  let strength = 0
  if (password.length >= 8) strength++
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
  if (password.match(/\d/)) strength++
  if (password.match(/[^a-zA-Z\d]/)) strength++

  switch (strength) {
    case 0:
      strengthText.value = 'Força da senha: Muito Fraca'
      strengthClass.value = ''
      strengthWidth.value = '0%'
      break
    case 1:
      strengthText.value = 'Força da senha: Fraca'
      strengthClass.value = 'weak'
      strengthWidth.value = '25%'
      break
    case 2:
      strengthText.value = 'Força da senha: Moderada'
      strengthClass.value = 'medium'
      strengthWidth.value = '50%'
      break
    case 3:
      strengthText.value = 'Força da senha: Forte'
      strengthClass.value = 'strong'
      strengthWidth.value = '75%'
      break
    case 4:
      strengthText.value = 'Força da senha: Muito Forte'
      strengthClass.value = 'very-strong'
      strengthWidth.value = '100%'
      break
  }
}

const checkPasswordMatch = () => {}

const handleSubmit = async () => {
  if (!passwordsMatch.value) {
    flashType.value = 'error'
    flashMessage.value = 'As senhas não coincidem'
    return
  }
  if (form.senha.length < 6) {
    flashType.value = 'error'
    flashMessage.value = 'A senha deve ter pelo menos 6 caracteres'
    return
  }

  loading.value = true
  flashMessage.value = ''

  try {
    const response = await fetch('http://localhost:8765/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        telefone: form.telefone,
        nivel_ingles: form.nivel_ingles,
        idioma_preferido: form.idioma_preferido,
        objetivos_aprendizado: form.objetivos_aprendizado,
      }),
    })
    const data = await response.json()
    if (data.success) {
      flashType.value = 'success'
      flashMessage.value = 'Cadastro realizado com sucesso! Redirecionando...'
      setTimeout(() => router.push('/login'), 2000)
    } else {
      flashType.value = 'error'
      flashMessage.value = data.message || 'Erro ao cadastrar'
    }
  } catch (err) {
    flashType.value = 'error'
    flashMessage.value = 'Erro de conexão com o servidor'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import '@/styles/views/users/register.css';
</style>
