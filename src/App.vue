<template>
  <header class="header  flex justify-center ">
    <div class="w-11/12 h-12 flex justify-between  items-center ">
      <div class="bg-black font-bold p-2 text-base rounded-full">
        BB
      </div>
      <nav class="w-1/2 flex justify-between font-semibold text-base ">
        <RouterLink
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          class="hover:text-gray-300 flex justify-center items-center"
          
        >
        <i :class="[route.icon ,'Icons' ,'mr-2']"></i>
          {{ route.name }}
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';

const routes = [
  { path: '/', name: 'Dashboard',icon:"fa-solid fa-chart-line" },
  {path:'/incomes' ,name:'Incomes',icon:'fa-solid fa-wallet'},
  { path: '/creategoal', name: 'Create Goal',icon:'fa-solid fa-calendar-check'},
  { path: '/expences', name: 'Expenses',icon:"fa-solid fa-paper-plane" },
  { path: '/about', name: 'About',icon:"fa-solid fa-circle-info" },

];
</script>

<style scoped>
.Icons{
  font-size: 1.2rem;
}
.header {
  padding: 0.5rem 0;
  background-color: rgb(77, 118, 232);
  color: white;
}
</style>
