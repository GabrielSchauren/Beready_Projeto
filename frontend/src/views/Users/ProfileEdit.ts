import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@/composables/useForm'
import { usePasswordStrength } from '@/composables/usePasswordStrength'
import { usePhoneMask } from '@/composables/usePhoneMask'
import { useAlert } from '@/composables/useAlert'

export function useProfileEdit() {
  const router = useRouter()
  const { success, error } = useAlert()
  const loading = ref(false)
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  const { strengthClass, strengthText, strengthWidth, checkPasswordStrength } =
    usePasswordStrength()
  const { handlePhoneInput, phoneError } = usePhoneMask()

  const { form, errors, validate } = useForm({
    id: '',
    nome: '',
    email: '',
    telefone: '',
    nivel_ingles: '',
    idioma_preferido: '',
    status: 'ativo',
    objetivos_aprendizado: '',
    nova_senha: '',
    confirmar_senha: '',
  })

  const passwordsMatch = computed(() => {
    if (!form.nova_senha && !form.confirmar_senha) return true
    return form.nova_senha === form.confirmar_senha
  })

  const checkPasswordMatch = () => {}

  const loadUserData = () => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        form.id = user.id
        form.nome = user.nome || ''
        form.email = user.email || ''
        form.telefone = user.telefone || ''
        form.nivel_ingles = user.nivel_ingles || ''
        form.idioma_preferido = user.idioma_preferido || ''
        form.status = user.status || 'ativo'
        form.objetivos_aprendizado = user.objetivos_aprendizado || ''
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleSubmit = async () => {
    // Validar telefone se foi alterado
    if (form.telefone) {
      const digits = form.telefone.replace(/\D/g, '')
      if (digits.length > 0 && digits.length < 10) {
        error('Telefone deve ter pelo menos 10 dígitos')
        return
      }
    }

    // Validar senha se foi preenchida
    if (form.nova_senha) {
      if (form.nova_senha.length < 6) {
        error('A nova senha deve ter pelo menos 6 caracteres')
        return
      }
      if (form.nova_senha !== form.confirmar_senha) {
        error('As senhas não coincidem')
        return
      }
    }

    loading.value = true

    try {
      const submitData: any = {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        nivel_ingles: form.nivel_ingles,
        idioma_preferido: form.idioma_preferido,
        status: form.status,
        objetivos_aprendizado: form.objetivos_aprendizado,
      }
      if (form.nova_senha) submitData.senha = form.nova_senha

      const response = await fetch(`http://localhost:8765/users/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })
      const data = await response.json()

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user))
        success('Perfil atualizado com sucesso!')
        setTimeout(() => router.push('/profile'), 1500)
      } else {
        error(data.message || 'Erro ao atualizar perfil')
      }
    } catch (err) {
      error('Erro de conexão com o servidor')
    } finally {
      loading.value = false
    }
  }

  onMounted(loadUserData)

  return {
    form,
    errors,
    loading,
    showPassword,
    showConfirmPassword,
    strengthClass,
    strengthText,
    strengthWidth,
    phoneError,
    passwordsMatch,
    handlePhoneInput,
    checkPasswordStrength,
    checkPasswordMatch,
    handleSubmit,
  }
}
