export abstract class Loader {
  constructor() {
  }
  public abstract getNote(url: string): any
  public abstract getActor(url: string): any
  public abstract getNodeInfo(host: string): any
  public abstract getManifest(host: string): any
}
