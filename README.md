# 汎用的な ActivityPub 実装

## はじめに

ActivityPub は、主に SNS のデータをやり取りするために作られた規格です。

https://www.w3.org/TR/activitypub/

現在 ActivityPub を取り巻く環境としては、Fediverse (Federate + Universe) と呼ばれる SNS ネットワークコミュニティにおいて使用され、Mastodon や Misskey など多数のプロダクトが存在しています。

一方で、ライブラリとして使える実装があまり無いためか、新しく参入しづらいという問題や、プロダクトごとに実装に差があるという問題を抱えています。

このプロジェクトでは、新しく ActivityPub の実装をする方の参考になり、プロダクトごとの差異を埋める簡単に取り扱えるモジュールの作成を進めていきます。


## このプロジェクトの目的

このプロジェクトは下記の目的で作成されました。

- 仕様書を元にした実装例として展開し、資料にする
- ActivityPub 実装の新規参入の手助けをする
- 様々なプロダクトの差異を埋め、統一したAPI実装で Activity の操作ができるようにする
- 様々なプロダクトで ActivityPub 実装の共通化を図る


## このプロジェクトについて

- このプロジェクトでは、TypeScript を使用する
- このプロジェクトでは、TypeScript のランタイムとして bun を使用しているが、実際の使用時はおまかせ

### ポリシー

#### コードポリシー

- if 文は、return や continue、break などの制御文を入れるときだけ1行で書いても良い
- オブジェクトのプロパティ名と値の変数名が同じ場合に表記を省略できるが、ここでは省略しない
- 行末のセミコロンは省略する
- ケツカンマは複数行のとき必要
- クォーテーションはダブルを使わない
- 1段階のインデントは2スペースで取る
- コードはなるべく例外を吐かないで undefined や null を返すようにする
- 最後の行は空行とする
- 多少冗長でも読みやすさや書きやすさ、グループ化を重視した書き方をすることがある
- できるだけ行間は空けないようにするが、見やすさやグループ化を重視して空けることもある
- 変数・プロパティ・関数等の並び順は、特に順番に意味が無ければアルファベット順にする
- 発生したエラーを握りつぶすために try～catch 構文を使うことがあります
- Lint とフォーマットを両方とも ESLint で対応(Prettierは使っていない)
- テストを書く。ただし、要点だけ押さえられればいいのであまり細部まで厳密に描く必要はない
- VSCodeでのコーディングを標準にする
- editorconfigを有効にする

#### 設計ポリシー

- データ取得の際の基本的な流れとしては、以下のような構成となる
    - インスタンス `→ 取得部 → 保管部 → 変換部 → 出力部 →` 各種プロダクト
- 取得部は、各インスタンスから ActivityPub のデータを取得する fetch 部になる
- 保管部は、取得した ActivityPub のデータを整理して保管しておく部分である
- 変換部は、保管している ActivityPub のデータを特定の書式に変換する部分である
- 出力部は、変換された内容を返す部分である

上記の取得部・保管部・変換部は、各インスタンスのプロダクト個別のものを用意する。<br>
例）Mastodon 用・Misskey 用、など


## 利用方法

利用する際は、当リポジトリを clone してください。

当リポジトリのサンプルファイルを直接実行する場合は、Bun を使って実行してください。
```sh
bun install
bun run dev
```
main.ts にサンプルコードがありますのでご覧ください。

実際に組み込んで使用する場合は、libactivitypub ディレクトリをプロダクトに組み込んでください。

資料としての意味が無くなってしまうので、今のところパッケージとしての提供はしません。


## 開発手順

当リポジトリのファイルを修正してプルリクを出す場合は、下記の手順を行ってください。

1. clone
2. 作業ブランチの作成
3. 作業ブランチで実装
4. テストの実装
5. lint、format
    ```sh
    bun run lint  # 省略可
    bun run format
    ```
6. test
    ```sh
    bun run test
    ```
7. 作業ブランチを commit ＆ push
8. develop ブランチを対象に作業ブランチをマージリクエスト
9. レビューを受ける(主にオーナーから)
10. develop ブランチに squash マージ
11. main ブランチに 3 way マージ
12. リリースタグをつける(主にオーナー対応)


## コピーライト

Copyright © 2024 HARMONICOM (Yamakazoo, Hiya, Fussar).  <br>
Released under the MIT license  <br>
https://github.com/HARMONICOM/libactivitypub.ts  <br>
