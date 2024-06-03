<template>
  <div class="flex justify-center items-center">
    <div class="w-11/12">
      <h1 class="title text-3xl font-bold mt-2">
        <i class="fa-solid fa-chart-line text-4xl"></i>
         Dashboard
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <!-- Total Income -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-xl font-semibold">Total Income</h2>
          <p class="text-3xl text-green-600 mt-2">Rs.{{ totalIncome }}</p>
        </div>
        
        <!-- Total Expenses -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-xl font-semibold">Total Expenses</h2>
          <p class="text-3xl text-red-600 mt-2">Rs.{{ totalExpenses }}</p>
        </div>
        
        <!-- Net Savings -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-xl font-semibold">Net Savings</h2>
          <p class="text-3xl text-blue-600 mt-2">Rs.{{ netSavings }}</p>
        </div>
      </div>

      <!-- Financial Goals -->
      <div class="bg-white p-6 rounded-2xl shadow-md mt-6">
        <h2 class="text-xl font-semibold">Financial Goals</h2>
        <ul class="mt-4 space-y-2">
          <li v-for="(goal, index) in financialGoals" :key="index" class="flex justify-between items-center">
            <span>{{ goal.name }}</span>
            <span class="text-blue-600">Rs.{{ goal.amount.toFixed(2) }}</span>
          </li>
          <li class="flex justify-between items-center">
            <span class="font-semibold">Total Financial Goals:</span>
            <span class="text-blue-600 font-bold">Rs.{{ totalFinancialGoalsAmount.toFixed(2) }}</span>
          </li>
        </ul>
      </div>
      <div class="mt-4 flex w-full justify-between">
          <h3 class="text-lg font-semibold">Months Required to work to Achieve Financial Goals:</h3>
          <p class="text-xl title font-bold">
            {{ monthsRequiredToAchieveGoals === Infinity ? 'Cannot achieve goals with current net savings' : monthsRequiredToAchieveGoals + ' months'}}
          </p>
        </div>
      <!-- Graphs -->
      <div class="bg-white p-6 rounded-2xl shadow-md mt-6">
        <h2 class="text-xl font-semibold">Financial Charts</h2>
        
        <!-- Pie Chart: Income vs Expenses -->
        <div class="mt-4">
          <GChart
            type="PieChart"
            :data="incomeExpenseData"
            :options="incomeExpenseOptions"
            style="width: 100%; height: 400px;"
          />
        </div>

        <!-- Line Chart: Income Increment -->
        <div class="mt-4">
          <GChart
            type="LineChart"
            :data="incomeIncrementData"
            :options="incomeIncrementOptions"
            style="width: 100%; height: 400px;"
          />
        </div>

        <!-- Line Chart: Expense Increment -->
        <div class="mt-4">
          <GChart
            type="LineChart"
            :data="expenseIncrementData"
            :options="expenseIncrementOptions"
            style="width: 100%; height: 400px;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { GChart } from 'vue-google-charts';

const store = useStore();
   
const totalIncome = computed(() => store.getters.totalIncome);
const totalExpenses = computed(() => store.getters.totalExpenses);
const netSavings = computed(() => store.getters.netSavings);
const financialGoals = computed(() => store.state.goals);

// Pie Chart Data
const incomeExpenseData = computed(() => ([
  ['Type', 'Amount'],
  ['Income', totalIncome.value],
  ['Expenses', totalExpenses.value]
]));
const totalFinancialGoalsAmount = computed(() => {
  return financialGoals.value.reduce((total, goal) => total + parseFloat(goal.amount), 0);
});
// Calculate months required to achieve financial goals with current net savings
const monthsRequiredToAchieveGoals = computed(() => {
  if (netSavings.value <= 0) return Infinity; // If net savings are negative or zero, cannot achieve goals
  return Math.ceil(totalFinancialGoalsAmount.value / netSavings.value);
});
// Line Chart Data for Income Increment
const incomeIncrementData = [
  ['Month', 'Income'],
  ['January', 12000],
  ['February', 14000],
  ['March', 15000],
  ['April', 16000],
  ['May', 17000],
  ['June', 18000]
];

// Line Chart Data for Expense Increment
const expenseIncrementData = [
  ['Month', 'Expenses'],
  ['January', 8000],
  ['February', 8500],
  ['March', 9000],
  ['April', 9500],
  ['May', 10000],
  ['June', 10500]
];

// Chart Options
const incomeExpenseOptions = {
  title: 'Income vs Expenses',
  pieHole: 0.4,
  colors: ['#4caf50', '#f44336']
};

const incomeIncrementOptions = {
  title: 'Monthly Income Increment',
  curveType: 'function',
  legend: { position: 'bottom' },
  colors: ['#4caf50']
};

const expenseIncrementOptions = {
  title: 'Monthly Expense Increment',
  curveType: 'function',
  legend: { position: 'bottom' },
  colors: ['#f44336']
};
</script>

<style scoped>
.title {
  color: rgb(57, 96, 203);
}
</style>
