import type {
  ActorObject,
  BundledActor,
  BundledInstance,
  BundledNote,
  InstanceObject,
  NoteObject,
} from '../ActivityPub'

/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class Module {
  public abstract name: string
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

  public abstract pickNoteObject(host: string): NoteObject | undefined
  public abstract pickActorObject(host: string): ActorObject | undefined
  public abstract pickInstanceObject(host: string): InstanceObject | undefined

  public abstract pickNoteData(): BundledNote | undefined
  public abstract pickActorData(): BundledActor | undefined
  public abstract pickInstanceData(): BundledInstance | undefined
}
