import type { FormedActor, FormedInstance, FormedNote } from '../ActivityPub'

/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class Module {
  public abstract note: any
  public abstract actor: any
  public abstract nodeinfo: any
  public abstract manifest: any

  constructor() {
  }

  public abstract getNote(url: string): any
  public abstract getActor(url: string): any
  public abstract getNodeInfo(host: string): any
  public abstract getManifest(host: string): any

  public abstract storeNote(data: any): void
  public abstract storeActor(data: any): void
  public abstract storeNodeInfo(data: any): void
  public abstract storeManifest(data: any): void

  public abstract pickNoteData(): FormedNote | undefined
  public abstract pickActorData(): FormedActor | undefined
  public abstract pickInstanceData(): FormedInstance | undefined
}
