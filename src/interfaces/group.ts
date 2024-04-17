import { z } from "zod";
import { FieldTypeDef } from "./field";

type GroupFieldType = {
	type: "group";
	orientation: "horizontal" | "vertical";
	fields: (z.infer<typeof FieldTypeDef> | GroupFieldType)[];
};

export const GroupTypeDef: z.ZodType<GroupFieldType> = z.object({
	type: z.literal("group"),
	orientation: z.union([z.literal("horizontal"), z.literal("vertical")]),
	fields: z.array(z.union([FieldTypeDef, z.lazy(() => GroupTypeDef)])),
});
