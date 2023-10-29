import {z} from "zod"

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
