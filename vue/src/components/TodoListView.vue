<!-- Todoリスト一覧表示 -->
<script setup>
const items = JSON.parse(localStorage.getItem("items")) || [];
</script>

<template>
  <div>
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
        <td>{{ item.content }}</td>
        <td>{{ item.limit }}</td>
        <td>{{ item.state.value }}</td>
        <td><button>編集</button></td>
        <td><button>削除</button></td>
      </tr>
    </table>
  </div>
</template>