import { ActivityPub } from "./libactivitypub/ActivityPub";
import { MisskeyModule } from './libactivitypub/Misskey'

// 使い方
// 1.DBから取得したノート情報を元にActorやInstance等の情報を取得してノート情報を完成させる
const note = {
  url: 'hoge'
}

const software = await ActivityPub.checkTargetSoftware(note.url)
const ap = new ActivityPub()
if (software === 'misskey') {
  ap.setModule(new MisskeyModule())
}
if (typeof ap.module.storeNote !== 'undefined') {
  ap.module.storeNote(note)
}


// 2.Actorの情報からInstance等の情報を取得してActor情報を完成させる
