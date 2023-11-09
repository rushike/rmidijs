import * as Tone from "tone"
import { acoustic_grand_piano } from "../soundfont/acoustic_grand_piano-ogg"
import { sleep } from "../utils";


export class AcousticGrandPiano extends Tone.Sampler {

  constructor() {

    super({ // loading sampler with Acoustic Grand Piano sound.
      urls : acoustic_grand_piano,
      onload : () =>{}
    })

    this.toDestination(); 
  }

  async load() : Promise<this>{
    while(!this.loaded) await sleep(100);
    return this
  }

  async play(note : any) {
    this.triggerAttackRelease(
      note.name,
      note.duration,
      note.time + Tone.now() + 0.5,
      note.velocity
    )
  }
}