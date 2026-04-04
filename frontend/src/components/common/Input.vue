<template>
  <div class="input-group">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="input-container" :class="{ 'has-icon': icon, 'has-error': error }">
      <component :is="icon" v-if="icon" class="input-icon" />
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        class="input-field"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="input-toggle"
        @click="togglePasswordVisibility"
      >
        <svg
          v-if="showPassword"
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>
    </div>
    <span v-if="error" class="input-error">{{ error }}</span>
    <span v-if="hint" class="input-hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  icon: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'blur'])

const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const getInputType = () => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
}
</script>

<style scoped>
.input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.input-container {
  position: relative;
}

.input-container.has-icon .input-field {
  padding-left: 3rem;
}

.input-field {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #374151;
}

.input-field:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  outline: none;
}

.input-field:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.input-container.has-error .input-field {
  border-color: var(--danger);
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  width: 1.25rem;
  height: 1.25rem;
  pointer-events: none;
}

.input-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-toggle:hover {
  color: #374151;
}

.input-error {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--danger);
}

.input-hint {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #6b7280;
}
</style>
