export type BufType = Uint8Array | Uint16Array | Uint32Array | number[]

export interface Dictionary<T> {
  [key : string] : T
}

export type MidiEventTypeList = "channel" | "meta" | "sys_ex" | "divided_sys_ex"

export type MidiEventSubtypeList = "sequence_number" | "text" | "copyright_notice" | "track_name" | "instrument_name" | "lyrics" | "marker" | "cue_point" | "midi_channel_prefix" | "end_of_track" | "set_tempo" | "smpte_offset" | "time_signature" | "key_signature" | "sequencer_specific" | "unknown" | "note_off" | "note_on" | "note_after_touch" | "controller" | "program_change" | "channel_after_touch" | "pitch_bend"

export type MidiControllerEventTypeList = "blank_select" | "modulation" | "breath_controller" | "foot_controller" | "portamento_time" | "data_entry" | "main_volume" | "balance" | "pan" | "expression_controller" | "effect_control_0" | "effect_control_1" | "general_purpose_controller_0" | "general_purpose_controller_1" | "general_purpose_controller_2" | "general_purpose_controller_3" | "LSB_for_controller_0" | "LSB_for_controller_1" | "LSB_for_controller_2" | "LSB_for_controller_3" | "LSB_for_controller_4" | "LSB_for_controller_5" | "LSB_for_controller_6" | "LSB_for_controller_7" | "LSB_for_controller_8" | "LSB_for_controller_9" | "LSB_for_controller_10" | "LSB_for_controller_11" | "LSB_for_controller_12" | "LSB_for_controller_13" | "LSB_for_controller_14" | "LSB_for_controller_15" | "LSB_for_controller_16" | "LSB_for_controller_17" | "LSB_for_controller_18" | "LSB_for_controller_19" | "LSB_for_controller_20" | "LSB_for_controller_21" | "LSB_for_controller_22" | "LSB_for_controller_23" | "LSB_for_controller_24" | "LSB_for_controller_25" | "LSB_for_controller_26" | "LSB_for_controller_27" | "LSB_for_controller_28" | "LSB_for_controller_29" | "LSB_for_controller_30" | "LSB_for_controller_31" | "damper_pedal" | "portamento" | "sostenuto" | "soft_pedal" | "legato_footswitch" | "hold" | "sound_controller_0" | "sound_controller_1" | "sound_controller_2" | "sound_controller_3" | "sound_controller_4" | "sound_controller_5" | "sound_controller_6" | "sound_controller_7" | "sound_controller_8" | "sound_controller_9" | "post_general_purpose_controller_0" | "post_general_purpose_controller_1" | "post_general_purpose_controller_2" | "post_general_purpose_controller_3" | "portamento_control" | "effects_depth_0" | "effects_depth_1" | "effects_depth_2" | "effects_depth_3" | "effects_depth_4" | "data_increment" | "data_decrement" | "nonreg_param_num_lsb" | "nonreg_param_num_msb" | "reg_param_num_lsb" | "reg_param_num_msb" | "mode_messages_0" | "mode_messages_1" | "mode_messages_2" | "mode_messages_3" | "mode_messages_4" | "mode_messages_5" | "mode_messages_6"

export type MidiHeaderType = {
  "format"     : number
  "resolution" : number
  "tracks"     : number
}

export type MidiTrackType = MidiEventType[]

export type MidiEventType = {
  ticks            : number
  delta_time       : number
  type             : MidiEventTypeList
  subtype          : MidiEventSubtypeList
  time?            : number
  note_id?         : number
  velocity?        : number
  amount?          : number
  value?           : number
  number?          : number
  text?            : string
  qbpm?            : number
  microsecs?       : number
  channel?         : number
  controller_type? : number
  program_number?  : number
  data?            : Uint8Array
  key?             : number
  scale?           : number
  frame_rate?      : number
  hour?            : number
  min?             : number
  sec?             : number
  frame?           : number
  subframe?        : number
  numerator?       : number
  denominator?     : number
  metronome?       : number
  thirtyseconds?   : number
}

export type MidiNoteType = {
  delta_time : number
  ticks      : number
  time       : number
  note_id    : number
  velocity   : number
}

export type AbsMidiHeaderType = { 
  "format"     : number
  "resolution" : number
  "tracks"     : number

}

export type AbsMidiTrackType = {
  name       : string  // track name if passed
  tempos     : AbsTempoEventType[]
  time_sigs? : AbsTimeSigEventType[]
  notes      : AbsMidiNoteType[]
  events     : MidiEventType[]
  controller?: AbsControllerEventType[]
}

export type AbsTimeSigEventType = {
  time  : number
  ticks : number
  nn    : number
  dd    : number
  cc    : number
  bb    : number
}


export type AbsControllerEventType  = {
  [K in MidiControllerEventTypeList]? : {
    time : number
    ticks : number
    value : string
  }
}

/**
  * time  : number // in second 
  *
  *  qbpm  : number // in qbp 
  *
  *  microsecs : number // in microseconds per quater note  
  */
export type AbsTempoEventType = {
  time  : number // in seconds 
  qbpm  : number // in qbpm
  secs : number // in seconds per quater note
}

export type AbsMidiNoteType = {
  time     : number // in seconds
  ticks    : number // time in ticks
  id       : number // midi note id
  name     : string // midi note name , like C4, Bb5 etc.
  octave   : number // number of octave like 4, 5 etc.
  velocity : number // how loud / hard the note is played, normalized 0 - 1
  duration : number // note length in seconds
}