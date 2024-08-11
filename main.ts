import { ActivityPub } from './libactivitypub/ActivityPub'
import { LINEAGE_MASTODON, MastodonModule } from './libactivitypub/Mastodon'
import { LINEAGE_MISSKEY, MisskeyModule } from './libactivitypub/Misskey'

// 使い方サンプル
// URLのところは適宜書き換えてください。
// ※MastodonのURLは適当です。そのままだとundefinedになります

// 1. ノートのURLからノート情報を取得して Actor や Instance 等の情報を取得する
// a.Misskey
const note1a = 'https://m.chomechome.jp/notes/9wrkhw0t1b3m10zk'
const ap1a = new ActivityPub()
const software1a = await ActivityPub.checkTargetSoftware(note1a)
if (LINEAGE_MISSKEY.includes(software1a ?? '')) {
  ap1a.setModule(new MisskeyModule())
}
if (typeof ap1a.module.storeNote !== 'undefined') {
  await ap1a.loadAll(note1a)
}
const data1a = ap1a.pickNoteData()
console.log(JSON.stringify(data1a, null, 2))

// b.Mastodon
const note1b = 'https://d.chomechome.jp/@hiya/111578720579533382'
const ap1b = new ActivityPub()
const software1b = await ActivityPub.checkTargetSoftware(note1b)
if (LINEAGE_MASTODON.includes(software1b ?? '')) {
  ap1b.setModule(new MastodonModule())
}
if (typeof ap1b.module.storeNote !== 'undefined') {
  await ap1b.loadAll(note1b)
}
const data1b = ap1b.pickNoteData()
console.log(JSON.stringify(data1b, null, 2))


// 2.DBから取得したノート情報を元に Actor や Instance 等の情報を取得してノート情報を完成させる
// a.Misskey
const note2a = {
  id: 'https://m.chomechome.jp/notes/9wrkhw0t1b3m10zk',
  attributedTo: 'https://m.chomechome.jp/users/9n8xke7mpop30001',
}
const ap2a = new ActivityPub()
const software2a = await ActivityPub.checkTargetSoftware(note2a.id)
if (LINEAGE_MISSKEY.includes(software2a ?? '')) {
  ap2a.setModule(new MisskeyModule())
}
if (typeof ap2a.module.storeNote !== 'undefined') {
  ap2a.module.storeNote(note2a)
  await ap2a.loadStatus(ap2a.module.note.attributedTo)
}
const data2a = ap2a.pickNoteData()
console.log(JSON.stringify(data2a, null, 2))

// b.Mastodon
const note2b = {
  id: 'https://d.chomechome.jp/@hiya/111578720579533382',
  attributedTo: 'https://d.chomechome.jp/users/hiya',
}
const ap2b = new ActivityPub()
const software2b = await ActivityPub.checkTargetSoftware(note2b.id)
if (LINEAGE_MASTODON.includes(software2b ?? '')) {
  ap2b.setModule(new MastodonModule())
}
if (typeof ap2b.module.storeNote !== 'undefined') {
  ap2b.module.storeNote(note2b)
  await ap2b.loadStatus(ap2b.module.note.attributedTo)
}
const data2b = ap2b.pickNoteData()
console.log(JSON.stringify(data2b, null, 2))


// 3.Actor の情報から Instance 等の情報を取得して Actor 情報を完成させる
// a.Misskey
const note3a = {
  id: 'https://m.chomechome.jp/notes/9wrkhw0t1b3m10zk',
  attributedTo: 'https://m.chomechome.jp/users/9n8xke7mpop30001',
}
const ap3a = new ActivityPub()
const software3a = await ActivityPub.checkTargetSoftware(note3a.attributedTo)
if (LINEAGE_MISSKEY.includes(software3a ?? '')) {
  ap3a.setModule(new MisskeyModule())
}
await ap3a.loadStatus(note3a.attributedTo)
const data3a = ap3a.pickActorData()
console.log(JSON.stringify(data3a, null, 2))

// b.Mastodon
const note3b = {
  id: 'https://d.chomechome.jp/@hiya/111578720579533382',
  attributedTo: 'https://d.chomechome.jp/users/hiya',
}
const ap3b = new ActivityPub()
const software3b = await ActivityPub.checkTargetSoftware(note3b.attributedTo)
if (LINEAGE_MASTODON.includes(software3b ?? '')) {
  ap3b.setModule(new MisskeyModule())
}
await ap3b.loadStatus(note3b.attributedTo)
const data3b = ap3b.pickActorData()
console.log(JSON.stringify(data3b, null, 2))
