import { describe, it, expect, test } from 'vitest'

import { Reader } from '../../src/reader';

describe("Base64Reader", () => {
  it("should convert midi base64 string to Uint8Array :", ()=> {
    var a = 'data:audio/mid;base64,TVRoZAAAAAYAAQABAeBNVHJrAAAABAD/LwA='

    var expected = new Uint8Array([0x4d, 0x54, 0x68, 0x64, 0x00, 0x00, 0x00, 0x06, 
      0x00, 0x01,0x00,0x01,0x01, 0xE0, 
      0x4D, 0x54, 0x72, 0x6B, 0x00, 0x00, 0x00, 0x04,
      0x00, 0xFF, 0x2F, 0x00
    ])
    var res = Reader.read_base64(a)

    expect(res).toEqual(expected)
  })
})

