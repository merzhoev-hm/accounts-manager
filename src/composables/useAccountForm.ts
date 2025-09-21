// src/composables/useAccountForm.ts
import { ref, reactive, watch } from 'vue'
import type { Account } from '@/types'
import { useAccountsStore } from '@/stores/accounts'
import { parseLabels, labelsToString } from '@/utils/labels'

type DraftAccount = {
  id: string
  type: Account['type']
  login: string
  passwordLocal: string
}

export function useAccountForm(account: Account) {
  const store = useAccountsStore()

  const draft = reactive<DraftAccount>({
    id: account.id,
    type: account.type,
    login: account.login ?? '',
    passwordLocal: account.password === null ? '' : (account.password ?? ''),
  })

  const labelInput = ref(labelsToString(account.labels))
  const isLabelFocused = ref(false)
  const showPassword = ref(false)

  // Синхронизируем draft с внешним account, но не затираем labelInput, если юзер редактирует
  watch(
    () => account,
    (newA) => {
      draft.type = newA.type
      draft.login = newA.login ?? ''
      draft.passwordLocal = newA.password === null ? '' : (newA.password ?? '')
      if (!isLabelFocused.value) {
        labelInput.value = labelsToString(newA.labels)
      }
    },
    { deep: true },
  )

  // Валидации (простые)
  function validateLogin() {
    return draft.login.trim().length > 0 && draft.login.length <= 100
  }
  function validatePassword() {
    if (draft.type === 'LDAP') return true
    return draft.passwordLocal.trim().length > 0 && draft.passwordLocal.length <= 100
  }

  // Сохраняем auth-поля в стор (type, login, password)
  function saveAuth() {
    if (!validateLogin() || !validatePassword()) return
    store.updateAccount(draft.id, {
      type: draft.type,
      login: draft.login,
      password: draft.type === 'LDAP' ? null : draft.passwordLocal,
    })
  }

  // --- САМЫЙ ВАЖНЫЙ ПРИЁМ: watchers, которые автоматически сохраняют при изменении ---
  // Не используем immediate: не хотим лишних write при инициализации
  watch(
    () => draft.login,
    () => saveAuth(),
  )
  watch(
    () => draft.passwordLocal,
    () => saveAuth(),
  )
  watch(
    () => draft.type,
    () => saveAuth(),
  )

  // Метки — сохраняем при blur (или явно через saveLabels)
  function saveLabels() {
    if (labelInput.value == null) return
    const labels = parseLabels(labelInput.value)
    store.updateAccount(draft.id, { labels })
    labelInput.value = labelsToString(labels)
  }

  function remove() {
    store.removeAccount(draft.id)
  }

  return {
    draft,
    labelInput,
    isLabelFocused,
    showPassword,
    saveAuth,
    saveLabels,
    remove,
  }
}
