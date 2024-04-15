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

	return schema.fields.map((field) => {
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
			<SchemaRenderer schema={field} errors={errors} register={register} />
		);
	});
};

export default SchemaRenderer;
