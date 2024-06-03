<template>
  <div class="flex justify-center items-center">
    <div class="w-11/12">
      <h1 class="title text-2xl font-bold mt-2">
        <i class="fa-solid fa-calendar-check text-4xl"></i>
        Create Goals
      </h1>

      <!-- Goals List -->
      <div v-if="goals.length" class="mt-8">
        <h2 class="text-2xl flex justify-center font-bold title mb-4">Goals List:</h2>
        <ul class="divide-y divide-gray-300">
          <li
            v-for="(goal, index) in goals"
            :key="index"
            class="mb-4 p-2 border border-gray-300 bg-white rounded-md cursor-pointer hover:bg-gray-50"
            @click="showGoalDetails(goal)"
          >
            <h3 class="text-xl font-semibold">{{ goal.name }}</h3>
            <div class="flex justify-between">
              <span class="text-gray-600">{{ goal.amount }}</span>
              <span class="text-gray-600">{{ goal.monthsRequired }} months</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Goal Form -->

      <h1 class="title flex justify-center m-4 text-2xl font-semibold">
        Set Goals :
      </h1>
      <form @submit.prevent="addGoal" class="max-w-md mx-auto mt-8">
        <div class="mb-6">
          <label for="goalName" class="block text-sm font-medium text-gray-700">Goal Name</label>
          <input
            id="goalName"
            type="text"
            v-model="goalName"
            class="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your goal name"
          />
        </div>
        <div class="mb-6">
          <label for="monthlyIncome" class="block text-sm font-medium text-gray-700">Per Month Income</label>
          <input
            id="monthlyIncome"
            type="number"
            v-model="monthlyIncome"
            class="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your per month income"
          />
        </div>
        <div class="mb-6">
          <label for="monthlySavings" class="block text-sm font-medium text-gray-700">Per Month Savings</label>
          <input
            id="monthlySavings"
            type="number"
            v-model="monthlySavings"
            class="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter the amount you save every month"
          />
        </div>
        <div class="mb-6">
          <label for="goalAmount" class="block text-sm font-medium text-gray-700">Total Price Needed</label>
          <input
            id="goalAmount"
            type="number"
            v-model="goalAmount"
            class="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter the total price needed for the goal"
          />
        </div>
        <button type="submit" class="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">Add Goal</button>
      </form>

      <!-- Goal Details Modal -->
      <div v-if="selectedGoal !== null" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-md max-w-md overflow-hidden shadow-lg">
          <div class="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <div class="text-4xl font-bold mb-4">{{ selectedGoal.name }}</div>
            <div class="flex flex-wrap -mx-2 mb-2">
              <div class="w-full px-2 mb-2 text-2xl">
                <p class="text-green-400 font-bold "><span class="font-semibold text-gray-100">Goal Amount:</span> Rs.{{ selectedGoal.amount }}</p>
              </div>
              <div class="w-full px-2 mb-2">
                <p class="text-gray-100"><span class="font-semibold">Monthly Income:</span> {{ selectedGoal.income }}</p>
              </div>
              <div class="w-full px-2 mb-2">
                <p class="text-gray-100"><span class="font-semibold">Monthly Savings:</span> {{ selectedGoal.savings }}</p>
              </div>
              <div class="w-full px-2 mb-2">
                <p class="text-red-600 text-xl font-bold "><span class= " text-lg text-gray-100 font-semibold">Required current savings:</span> {{ selectedGoal.monthsRequired }}</p>
              </div>
              <div class="w-full px-2 mb-2">
                <p class="text-gray-100"><span class="font-semibold">Months required with 10% increased savings:</span> {{ selectedGoal.monthsRequired10 }}</p>
              </div>
              <div class="w-full px-2 mb-2">
                <p class="text-gray-100"><span class="font-semibold">Months required with 20% increased savings:</span> {{ selectedGoal.monthsRequired20 }}</p>
              </div>
            </div>
            <button @click="selectedGoal = null" class="bg-white text-blue-600 py-2 px-4 mt-4 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300">Close</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const goalName = ref('');
const monthlyIncome = ref('');
const monthlySavings = ref('');
const goalAmount = ref('');
const goals = computed(() => store.state.goals);
const selectedGoal = ref(null);

const addGoal = () => {
  if (goalName.value && monthlyIncome.value && monthlySavings.value && goalAmount.value) {
    const savings = parseFloat(monthlySavings.value);
    const goal = parseFloat(goalAmount.value);

    const monthsRequired = Math.ceil(goal / savings);
    const monthsRequired10 = Math.ceil(goal / (savings * 1.1));
    const monthsRequired20 = Math.ceil(goal / (savings * 1.2));

    store.commit('ADD_GOAL', {
      name: goalName.value,
      income: monthlyIncome.value,
      savings: monthlySavings.value,
      amount: goalAmount.value,
      monthsRequired,
      monthsRequired10,
      monthsRequired20
    });

    goalName.value = '';
    monthlyIncome.value = '';
    monthlySavings.value = '';
    goalAmount.value = '';
   } else {
    alert('Please fill in all fields.');
  }
};

const showGoalDetails = (goal) => {
  selectedGoal.value = goal;
};
</script>

<style scoped>
/* You can add scoped styles here if needed */
</style>
