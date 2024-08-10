import { ActivityPub, LINEAGE_MISSKEY } from './libactivitypub/ActivityPub'
import { MisskeyModule } from './libactivitypub/Misskey'

// 使い方
// 1.DBから取得したノート情報を元にActorやInstance等の情報を取得してノート情報を完成させる
const note1 = {
  id: 'https://m.chomechome.jp/notes/9womjui31b3m0ykt',
  attributedTo: 'https://m.chomechome.jp/users/9n8xke7mpop30001',
}

const ap1 = new ActivityPub()
const software1 = await ActivityPub.checkTargetSoftware(note1.id)
if (LINEAGE_MISSKEY.includes(software1 ?? '')) {
  ap1.setModule(new MisskeyModule())
}
if (typeof ap1.module.storeNote !== 'undefined') {
  ap1.module.storeNote(note1)
  await ap1.loadStatus(ap1.module.note.attributedTo)
}
const data1 = ap1.pickNoteData()
console.log(data1)


// 2.Actorの情報からInstance等の情報を取得してActor情報を完成させる
const note2 = {
  id: 'https://m.chomechome.jp/notes/9womjui31b3m0ykt',
  attributedTo: 'https://m.chomechome.jp/users/9n8xke7mpop30001',
}

const ap2 = new ActivityPub()
const software2 = await ActivityPub.checkTargetSoftware(note2.attributedTo)
if (LINEAGE_MISSKEY.includes(software2 ?? '')) {
  ap2.setModule(new MisskeyModule())
}
await ap2.loadStatus(note2.attributedTo)
const data2 = ap1.pickActorData()
console.log(data2)
