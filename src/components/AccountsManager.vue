<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import AccountRow from '@/components/AccountRow.vue'

const store = useAccountsStore()
const accounts = store.accounts

function add() {
  store.addAccount()
}
</script>
<template>
  <div class="card">
    <div class="header">
      <div>
        <div class="title">Учётные записи</div>
      </div>
      <button class="btn add" @click="add">+</button>
    </div>

    <div class="hint">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>

    <div class="accounts-grid headers">
      <div>Метки</div>
      <div>Тип записи</div>
      <div>Логин</div>
      <div>Пароль</div>
      <div></div>
    </div>

    <div v-if="accounts.length === 0" class="small-muted" style="padding: 10px 0">
      Список пуст — нажмите «+» чтобы создать запись
    </div>

    <div v-for="acc in accounts" :key="acc.id" class="row">
      <AccountRow :account="acc" />
    </div>
  </div>
</template>
