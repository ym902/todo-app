<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated } from 'vue';
import { defineEmits } from 'vue';

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

  // ライフサイクルフック
  console.log("beforeCreate フック：コンポーネントが初期化される直前");
  console.log("created フック：コンポーネントが初期化された直後");
  onBeforeMount(() => {
    console.log("beforeMount フック：DOMにマウントされる直前");
  });
  onMounted(() => {
    console.log("mounted フック：DOMにマウントされた直後");  // 画面を描画した時点でここまでが実行される
  });
  onBeforeUpdate(() => {
    console.log("beforeUpdate フック：コンポーネントが再描画される直前");  // ボタンクリックで実行される
  });
  onUpdated(() => {
    console.log("updated フック：コンポーネントが再描画された直後");  // ボタンクリックで実行される
  });
  // データをrefでラップ
  const count =ref(0);
  const incrementCount = () => {
    count.value++;
  };

  // emit
  // 子コンポーネント
  const emit = defineEmits(["message"]);
  const sendMessage = () => {
    emit("message", "子コンポーネントから送られたデータ");
  };
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

  <div>
    <p>カウント：{{ count }}</p>
    <button @click="incrementCount">カウントアップ</button>
  </div>

  <button @click="sendMessage">メッセージを送る</button>
</template>