import { z } from "zod";

const RequiredDef = z.object({
	value: z.boolean(),
	message: z.string(),
});

const MaxMinLengthDef = z.object({
	value: z.number(),
	message: z.string(),
});

const MaxMinDef = z.object({
	value: z.number(),
	message: z.string(),
});

const PatternDef = z.object({
	value: z.string(),
	message: z.string(),
});

export const FieldTypeDef = z.object({
	type: z.literal("field"),
	dataType: z.enum(["text", "number", "email"]),
	fieldName: z.string(),
	accessorKey: z.string().min(1, { message: "accessorKey cannot be empty" }),
	validation: z
		.object({
			required: RequiredDef.optional(),
			maxLength: MaxMinLengthDef.optional(),
			minLength: MaxMinLengthDef.optional(),
			max: MaxMinDef.optional(),
			min: MaxMinDef.optional(),
			pattern: PatternDef.optional(),
		})
		.optional(),
});

export type TField = z.infer<typeof FieldTypeDef>;
