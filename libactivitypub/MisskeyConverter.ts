import { Converter } from './Base/Converter'
import type { Note } from './MisskeyStore'

export class MisskeyConverter extends Converter {
  constructor() {
    super()
  }

  public async getActorUrl(note: Note) {
    return note.attributedTo
  }

}
