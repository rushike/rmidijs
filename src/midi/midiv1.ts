import {z} from "zod"


import { parse } from "../parser";
import { MidiHeaderType, MidiTrackType } from "../types";
import { clone } from "../utils";


const MidiJsonSchema = z.object({
	"header":  z.object({
		"format": z.number(),
		"ticks": z.number(),
		"tracks": z.number(),
	}),
	"duration" : z.number(),
	"tracks" : z.array(
		z.array(
			z.object({

			})
		)
	)
})

export type MidiJson = z.infer<typeof MidiJsonSchema>

/*
class to parse the .mid base64 string
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