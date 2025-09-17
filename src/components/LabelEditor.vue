<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  maxlength: { type: Number, default: 50 },
  placeholder: { type: String, default: 'Разделяйте метки через ;' },
  error: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])
</script>

<template>
  <input
    class="input"
    :class="{ error: error }"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>
