import { BufType } from "../types";
import { masked_number } from '../utils';

export class MidiBuffer {
  position = 0;
  data : Uint8Array;

  constructor(data : Uint8Array) {
    this.data = data;
  }
	
	read(length : number) {
    this.position += length;
    return this.data.subarray(this.position - length , this.position)
	}
	
	/* read a big-endian 32-bit integer */
	read_int32() {
		this.position += 4;
		return masked_number(this.data.subarray(this.position - 4, this.position), 0xFF)
	}

	/* read a big-endian 16-bit integer */
	read_int16() {
		this.position += 2;
		return masked_number(this.data.subarray(this.position - 2, this.position), 0xFF)
	}
	
	/* read an 8-bit integer */
	read_int8(signed : boolean = false) {
    this.position += 1;
    var result = this.data[this.position - 1]
		if (signed && result > 127) return result -= 256;
		return result;
	}
	
	eof() {
		return this.position >= this.data.length;
	}
	
  /**
	* var_int process the variable length number from `start` position.
  * It will panic if number exceed u32 int.
  * 
  * ## Midi Var Number Format
  * Strategy used is based on delta time encoding in MIDI messages
  * Last 7 bits in each byte will carry info, 
  * 1 bits of every byte is set to 1 expect 1 bit of last byte is set to 0
  * 
  * e.g. 
  * 
  * | 8 bytes number| Variable Length encoding |
  * |---------------|--------------------------|
  * | 00000040      |    40                    |
  * | 0000007F	    |    7F                    |
  * | 00000080	    |    81 00                 |
  * | 00002000	    |    C0 00                 |
  * | 00003FFF	    |    FF 7F                 |
  * | 00004000	    |    81 80 00              |
  * | 00100000	    |    C0 80 00              |
  * | 001FFFFF	    |    FF FF 7F              |
  * | 00200000	    |    81 80 80 00           |
  * 
  */
	read_varint() {
		var result = 0;
		while (true) {
			var b = this.read_int8();
			if (b & 0x80) {
				result += (b & 0x7f);
				result <<= 7;
			} else {
				/* b is the last byte */
				return result + b;
			}
		}
	}
}