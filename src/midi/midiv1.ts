import { parse } from "../parser";
import { AbsMidiHeaderType, AbsMidiTrackType, AbsTempoEventType, MidiHeaderType, MidiTrackType, AbsMidiNoteType, MidiEventType, Dictionary } from '../types';
import { clone, midi_note } from '../utils';

/*
Class to parse the .mid base64 string.
Midi hold the js object notation of midi binary file.
*/
export class Midiv1 {
	header : MidiHeaderType; // Midi header
	tracks : MidiTrackType[]; // Midi tracks

	// TODO : add support for all type of string
	constructor(src : string) {
		var mjson = parse(src)

		this.header = mjson.header;
		this.tracks = mjson.tracks;
	}

	static parse(src : string) {
		return new Midiv1(src);
	}

	json() {
		return clone({
			header : this.header,
			tracks : this.tracks
		})
	}

	abs() {return new AbsMidiv1(this)}

	/**
	 *  
	 * @param track index of the track
	 * 
	 * @returns array of tempo event messages
	 */
	tempos(track : number) {
		return this.tracks[track].filter( _=> _.subtype === "set_tempo" )
	}
	
	/**
	 * 
	 * @param track index of the track
	 * 
	 * @returns {string | undefined} track name
	 */
	track_name(track : number) { 
		return this.tracks[track].find( _=> _.subtype === "track_name" )?.text
	}

	/**
	 * 
	 * @param track index of the track
	 */
	time_sigs(track : number) { 
		return this.tracks[track].filter( _=> _.subtype === "time_signature" )
	}

	/**
	 * 
	 * @param track index of the track
	 */
	key_sigs(track : number) { 
		this.tracks[track].filter( _=> _.subtype === "key_signature" )
	}

	/**
	 * 
	 * @param track index of the track
	 */
	notes(track : number) {
		this.tracks[track].filter( _=> _.type === "channel" && (
			_.subtype === "note_off" || _.subtype === "note_on"
		))
	}
}


export class AbsMidiv1 {
	header : AbsMidiHeaderType
	tracks  : AbsMidiTrackType[] = []

	constructor(src : Midiv1) {
		this.header = src.header;

		src.tracks.forEach((track, i) => {
			var name = src.track_name(i);
			var notes : AbsMidiNoteType[] = [];
			var events : MidiEventType[] = [];
			var controller = {}
			var tempos : AbsTempoEventType[] = [];

			var timekeeper : Dictionary<MidiEventType> = {}

			/**  time = 60 / (tempo * resolution ) * delta_time */
			var time : number = 0;

			
			var tempo : AbsTempoEventType = {
				time : 0,
				qbpm : 120,
				secs : 0.500000
			}

			// var secs_per_tick = 60 / (tempo.microsecs * this.header.resolution)
			var ticks = 0;

			track.forEach(event => {
				
				ticks += event.delta_time
				time += event.delta_time * tempo.secs / this.header.resolution;
				
				if (event.subtype !== "note_off") {

				}

				switch(event.subtype) {
					case "note_off": 
						if (event.note_id && event.note_id in timekeeper) {
							var note = timekeeper[event.note_id];
							note.time && notes.push(Object.assign(note, {
								time,
								ticks,
								duration : time - note.time,
								velocity : note.velocity || 90,
								...midi_note(event.note_id),
							}))
						}
						break;
					case "note_on" :
						if (typeof event.note_id === "number") {
							timekeeper[event.note_id] = Object.assign(event, {time})
						}
						break;
					case "set_tempo":
						tempo = {
							time,
							qbpm : event.qbpm || 120,
							secs : (event.microsecs || 500000 ) / 1e6
						}
						tempos.push(tempo)
						break;
				}
				if(event.subtype !== "note_off") events.push(event)
			})

			this.tracks.push({
				name : name || `Track-${i}`,
				notes,
				events,
				tempos
			})
		})
	}

	static parse(src : string | Midiv1) {
		if (typeof src === "string") return new AbsMidiv1(Midiv1.parse(src));
		return new AbsMidiv1(src);
	}
}