<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  modelValue: String,
  maxlength: { type: Number, default: 100 },
  placeholder: { type: String, default: 'Пароль' },
  error: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])
const visible = ref(false)
</script>

<template>
  <div class="password-wrapper">
    <input
      :type="visible ? 'text' : 'password'"
      class="input"
      :class="{ error }"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button
      type="button"
      class="toggle-password"
      @click="visible = !visible"
      :aria-pressed="visible"
    >
      <svg
        v-if="visible"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
      >
        <!-- eye open -->
        <path
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor">
        <!-- eye slash -->
        <path
          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a20.29 20.29 0 0 1 5.08-5.94"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path d="M1 1l22 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>
