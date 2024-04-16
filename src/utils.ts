import { SchemaType } from "./interfaces/schema";

export const symmetricDiff = (arr1: string[], arr2: string[]) =>
	arr1
		.filter((x) => !arr2.includes(x))
		.concat(arr2.filter((x) => !arr1.includes(x)));

export const getFormValuesFromSchema = (schema: SchemaType) => {
	let temp: Record<string, string> = {};

	schema.fields.forEach((field) => {
		if (field.type === "field") {
			temp[field.accessorKey] = "";
		} else {
			temp = { ...temp, ...getFormValuesFromSchema(field) };
		}
	});

	return temp;
};
