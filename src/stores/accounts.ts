import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '@/types'

const STORAGE_KEY = 'accounts_v1'

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) accounts.value = JSON.parse(raw) as Account[]
    } catch {
      accounts.value = []
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value))
  }

  function addAccount() {
    accounts.value.push({
      id: generateId(),
      labels: [],
      type: 'Local',
      login: '',
      password: '',
    })
    persist()
  }

  function updateAccount(id: string, patch: Partial<Account>) {
    const idx = accounts.value.findIndex((a) => a.id === id)
    if (idx === -1) return
    accounts.value[idx] = { ...accounts.value[idx], ...patch }
    persist()
  }

  function removeAccount(id: string) {
    const idx = accounts.value.findIndex((a) => a.id === id)
    if (idx !== -1) {
      accounts.value.splice(idx, 1)
      persist()
    }
  }

  load()

  return { accounts, addAccount, updateAccount, removeAccount, persist }
})
