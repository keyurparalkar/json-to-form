import { z } from "zod";
import { GroupTypeDef } from "./group";

export const SchemaDef = GroupTypeDef;

export type SchemaType = z.infer<typeof SchemaDef>;
