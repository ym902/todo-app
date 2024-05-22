# todo-app
Vue.js、Express.js、PostgreSQLを使用したTODOアプリのリポジトリです。

## 使用技術
- Vue.js
- JavaScript
- Express.js
- TypeScript
- PostgreSQL
- Docker

## 使用方法
1. リポジトリのクローン
```
$ git clone https://github.com/ym902/todo-app.git
```

2. フロントエンドのプロジェクトへ移動
```
$ cd vue
```

3. フロントエンド起動コマンド、起動確認
```
$ npm run serve
```
```
http://localhost:8080/
```

4. バックエンドのプロジェクトへ移動
```
$ cd express
```

5. バックエンド起動コマンド、起動確認
```
$ npm start
```
```
http://localhost:3000/
```
6. データベースをDockerで立ち上げ
```
$ cd todo-app
```
```
$ docker compose up --build -d
```
