// store.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      incomes: [
        { source: 'Salary', amount: 15000 },
        { source: 'Bonus', amount: 2000 }
      ],
      expenses: [
        { source: 'Rent', amount: 5000 },
        { source: 'Groceries', amount: 3000 }
      ],
      goals: [
        { name: 'Buy a House', income: 5000, savings: 1000, amount: 200000, monthsRequired: 200, monthsRequired10: 182, monthsRequired20: 167 },
        { name: 'Travel the World', income: 4000, savings: 800, amount: 10000, monthsRequired: 13, monthsRequired10: 12, monthsRequired20: 11 },
        { name: 'Start a Business', income: 6000, savings: 1200, amount: 50000, monthsRequired: 42, monthsRequired10: 38, monthsRequired20: 35 },
        { name: 'Retirement Fund', income: 7000, savings: 1400, amount: 1000000, monthsRequired: 714, monthsRequired10: 649, monthsRequired20: 595 },
        { name: 'Higher Education', income: 4500, savings: 900, amount: 30000, monthsRequired: 34, monthsRequired10: 31, monthsRequired20: 29 }
      ],
    };
  },
  mutations: {
    ADD_INCOME(state, income) {
      state.incomes.push(income);
    },
    ADD_EXPENSE(state, expense) {
      state.expenses.push(expense);
    },
    ADD_GOAL(state, goal) {
      state.goals.push(goal);
    },
  },
  getters: {
    totalIncome(state) {
      return state.incomes.reduce((total, income) => total + parseFloat(income.amount), 0);
    },
    totalExpenses(state) {
      return state.expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    },
    netSavings(state, getters) {
      return getters.totalIncome - getters.totalExpenses;
    },
  },
});

export default store;
