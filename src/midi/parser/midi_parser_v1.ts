import { Reader } from "../../reader";
import { MidiHeaderType, MidiTrackType } from "../../types";
import { is_equal } from "../../utils";
import { MidiBuffer } from "../buffer";

export function midi_parser_v1(src : string | Uint8Array) {
	var last_event_type_byte : any;

	var ticks = 0;

	function read_chunk(buf : MidiBuffer) {
		var id = buf.read(4);
		var length = buf.read_int32();
		return {
			'id': id,
			'length': length,
			'data': buf.read(length)
		};
	}

	
	function read_event(buf : MidiBuffer) {
		var event : any = {};
		event.delta_time = buf.read_varint();
		ticks += event.delta_time;
		event.ticks = ticks;
		var event_type_byte = buf.read_int8();
		if ((event_type_byte & 0xf0) == 0xf0) {
			/* system / meta event */
			if (event_type_byte == 0xff) {
				/* meta event */
				event.type = 'meta';
				var subtype_byte = buf.read_int8();
				var length = buf.read_varint();
				switch(subtype_byte) {
					case 0x00:
						event.subtype = 'sequence_number';
						if (length != 2) throw "Expected length for sequence_number event is 2, got " + length;
						event.number = buf.read_int16();
						return event;
					case 0x01:
						event.subtype = 'text';
						event.text = buf.read(length);
						return event;
					case 0x02:
						event.subtype = 'copyright_notice';
						event.text = buf.read(length);
						return event;
					case 0x03:
						event.subtype = 'track_name';
						event.text = buf.read(length);
						return event;
					case 0x04:
						event.subtype = 'instrument_name';
						event.text = buf.read(length);
						return event;
					case 0x05:
						event.subtype = 'lyrics';
						event.text = buf.read(length);
						return event;
					case 0x06:
						event.subtype = 'marker';
						event.text = buf.read(length);
						return event;
					case 0x07:
						event.subtype = 'cue_point';
						event.text = buf.read(length);
						return event;
					case 0x20:
						event.subtype = 'midi_channel_prefix';
						if (length != 1) throw "Expected length for midi_channel_prefix event is 1, got " + length;
						event.channel = buf.read_int8();
						return event;
					case 0x2f:
						event.subtype = 'end_of_track';
						if (length != 0) throw "Expected length for end_of_track event is 0, got " + length;
						return event;
					case 0x51:
						event.subtype = 'set_tempo';
						if (length != 3) throw "Expected length for set_tempo event is 3, got " + length;
						event.microsecondsPerBeat = (
							(buf.read_int8() << 16)
							+ (buf.read_int8() << 8)
							+ buf.read_int8()
						)
						return event;
					case 0x54:
						event.subtype = 'smpte_offset';
						if (length != 5) throw "Expected length for smpte_offset event is 5, got " + length;
						var hourByte = buf.read_int8();
						event.frameRate = {
							0x00: 24, 0x20: 25, 0x40: 29, 0x60: 30
						}[hourByte & 0x60];
						event.hour = hourByte & 0x1f;
						event.min = buf.read_int8();
						event.sec = buf.read_int8();
						event.frame = buf.read_int8();
						event.subframe = buf.read_int8();
						return event;
					case 0x58:
						event.subtype = 'time_signature';
						if (length != 4) throw "Expected length for time_signature event is 4, got " + length;
						event.numerator = buf.read_int8();
						event.denominator = Math.pow(2, buf.read_int8());
						event.metronome = buf.read_int8();
						event.thirtyseconds = buf.read_int8();
						return event;
					case 0x59:
						event.subtype = 'key_signature';
						if (length != 2) throw "Expected length for key_signature event is 2, got " + length;
						event.key = buf.read_int8(true);
						event.scale = buf.read_int8();
						return event;
					case 0x7f:
						event.subtype = 'sequencer_specific';
						event.data = buf.read(length);
						return event;
					default:
						// console.log("Unrecognised meta event subtype: " + subtypeByte);
						event.subtype = 'unknown'
						event.data = buf.read(length);
						return event;
				}
				event.data = buf.read(length);
				return event;
			} else if (event_type_byte == 0xf0) {
				event.type = 'sys_ex';
				var length = buf.read_varint();
				event.data = buf.read(length);
				return event;
			} else if (event_type_byte == 0xf7) {
				event.type = 'divided_sys_ex';
				var length = buf.read_varint();
				event.data = buf.read(length);
				return event;
			} else {
				throw "Unrecognised MIDI event type byte: " + event_type_byte;
			}
		} else {
			/* channel event */
			var param1;
			if ((event_type_byte & 0x80) == 0) {
				/* running status - reuse lastEventTypeByte as the event type.
					eventTypeByte is actually the first parameter
				*/
				param1 = event_type_byte;
				event_type_byte = last_event_type_byte;
			} else {
				param1 = buf.read_int8();
				last_event_type_byte = event_type_byte;
			}
			var eventType = event_type_byte >> 4;
			event.channel = event_type_byte & 0x0f;
			event.type = 'channel';
			switch (eventType) {
				case 0x08:
					event.subtype = 'note_off';
					event.noteNumber = param1;
					event.velocity = buf.read_int8();
					return event;
				case 0x09:
					event.noteNumber = param1;
					event.velocity = buf.read_int8();
					if (event.velocity == 0) {
						event.subtype = 'note_off';
					} else {
						event.subtype = 'note_on';
					}
					return event;
				case 0x0a:
					event.subtype = 'note_after_touch';
					event.noteNumber = param1;
					event.amount = buf.read_int8();
					return event;
				case 0x0b:
					event.subtype = 'controller';
					event.controllerType = param1;
					event.value = buf.read_int8();
					return event;
				case 0x0c:
					event.subtype = 'programChange';
					event.programNumber = param1;
					return event;
				case 0x0d:
					event.subtype = 'channel_after_touch';
					event.amount = param1;
					return event;
				case 0x0e:
					event.subtype = 'pitch_bend';
					event.value = param1 + (buf.read_int8() << 7);
					return event;
				default:
					throw "Unrecognised MIDI event type: " + eventType
					/* 
					console.log("Unrecognised MIDI event type: " + eventType);
					stream.read_int8();
					event.subtype = 'unknown';
					return event;
					*/
			}
		}
	}
  
  function parse () {
		var data = src;

		if (typeof data === 'string') data = Reader.read_base64(data);

    var stream = new MidiBuffer(data);
    var header_chunk = read_chunk(stream);
    if (!is_equal(header_chunk.id, new TextEncoder().encode("MThd")) || header_chunk.length != 6) {
      throw `Bad .mid file - header_chunk not found `;
    }
		
		var header_buffer = new MidiBuffer(header_chunk.data);
    var format = header_buffer.read_int16();
		
    //@ts-ignore
		var count = header_buffer.read_int16();
    var time_division = header_buffer.read_int16();
    var ticks;
    if (time_division & 0x8000) {
      throw "Expressing time division in SMTPE frames is not supported yet"
    } else {
      ticks = time_division;
    }
    var header : MidiHeaderType = {
      'format': format,
      'tracks': count,
      'ticks': ticks
    };

		var tracks : MidiTrackType[] = [];
	
    for (var i = 0; i < header.tracks; i++) {
      tracks[i] = [];
      var track_chunk = read_chunk(stream);
      if (!is_equal(track_chunk.id, new TextEncoder().encode('MTrk'))) {
        throw "Unexpected chunk - expected MTrk, got "+ track_chunk.id;
      }
      var track_buffer = new MidiBuffer(track_chunk.data);
      while (!track_buffer.eof()) {
        var event = read_event(track_buffer);
        tracks[i].push(event);
        //console.log(event);
      }
    }

		return {
			header,
			tracks
		}
  }

	return parse();
}