import { SchemaType } from "@/interfaces/schema";
import InputField from "../fields/InputField";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TFormValues } from "@/App";

type SchemaRendererProps = {
	schema: SchemaType;
	errors: FieldErrors<Record<string, string>>;
	register: UseFormRegister<TFormValues>;
};

const SchemaRenderer = (props: SchemaRendererProps) => {
	const { schema, errors, register } = props;

	return (
		<div
			id="group-container"
			className={`grid ${
				schema.orientation === "horizontal" ? "grid-cols-3" : "grid-rows-1"
			} gap-[10px]`}
		>
			{schema.fields.map((field, index) => {
				if (field.type === "field") {
					return (
						<InputField
							key={`key-${field.accessorKey}`}
							register={register}
							labelText={field.fieldName}
							htmlFor={field.accessorKey}
							type={field.dataType}
							validation={field.validation}
							error={errors[field.accessorKey]}
						/>
					);
				}

				return (
					<SchemaRenderer
						schema={field}
						errors={errors}
						register={register}
						key={`group-container-${index}`}
					/>
				);
			})}
		</div>
	);
};

export default SchemaRenderer;
