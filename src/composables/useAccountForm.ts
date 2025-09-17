import { ref, watch } from 'vue'
import type { Account } from '@/types'
import { useAccountsStore } from '@/stores/accounts'
import { parseLabels, labelsToString } from '@/utils/labels'

export function useAccountForm(account: Account) {
  const store = useAccountsStore()

  const draft = ref({
    id: account.id,
    type: account.type as 'Local' | 'LDAP',
    login: account.login ?? '',
    passwordLocal: account.password === null ? '' : (account.password ?? ''),
  })

  const labelInput = ref(labelsToString(account.labels))
  const isLabelFocused = ref(false)
  const showPassword = ref(false)

  watch(
    () => account,
    (newA) => {
      draft.value.type = newA.type
      draft.value.login = newA.login
      draft.value.passwordLocal = newA.password === null ? '' : (newA.password ?? '')
      if (!isLabelFocused.value) labelInput.value = labelsToString(newA.labels)
    },
    { deep: true },
  )

  function validateLogin() {
    const ok = draft.value.login.trim().length > 0 && draft.value.login.length <= 100
    return ok
  }
  function validatePassword() {
    if (draft.value.type === 'LDAP') return true
    return draft.value.passwordLocal.trim().length > 0 && draft.value.passwordLocal.length <= 100
  }
  function validateLabelLength(max = 50) {
    return (labelInput.value ?? '').length <= max
  }

  function saveAuth() {
    if (!validateLogin() || !validatePassword()) return false
    store.updateAccount(draft.value.id, {
      type: draft.value.type,
      login: draft.value.login,
      password: draft.value.type === 'LDAP' ? null : draft.value.passwordLocal,
    })
    return true
  }

  function saveLabels() {
    if (!validateLabelLength()) return false
    const labels = parseLabels(labelInput.value)
    store.updateAccount(draft.value.id, { labels })

    labelInput.value = labelsToString(labels)
    return true
  }

  function remove() {
    store.removeAccount(draft.value.id)
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
