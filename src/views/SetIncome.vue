<template>
  <div class="flex justify-center items-center">
    <div class="w-11/12">
      <h1 class="title text-2xl font-bold mt-2">
        <i class="fa-solid fa-wallet text-4xl"></i>
        Incomes
      </h1>
      <!-- Total Income section -->
      <div class="bg-white w-max rounded-3xl p-4  my-6">
        <div class="text-3xl font-semibold">
          Total Income per month:
          <div class="text-green-600">
            Rs.{{ totalIncome.toFixed(2) }}
          </div>
          <!-- Display message based on income -->
          <div v-if="totalIncome > 17000" class="text-xs bg-green-400 text-white w-max p-1 rounded-2xl">
            Over Minimum wage
          </div>
          <div v-else class="text-xs bg-red-600 text-white w-max p-1 rounded-2xl">
            Under Minimum wage
          </div>
        </div>
        <!-- Display 10% and 20% increased income -->
        <div class="text-base  font-medium">
          10% increased: Rs.{{ (totalIncome * 1.1).toFixed(2) }}
        </div>
        <div class="text-base font-medium">
          20% increased: Rs.{{ (totalIncome * 1.2).toFixed(2) }}
        </div>
      </div>

      <!-- Income Sources section -->
      <div class="bg-white p-4 rounded-2xl my-5 ">
        <h1 class="text-2xl font-bold  flex justify-center my-2 title">Income Sources:</h1>
        <div class="flex justify-around font-bold text-base mb-2">
          <span>Source</span>
          <span>Amount</span>
          <span>Increment</span>
        </div>
        <ul class="space-y-2 mb-4">
          <li
            v-for="(income, index) in incomes"
            :key="index"
            class="income-item flex justify-around p-2 bg-gray-100  m-2 "
          >
            <span>{{ income.source }}</span>
            <span>Rs.{{ income.amount.toFixed(2) }}</span>
            <span>10% </span>
          </li>
        </ul>
      </div>

      <!-- Input Incomes section -->
      <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col ">
        <h1 class=" text-xl flex  justify-center mb-4 font-semibold title">
          Input Incomes:
        </h1>
        <!-- Form to add new income -->
        <form @submit.prevent="addIncome" class="income-input flex flex-col ">
          <label for="source">Income source:</label>
          <input
            id="source"
            v-model="newIncome.source"
            type="text"
            placeholder="Income Source"
            class="p-2 mb-2 border border-gray-300 rounded w-full"
          />
          <label for="Amount">Amount</label>
          <input
            id="Amount"
            v-model="newIncome.amount"
            type="number"
            placeholder="Amount"
            class="p-2 mb-2 border border-gray-300 rounded w-full"
          />
          <button
            type="submit"
            class="bg-blue-500 text-white p-2 rounded w-max hover:bg-blue-600"
          >
            Add Income
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';


const store = useStore();

// Reactive object for new income
const newIncome = reactive({
  source: '',
  amount: 0
});

// Function to add new income to the store
function addIncome() {
  // Check if source and amount are provided
  if (newIncome.source && newIncome.amount) {
    // Dispatch Vuex mutation to add income
    store.commit('ADD_INCOME', { ...newIncome });
    // Reset input fields
    newIncome.source = '';
    newIncome.amount = 0;
  }
}

// Extract incomes from the store
const incomes = store.state.incomes;

// Get total income from the store
const totalIncome = store.getters.totalIncome;
</script>

<style scoped>
.title {
  color: rgb(57, 96, 203);
}
</style>
