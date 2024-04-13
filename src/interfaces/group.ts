import { z } from "zod";
import { FieldTypeDef } from "./field";

type GroupFieldType = {
	type: "group";
	fields: (z.infer<typeof FieldTypeDef> | GroupFieldType)[];
};

export const GroupTypeDef: z.ZodType<GroupFieldType> = z.object({
	type: z.literal("group"),
	fields: z.array(z.union([FieldTypeDef, z.lazy(() => GroupTypeDef)])),
});
