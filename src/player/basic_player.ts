import { Instrument, InstrumentOptions } from "tone/build/esm/instrument/Instrument";
import * as Tone from 'tone';

import { Midi } from "../midi";
import { AcousticGrandPiano } from "../instruments/piano";
import { AbsTempoEventType, MidiEventType, MidiHeaderType, MidiTrackType } from "../types";
import { midi_note } from "../utils";

class PlayerBuffer<T> {
  
  buf : any[];

  current : number = 0;

  constructor(buf : T[]) {
    this.buf = buf
  }

  rest() { this.current = 0; }

  curr() { return this.buf[this.current]; }

  next() { return this.buf[++this.current] }

  prev() {return this.buf[--this.current]}
}

type PlayerState = {
  play  : boolean
  mute  : boolean
  time  : number 
}

/**
 * Basic Player can play Midi objects. Player only implements start and stop functions
 * 
 * @method start - will start the playing midi object from start
 * @method stop - will stop the current playing midi object
 */
export class BasicMidiPlayer {
  midi    : Midi

  players : BasicTrackPlayer[];

  ticker  : number = 0;

  constructor(midi : Midi) {
    this.midi = midi;

    this.players = this.midi.tracks.slice(2, 6).map(_ => new BasicTrackPlayer(midi.header, _))
  }

  async load() {
    for(let i = 0; i < this.players.length; i++) {
      await this.players[i].load();
    }
    return this;
  }

  start() {
    this.players.forEach(_=>_.start())
  }
}

class BasicTrackPlayer {
  header : MidiHeaderType

  track : MidiTrackType

  instrument : Instrument<InstrumentOptions>

  /**
   * Audio Buffer holding render midi note on/off events.
   */
  buffer? : Tone.ToneAudioBuffer;

  /**
   * Playing Buffer hold currently playing notes.
   * 
   * on calling stop all notes in playing_buffer will scheduled to stoped
   */
  playing_buffer : MidiEventType[] = []

  player_state : PlayerState = {
    play : false,
    mute : false,
    time : 0
  }
  
  constructor(header : MidiHeaderType, track : MidiTrackType) {
    this.header = header;
    this.track = track;

    // TODO: Dynamically load intrument from Instrument Name meta event
    this.instrument = new AcousticGrandPiano()

  } 


  async load() {
    // @ts-ignore
    await this.instrument.load()
    console.log("will; loaded");
    this.buffer = await Tone.Offline(()=> {
      var name = "Piano";

			/**  time = 60 / (tempo * resolution ) * delta_time */
			var time : number = 0;

			
			var tempo : AbsTempoEventType = {
				time : 0,
				qbpm : 120,
				secs : 0.500000
			}

			// var secs_per_tick = 60 / (tempo.microsecs * this.header.resolution)
			var ticks = 0;

      this.track.forEach(event => {
				
				ticks += event.delta_time
				time += event.delta_time * tempo.secs / this.header.resolution;

        var offset = 12
				switch(event.subtype) {
					case "note_off": 
						if (event.note_id ) {
							this.instrument.triggerRelease(midi_note(event.note_id).name, time);
						}
						break;
					case "note_on" :
						if ( event.note_id) {
							this.instrument.triggerAttack(midi_note(event.note_id).name, time)
						}
						break;
					case "set_tempo":
						tempo = {
							time,
							qbpm : event.qbpm || 120,
							secs : (event.microsecs || 500000 ) / 1e6
						}
						break;
				}
			})
    }, 300);
    console.log("loaded successfully");
    
    return this
  }

  async start() {
    var player = new Tone.Player(this.buffer).toDestination();
    player.start();
  }
}