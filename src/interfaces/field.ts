export type FieldType = {
	type: "field";
	dataType: FIELD_DATA_TYPE;
	fieldName: string;
	accessorKey: string;
	constraints?: Partial<Record<string, unknown>>;
};

export enum FIELD_DATA_TYPE {
	TEXT = "text",
	NUMBER = "number",
	EMAIL = "email",
}
