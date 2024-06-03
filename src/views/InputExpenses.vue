<template>
  <div class="flex justify-center items-center">
    <div class="w-11/12">
      <!-- Expenses Section -->
      <h1 class="title text-2xl font-bold mt-2">
        <i class="fa-solid fa-paper-plane text-4xl"></i>
        Expenses
      </h1>
      <div class="bg-white w-max rounded-3xl p-4 my-6">
        <div class="text-3xl font-semibold">
          Total Expenses per month:
          <div class="text-red-600">
            Rs.{{ totalExpenses.toFixed(2) }}
          </div>
        </div>
        <div class="text-base font-medium">
          10% increased: Rs.{{ (totalExpenses * 1.1).toFixed(2) }}
        </div>
        <div class="text-base font-medium">
          20% increased: Rs.{{ (totalExpenses * 1.2).toFixed(2) }}
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl my-5">
        <h1 class="text-2xl font-bold flex justify-center my-2 title">Expense Sources:</h1>
        <div class="flex justify-around font-bold text-base mb-2">
          <span>Source</span>
          <span>Amount</span>
          <span>Increment</span>
        </div>
        <ul class="space-y-2 mb-4">
          <li
            v-for="(expense, index) in expenses"
            :key="index"
            class="expense-item flex justify-around p-2 bg-gray-100 m-2"
          >
            <span>{{ expense.source }}</span>
            <span>Rs.{{ expense.amount.toFixed(2) }}</span>
            <span>10%</span>
          </li>
        </ul>
      </div>

      <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col">
        <h1 class="text-xl flex justify-center mb-4 font-semibold title">
          Input Expenses:
        </h1>
        <form @submit.prevent="addExpense" class="expense-input flex flex-col">
          <label for="expenseSource">Expense source:</label>
          <input
            id="expenseSource"
            v-model="newExpense.source"
            type="text"
            placeholder="Expense Source"
            class="p-2 mb-2 border border-gray-300 rounded w-full"
          />
          <label for="expenseAmount">Amount</label>
          <input
            id="expenseAmount"
            v-model="newExpense.amount"
            type="number"
            placeholder="Amount"
            class="p-2 mb-2 border border-gray-300 rounded w-full"
          />
          <button
            type="submit"
            class="bg-blue-500 text-white p-2 rounded w-max hover:bg-blue-600"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const newExpense = reactive({
  source: '',
  amount: 0
});

const expenses = computed(() => store.state.expenses);

const totalExpenses = computed(() => {
  return expenses.value.reduce((total, expense) => total + parseFloat(expense.amount), 0);
});

function addExpense() {
  if (newExpense.source && newExpense.amount) {
    store.commit('ADD_EXPENSE', { ...newExpense });
    newExpense.source = '';
    newExpense.amount = 0;
  }
}
</script>

<style scoped>
.title {
  color: rgb(57, 96, 203);
}
</style>
