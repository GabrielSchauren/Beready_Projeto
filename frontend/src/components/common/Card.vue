<template>
  <div class="card" :class="`card-${variant}`">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) =>
      ['default', 'primary', 'success', 'danger', 'warning'].includes(value),
  },
})
</script>

<style scoped>
.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-primary {
  border-top: 4px solid var(--primary);
}

.card-success {
  border-top: 4px solid var(--success);
}

.card-danger {
  border-top: 4px solid var(--danger);
}

.card-warning {
  border-top: 4px solid var(--warning);
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}
</style>
