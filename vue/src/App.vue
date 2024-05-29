<script setup>
import TodoApp from './components/TodoApp.vue';
// import TestComponent from './components/TestComponent.vue'
// import ChildComponent from './components/TestComponent.vue';
// import { ref } from 'vue';

// TestComponent 子コンポーネントから送られたデータ
// const receiveMessage = ref('');
// const handleMessage = (data) => {
//   receiveMessage.value = data;
// };
</script>

<template>
  <!-- TestComponent -->
  <!-- <div>
    <TestComponent text="propsの練習です。"/>
    <div>
      <child-component @message="handleMessage"></child-component>
      <p>{{ receiveMessage }}</p>
    </div>
  </div> -->

  <div>
    <TodoApp></TodoApp>
  </div>
</template>

<style scoped></style>
