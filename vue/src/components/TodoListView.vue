<!-- Todoリスト一覧表示 -->
<script setup>
import { ref } from 'vue';
import { statuses } from '../const/statuses';

let items = ref(JSON.parse(localStorage.getItem("items")) || []);
let inputContent = ref();  // タスクの内容
let inputLimit = ref();  // タスクの期限
let inputState = ref();  // タスクのステータス

// 編集ボタンをクリックしたときの処理 onEditの値をtrueにする
function onEdit(id) {
  inputContent.value = items.value[id].content;
  inputLimit.value = items.value[id].limit;
  inputState.value = items.value[id].state;
  
  // refで宣言した値にアクセスするために .value が必要
  items.value[id].onEdit = true;
};

// タスクの更新
let isErrMsg = ref(false);

function onUpdate(id) {
  // エラーメッセージ
  if (inputContent.value == "" || inputLimit.value == "") {
    isErrMsg.value = true;
    return;
  }

  // タスクの上書き
  const newItem = {
    id: id,
    content: inputContent.value,
    limit: inputLimit.value,
    state: inputState.value,
    onEdit: false,
  };

  items.value.splice(id, 1, newItem);

  localStorage.setItem("items", JSON.stringify(items.value));
}

// タスクの削除
// 削除ボタンモーダルの処理
let isShowModal = ref(false);
let deleteItemId = '';  // 削除対象のItemのID
let deleteItemContent = ref(); // 削除対象のItemの内容

function showDeleteModal(id) {
  isShowModal.value = true;
  deleteItemId = id;
  deleteItemContent = items.value[id].content;
}

// モーダルで「はい」をクリック
function onDeleteItem(id) {
  // タスクを削除する処理
  // 対象はdeleteItemId
  items.value.splice(deleteItemId, 1);

  // IDを振り直す(削除されたIDがあっても番号を連番になるようにする)
  items.value = items.value.map((item, index) => ({
    id: index,
    content: item.content,
    limit: item.limit,
    state: item.state,
    onEdit: item.onEdit,
  }));

  localStorage.setItem("items", JSON.stringify(items.value));

  isShowModal.value = false;
}

// モーダルで「キャンセル」をクリック
function onHideModal() {
  isShowModal.value = false;
}
</script>

<template>
  <div>
    <p v-if="isErrMsg">タスク・期限を両方入力してください。</p>
    <table>
      <!-- テーブルヘッダー -->
      <tr>
        <th class="th-id">ID</th>
        <th class="th-value">やること</th>
        <th class="th-limit">期限</th>
        <th class="th-status">状態</th>
        <th class="th-edit">編集</th>
        <th class="th-delete">削除</th>
      </tr>

      <!-- タスク一覧 -->
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          <span v-if="!item.onEdit">{{ item.content }}</span>
          <input v-else v-model="inputContent" type="text" />
        </td>
        <td>
          <span v-if="!item.onEdit">{{ item.limit }}</span>
          <input v-else v-model="inputLimit" type="date" />
        </td>
        <td>
          <span v-if="!item.onEdit">{{ item.state.value }}</span>
          <select v-else v-model="inputState">
            <option
              v-for="state in statuses"
              :key="state.id"
              :value="state"
              :selected="state.id == item.state.id"
            >
              {{ state.value }}
            </option>
          </select>
        </td>
        <td>
          <button v-if="!item.onEdit" @click="onEdit(item.id)">編集</button>
          <button v-else @click="onUpdate(item.id)">完了</button>
        </td>
        <td><button @click="showDeleteModal(item.id)">削除</button></td>
      </tr>
    </table>
  </div>

  <!-- 削除ボタンのモーダル -->
  <div v-if="isShowModal" class="modal">
    <div class="modal-content">
      <p>「{{deleteItemContent}}」を削除してもよろしいですか？</p>
      <button @click="onDeleteItem()">はい</button>
      <button @click="onHideModal()">キャンセル</button>
    </div>
  </div>
</template>