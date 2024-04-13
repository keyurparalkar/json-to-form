import { z } from "zod";

export const FieldTypeDef = z.object({
	type: z.literal("field"),
	dataType: z.enum(["text", "number", "email"]),
	fieldName: z.string(),
	accessorKey: z.string(),
});

type GroupFieldType = {
	type: "group";
	fields: (z.infer<typeof FieldTypeDef> | GroupFieldType)[];
};

export const GroupTypeDef: z.ZodType<GroupFieldType> = z.object({
	type: z.literal("group"),
	fields: z.array(z.union([FieldTypeDef, z.lazy(() => GroupTypeDef)])),
});

export const SchemaDef = GroupTypeDef;

export type SchemaType = z.infer<typeof SchemaDef>;
