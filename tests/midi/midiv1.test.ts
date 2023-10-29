import { describe, it, expect, test } from 'vitest'

import { Midiv1, AbsMidiv1 } from '../../src/midi/midiv1';

describe("Midi V1", () => {
  it("should parse empty midi base64 string to rmidi :", ()=> {
    let src = 'data:audio/mid;base64,TVRoZAAAAAYAAQABAeBNVHJrAAAABAD/LwA='

    let expected = {
        "header":  {
          "format": 1,
          "ticks": 480,
          "tracks": 1,
        },
        "tracks":  [
          [
            {
              "deltaTime": 0,
              "subtype": "end_of_track",
              "type": "meta",
            }
          ]
        ]
      }
    
    let res = Midiv1.parse(src).json();
    

    expect(res).toEqual(expected)
  })

  it("should parse single track midi base64 string to rmidi object : ", ()=> {
    let src = "data:audio/mid;base64,TVRoZAAAAAYAAQABAeBNVHJrAAAAdQD/AwZQaWFubwAA/1gEBAIYCAD/WQIAAAD/UQMHoSAAsHkAAMAAALAHZAAKQABbAABdAAD/IQEAAJBHUINHRwAZSFCDR0gAGUpQg0dKABlMUINHTAAZTFCDR0wAGUpQg0dKABlIUINHSAAZRVCDR0UAAf8vAA=="

    let expected = {
      "header": {
        "format": 1,
        "resolution": 480,
        "tracks": 1,
      },
      "tracks": [
        [
         {
            "deltaTime": 0,
            "subtype": "track_name",
            "text": {
              "0": 80,
              "1": 105,
              "2": 97,
              "3": 110,
              "4": 111,
              "5": 0,
            },
            "type": "meta",
          },
         {
            "deltaTime": 0,
            "denominator": 4,
            "metronome": 24,
            "numerator": 4,
            "subtype": "time_signature",
            "thirtyseconds": 8,
            "type": "meta",
          },
         {
            "deltaTime": 0,
            "key": 0,
            "scale": 0,
            "subtype": "key_signature",
            "type": "meta",
          },
         {
            "deltaTime": 0,
            "microsecondsPerBeat": 500000,
            "subtype": "set_tempo",
            "type": "meta",
          },
         {
            "channel": 0,
            "controllerType": 121,
            "deltaTime": 0,
            "subtype": "controller",
            "type": "channel",
            "value": 0,
          },
         {
            "channel": 0,
            "deltaTime": 0,
            "programNumber": 0,
            "subtype": "programChange",
            "type": "channel",
          },
         {
            "channel": 0,
            "controllerType": 7,
            "deltaTime": 0,
            "subtype": "controller",
            "type": "channel",
            "value": 100,
          },
         {
            "channel": 0,
            "controllerType": 10,
            "deltaTime": 0,
            "subtype": "controller",
            "type": "channel",
            "value": 64,
          },
         {
            "channel": 0,
            "controllerType": 91,
            "deltaTime": 0,
            "subtype": "controller",
            "type": "channel",
            "value": 0,
          },
         {
            "channel": 0,
            "controllerType": 93,
            "deltaTime": 0,
            "subtype": "controller",
            "type": "channel",
            "value": 0,
          },
         {
            "data": {
              "0": 0,
            },
            "deltaTime": 0,
            "subtype": "unknown",
            "type": "meta",
          },
         {
            "channel": 0,
            "deltaTime": 0,
            "noteNumber": 71,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 71,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 72,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 72,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 74,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 74,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 76,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 76,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 76,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 76,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 74,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 74,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 72,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 72,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 69,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 69,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "deltaTime": 1,
            "subtype": "end_of_track",
            "type": "meta",
          },
        ],
      ],
    }

    let res = new Midiv1(src).json()

    console.log("result: " , res);
    

    expect(res).toEqual(expected)
  })

  it("should parse single track midi base64 string to rAbsMidi object : ", ()=> {
    let src = "data:audio/mid;base64,TVRoZAAAAAYAAQABAeBNVHJrAAAAdQD/AwZQaWFubwAA/1gEBAIYCAD/WQIAAAD/UQMHoSAAsHkAAMAAALAHZAAKQABbAABdAAD/IQEAAJBHUINHRwAZSFCDR0gAGUpQg0dKABlMUINHTAAZTFCDR0wAGUpQg0dKABlIUINHSAAZRVCDR0UAAf8vAA=="

    let expected = {
      "header": {
        "format": 1,
        "resolution": 480,
        "tracks": 1,
      },
      "tracks": [
        [
         {
            "deltaTime": 0,
            "subtype": "track_name",
            "text": {
              "0": 80,
              "1": 105,
              "2": 97,
              "3": 110,
              "4": 111,
              "5": 0,
            },
            "type": "meta",
          },
         {
            "deltaTime": 0,
            "denominator": 4,
            "metronome": 24,
            "numerator": 4,
            "subtype": "time_signature",
            "thirtyseconds": 8,
            "type": "meta",
          },
         {
            "deltaTime": 0,
            "key": 0,
            "scale": 0,
            "subtype": "key_signature",
            "type": "meta",
          },
         {
            "deltaTime": 0,
            "microsecondsPerBeat": 500000,
            "subtype": "set_tempo",
            "type": "meta",
          },
         {
            "channel": 0,
            "controllerType": 121,
            "deltaTime": 0,
            "subtype": "controller",
            "type": "channel",
            "value": 0,
          },
         {
            "channel": 0,
            "deltaTime": 0,
            "programNumber": 0,
            "subtype": "programChange",
            "type": "channel",
          },
         {
            "channel": 0,
            "controllerType": 7,
            "deltaTime": 0,
            "subtype": "controller",
            "type": "channel",
            "value": 100,
          },
         {
            "channel": 0,
            "controllerType": 10,
            "deltaTime": 0,
            "subtype": "controller",
            "type": "channel",
            "value": 64,
          },
         {
            "channel": 0,
            "controllerType": 91,
            "deltaTime": 0,
            "subtype": "controller",
            "type": "channel",
            "value": 0,
          },
         {
            "channel": 0,
            "controllerType": 93,
            "deltaTime": 0,
            "subtype": "controller",
            "type": "channel",
            "value": 0,
          },
         {
            "data": {
              "0": 0,
            },
            "deltaTime": 0,
            "subtype": "unknown",
            "type": "meta",
          },
         {
            "channel": 0,
            "deltaTime": 0,
            "noteNumber": 71,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 71,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 72,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 72,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 74,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 74,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 76,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 76,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 76,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 76,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 74,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 74,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 72,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 72,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "channel": 0,
            "deltaTime": 25,
            "noteNumber": 69,
            "subtype": "note_on",
            "type": "channel",
            "velocity": 80,
          },
         {
            "channel": 0,
            "deltaTime": 455,
            "noteNumber": 69,
            "subtype": "note_off",
            "type": "channel",
            "velocity": 0,
          },
         {
            "deltaTime": 1,
            "subtype": "end_of_track",
            "type": "meta",
          },
        ],
      ],
    }

    let res = AbsMidiv1.parse(src)

    console.log("result: " , res);
    

    expect(res).toEqual(expected)
  })
})

