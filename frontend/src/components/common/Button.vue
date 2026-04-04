<template>
  <button
    :type="type"
    :disabled="disabled"
    class="btn"
    :class="[`btn-${variant}`, { 'btn-loading': loading }, { 'btn-block': block }]"
    @click="$emit('click')"
  >
    <svg v-if="loading" class="btn-spinner" viewBox="0 0 24 24">
      <circle class="spinner-circle" cx="12" cy="12" r="10" />
      <path class="spinner-path" d="M12 2a10 10 0 0 1 10 10" />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) =>
      ['primary', 'secondary', 'danger', 'success', 'outline'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.3);
}

.btn-secondary {
  background: var(--secondary);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
  transform: translateY(-2px);
}

.btn-danger {
  background: var(--danger);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
  transform: translateY(-2px);
}

.btn-success {
  background: var(--success);
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}

.btn-outline:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.btn-block {
  width: 100%;
}

.btn-loading {
  pointer-events: none;
  opacity: 0.7;
}

.btn-spinner {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

.spinner-circle {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  opacity: 0.3;
}

.spinner-path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
}
</style>
