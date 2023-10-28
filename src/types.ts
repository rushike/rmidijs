export type BufType = Uint8Array | Uint16Array | Uint32Array | number[]

export type MidiHeaderType = {
  "format": number,
  "ticks" : number,
  "tracks": number,
}

export type MidiTrackType = MidiEventType[]

export type MidiEventType = {
  type     : "channel" | "meta" | "sys_ex" | "divided_sys_ex",
  subtype? : 'sequence_number' | 'text' | 'copyright_notice' | 'track_name' | 'instrument_name' | 'lyrics' | 'marker' | 'cue_point' | 'midi_channel_prefix' | 'end_of_track' | 'set_tempo' | 'smpte_offset' | 'time_signature' | 'key_signature' | 'sequencerSpecific' | 'unknown' | "note_off" | "note_on" 
  text?    : string
}