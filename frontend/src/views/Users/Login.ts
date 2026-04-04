import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@/composables/useForm'
import { useAlert } from '@/composables/useAlert'

export function useLogin() {
  const router = useRouter()
  const { success, error, clearAllAlerts } = useAlert()
  const loading = ref(false)

  const { form, errors, validate } = useForm({ email: '', password: '' })

  const rules = {
    email: (value: string) => (!value ? 'E-mail é obrigatório' : null),
    password: (value: string) => {
      if (!value) return 'Senha é obrigatória'
      if (value.length < 6) return 'A senha deve ter pelo menos 6 caracteres'
      return null
    },
  }

  const handleSubmit = async () => {
    if (!validate(rules)) return

    loading.value = true

    try {
      // 🔥 URL CORRETA
      const response = await fetch('http://localhost:8765/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })
      const data = await response.json()

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user))
        success('Login realizado com sucesso!')

        setTimeout(() => {
          clearAllAlerts()
          router.push('/dashboard')
        }, 500)
      } else {
        error(data.message || 'E-mail ou senha inválidos')
      }
    } catch (err) {
      console.error('Erro:', err)
      error('Erro de conexão com o servidor')
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    errors,
    loading,
    handleSubmit,
  }
}
