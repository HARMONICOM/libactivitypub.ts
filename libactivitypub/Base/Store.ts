export abstract class Store {
  public abstract note: any
  public abstract actor: any
  public abstract nodeinfo: any
  public abstract manifest: any

  constructor() {
  }
  public abstract storeNote(data: any): void
  public abstract storeActor(data: any): void
  public abstract storeNodeInfo(data: any): void
  public abstract storeManifest(data: any): void
}
