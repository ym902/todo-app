<!-- 入力フォーム -->
<script setup>
import { ref } from 'vue';
import { statuses } from '../const/statuses';

const input = ref("");
const inputDate = ref("");
const isErrMsg = ref(false);

// 送信ボタンをクリックしたときの処理
function onSubmitForm(event) {
  // console.log(input.value);

  // タスク・期限の入力が空だったときのバリデーション
  if (input.value=="" || inputDate.value=="") {
    // エラーメッセージ
    isErrMsg.value = true;
    // リロードを防ぐ(エラーメッセージをずっと表示しておく)
    event.preventDefault();
    return;
  }

  // DBにデータがないときのために空の配列を宣言しておく → pushがエラーになってしまうため
  const items = JSON.parse(localStorage.getItem("items")) || [];

  // 保存するタスクのオブジェクト
  const newItem = {
    id: items.length,
    content: input.value,
    limit: inputDate.value,
    state: statuses.NOT_START,
    onEnd: false,
  };

  items.push(newItem);

  localStorage.setItem("items", JSON.stringify(items));
};
</script>

<template>
  <div>
    <p v-if="isErrMsg">タスク・期限を両方入力してください。</p>
    <form @submit="onSubmitForm">
      <label>やること<input type="text" v-model="input" /></label>
      <label>期限<input type="date" v-model="inputDate" /></label>
      <input type="submit" value="登録" />
    </form>
  </div>
</template>