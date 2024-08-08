# 汎用的な ActivityPub コンポーネント実装

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

- このプロジェクトでは、TypeScriptを使用する


## ポリシー

### コードポリシー

- if 文は、return や continue、break などの制御文を入れるときだけ1行で書いても良い
- オブジェクトのプロパティ名と値の変数名が同じ時、表記を省略できるが、ここでは省略しない
- 行末のセミコロンは省略する
- インデントは2スペースで1段階取る


## コピーライト

Copyright © 2024 HARMONICOM (Yamakazoo, Hiya, Fussar).  <br>
Released under the MIT license  <br>
https://github.com/HARMONICOM/libactivitypub.ts  <br>
