# GCalendarToLine

## 概要
- Google Calendarからイベントを取得し、イベントを重ねないように整形をして、画像としてLineにプッシュする

## 完成した必須要件
- コメントやメモを記入した場合、一緒にLineに送信する
- 対象となる期間の開始、終了時間を設定できる
- 指定した時間に画像とコメントを自動送信される
- 送信されるコメントを編集できる

## 未着手機能
- 定型文設定
- Avatar(アイコン)を表示

## 改善待ち
- 画像描画周り（見た目）

## 開発について
- プロジェクトベース

    The project base was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

- 使っている技術(バージョン)
    - NodeJS v10.7.0
    - NPM 6.1.0
    - Angular5
    - Front -> Angular5
    - Backend -> GraphQL & MongoDB 4.0.0
    - Nginx 1.10.3

- 連携しているサービス
    - Google Calendar API
    - Google OAuth2
    - Line message api

- 開発環境
    - docker, docker-compose
    - `docker-compose up -d` front, server, db全てをローカルから起動。`http://localhost:4200`はFront、`http://localhost:4000/graphql`はサーバーとなります

- プロダクトにデプロイ
    - 設定や事前セットアップなど　
        - app.module.ts の`hostName`を自分のサーバーのドメインに入れ替え、`client_id` はGoogle api コンソールでプロジェクト作成してから取得できる
        - `calendar.service.ts`の`serverhost`、`serverhostHttps`を自分のドメインに変更
        - `server.js`の`hostName`を自分のドメインに変更
        - Google api コンソールでJson形式の認証情報をserver/credentials.jsonにコピーする
    - Nginxをインストール、`tools/configs/nginx-default`をデフォルトの設定ファイルを入れ替え
    - Front `client`に入って`npm install && 
    npm run-script build --prod` ソースの置く場所はnginx-defaultの設定に合わす必要があります。
    - MongoDB インストール・設定などをオフィシャルドキュメントをご参照
    - Server `server`に入って`npm install && node server.js`, 初期起動する場合、googleへのログイン認証を求められます、と、使うAPIが有効担っていないエラーが出る場合があります、これについては提示されたメッセージにしたがって操作すればだいたいOK。
    
