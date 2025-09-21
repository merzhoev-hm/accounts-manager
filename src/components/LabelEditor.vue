<script setup lang="ts">
const model = defineModel<string>()

const props = defineProps({
  maxlength: { type: Number, default: 50 },
  placeholder: { type: String, default: 'Разделяйте метки через ;' },
  error: { type: Boolean, default: false },
})
defineEmits(['focus', 'blur'])
</script>

<template>
  <input
    class="input"
    :class="{ error: error }"
    :maxlength="props.maxlength"
    :placeholder="props.placeholder"
    v-model="model"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>
