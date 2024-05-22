<script setup>
  // props
  defineProps({
    text: String,
  });

  // 変数
  const dataTest = "これはデータです。";

  // ディレクティブ
  // v-for 繰り返し
  const fruitsList = [
    { id: 0, name: "りんご" },
    { id: 1, name: "いちご" },
    { id: 2, name: "バナナ" },
  ];

  // v-if
  // v-else
  // v-show
  const number = 5;  // 15
</script>

<template>
  <p>{{ text }}</p>
  <p>{{ dataTest }}</p>
  <ul>
    <li v-for="fruit in fruitsList" :key="fruit.id">{{ fruit.name }}</li>
  </ul>
  <div>
    <p v-if="number < 10">数字は10より小さい</p>
    <p v-else>数字は10より大きいです</p>
  </div>
  <div>
    <p v-show="number < 10">数字は10より小さい (v-showを使用)</p>
  </div>
</template>