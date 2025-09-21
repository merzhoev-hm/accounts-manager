<script setup lang="ts">
import { computed } from 'vue'
import LabelEditor from './LabelEditor.vue'
import PasswordField from './PasswordField.vue'
import { useAccountForm } from '@/composables/useAccountForm'
import type { Account } from '@/types'

const props = defineProps<{ account: Account }>()
const { draft, labelInput, isLabelFocused, saveAuth, saveLabels, remove } = useAccountForm(
  props.account,
)

const labelOk = computed(() => (labelInput.value ?? '').length <= 50)
const loginOk = computed(() => draft.login.trim().length > 0 && draft.login.length <= 100)
const passwordOk = computed(
  () =>
    draft.type === 'LDAP' ||
    (draft.passwordLocal.trim().length > 0 && draft.passwordLocal.length <= 100),
)
const authOk = computed(() => loginOk.value && passwordOk.value)

function onLabelBlur() {
  isLabelFocused.value = false
  saveLabels()
}

function onTypeChange() {
  saveAuth()
}
</script>

<template>
  <div class="accounts-grid row">
    <div>
      <LabelEditor
        v-model="labelInput"
        :maxlength="50"
        @focus="isLabelFocused = true"
        @blur="onLabelBlur"
        :error="!labelOk"
      />
    </div>

    <div>
      <select
        v-model="draft.type"
        class="select"
        :class="{ error: !authOk }"
        @change="onTypeChange"
      >
        <option value="Local">Локальная</option>
        <option value="LDAP">LDAP</option>
      </select>
    </div>

    <div>
      <input
        class="input"
        :class="{ error: !loginOk }"
        maxlength="100"
        placeholder="Логин"
        v-model="draft.login"
      />
    </div>

    <div>
      <PasswordField
        v-if="draft.type === 'Local'"
        v-model="draft.passwordLocal"
        :maxlength="100"
        :error="!passwordOk"
      />
      <div v-else class="small-muted">—</div>
    </div>

    <div class="row-action">
      <button class="btn del" @click="remove">🗑</button>
    </div>
  </div>
</template>

<style scoped>
.password-wrapper {
  position: relative;
  display: flex;
}
.password-wrapper .input {
  padding-right: 40px;
}
.toggle-password {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}
.toggle-password .icon {
  width: 20px;
  height: 20px;
}
</style>
