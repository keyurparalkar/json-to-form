import { z } from "zod";

export const FieldTypeDef = z.object({
	type: z.literal("field"),
	dataType: z.enum(["text", "number", "email"]),
	fieldName: z.string(),
	accessorKey: z.string(),
});
