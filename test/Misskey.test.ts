import { describe, expect, jest, test } from 'bun:test'
import { ActivityPub } from '../libactivitypub/ActivityPub'
import { MisskeyModule } from '../libactivitypub/Misskey'

global.fetch = jest.fn((url: string) => {
  let result = {}
  switch (url) {
    case 'https://a.example.com/.well-known/nodeinfo': {
      result = {
        links: [
          {
            href: 'https://b.example.com/',
          },
        ],
      }
      break
    }
    case 'https://b.example.com/': {
      result = {
        software: {
          name: 'misskey',
        },
        metadata: {
          nodeName: 'テスト',
        },
      }
      break
    }
    case 'https://c.example.com/notes/9womjui31b3m0ykt': {
      result = {
        'id': 'https://c.example.com/notes/9womjui31b3m0ykt',
        'type': 'Note',
      }
      break
    }
    case 'https://d.example.com/users/9n8xke7mpop30001': {
      result = {
        'type': 'Person',
        'id': 'https://d.example.com/users/9n8xke7mpop30001',
      }
      break
    }
    case 'https://e.example.com//users/9n8xke7mpop30001': {
      result = {
        'type': 'Person',
        'id': 'https://e.example.com/users/9n8xke7mpop30001',
        'url': 'https://e.example.com/@hoge',
        'preferredUsername': 'hoge',
        'name': 'ほげ:test1:',
      }
      break
    }
    case 'https://e.example.com/.well-known/nodeinfo': {
      result = {
        links: [
          {
            href: 'https://e.example.com/nodeinfo/2.1',
          },
        ],
      }
      break
    }
    case 'https://e.example.com/nodeinfo/2.1': {
      result = {
        software: {
          name: 'misskey',
        },
        metadata: {
          nodeName: 'テスト',
        },
      }
      break
    }
    case 'https://e.example.com/manifest.json': {
      result = {
        'short_name': 'ほげ',
        'name': 'ほげほげ:test2:',
        'start_url': '/',
        'display': 'standalone',
        'background_color': '#313a42',
        'theme_color': '#ff52d4',
        'icons': [
          {
            'src': '/static-assets/splash_192.png',
            'sizes': '192x192',
            'type': 'image/png',
            'purpose': 'maskable',
          },
          {
            'src': '/static-assets/splash_512.png',
            'sizes': '512x512',
            'type': 'image/png',
            'purpose': 'maskable',
          },
          {
            'src': '/static-assets/splash.png',
            'sizes': '300x300',
            'type': 'image/png',
            'purpose': 'any',
          },
        ],
      }
      break
    }
  }
  return Promise.resolve({
    json: () => Promise.resolve(result),
  })
}) as jest.Mock

describe('ActivityPub のテスト', () => {
  test('ActivityPub.checkTargetSoftware はサーバーからソフトウェア名を取得する', async () => {
    const response = await ActivityPub.checkTargetSoftware('https://a.example.com/')

    expect(response).toEqual('misskey')
  })

  test('ActivityPub オブジェクトに Misskey モジュールを読み込む', async () => {
    const ap = new ActivityPub()
    ap.setModule(new MisskeyModule())

    expect(ap).toBeInstanceOf(ActivityPub)
    expect(ap.module).toBeInstanceOf(MisskeyModule)
  })

  test('ActivityPub オブジェクトで loadNote を使う', async () => {
    const ap = new ActivityPub()
    ap.setModule(new MisskeyModule())
    await ap.loadNote('https://c.example.com/notes/9womjui31b3m0ykt')

    expect(ap.module.note.id).toEqual('https://c.example.com/notes/9womjui31b3m0ykt')
    expect(ap.module.note.type).toEqual('Note')
  })

  test('ActivityPub オブジェクトで loadActor を使う', async () => {
    const ap = new ActivityPub()
    ap.setModule(new MisskeyModule())
    await ap.loadActor('https://d.example.com/users/9n8xke7mpop30001')

    expect(ap.module.actor.id).toEqual('https://d.example.com/users/9n8xke7mpop30001')
    expect(ap.module.actor.type).toEqual('Person')
  })

  test('ActivityPub オブジェクトで loadNodeInfo を使う', async () => {
    const ap = new ActivityPub()
    ap.setModule(new MisskeyModule())
    await ap.loadNodeInfo('https://a.example.com//users/9n8xke7mpop30001')

    expect(ap.module.nodeinfo.software.name).toEqual('misskey')
    expect(ap.module.nodeinfo.metadata.nodeName).toEqual('テスト')
  })

  test('ActivityPub オブジェクトで loadManifest を使う', async () => {
    const ap = new ActivityPub()
    ap.setModule(new MisskeyModule())
    await ap.loadManifest('https://e.example.com//users/9n8xke7mpop30001')

    expect(ap.module.manifest.name).toEqual('ほげほげ:test2:')
    expect(ap.module.manifest.theme_color).toEqual('#ff52d4')
  })

  test('ActivityPub オブジェクトで loadStatus して pickActorData する', async () => {
    const ap = new ActivityPub()
    ap.setModule(new MisskeyModule())
    await ap.loadStatus('https://e.example.com//users/9n8xke7mpop30001')
    const data = ap.pickActorData()

    expect(data?.actor.formedName).toEqual('ほげ<img src="https://e.example.com/emoji/test1.webp" alt="test1" class="emoji">')
    expect(data?.instance.formedName).toEqual('ほげほげ<img src="https://e.example.com/emoji/test2.webp" alt="test2" class="emoji">')
  })
})
