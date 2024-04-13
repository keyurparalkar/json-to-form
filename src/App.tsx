import { useForm } from "react-hook-form";
import InputField from "./components/fields/InputField";
import personalInfoSchema from "./schemas/forms/personal_info.json";
import { SchemaDef } from "./interfaces/schema";

const schema = SchemaDef.parse(personalInfoSchema);

// type FormValues<T extends typeof schema> = {
// 	[P in keyof T]: T[P];
// };
const FormValues = schema.fields.reduce((acc, currValue) => {
	if (currValue.type === "field") {
		acc[currValue.accessorKey] = "";
	}
	return acc;
}, {} as Record<string, string>);

type TFormValues = typeof FormValues;

function App() {
	console.log({ schema });
	const { register, handleSubmit } = useForm<TFormValues>();

	const onSubmit = (data: TFormValues) => {
		console.log("form Data = ", data);
	};

	return (
		<div className="container mx-auto flex flex-col items-center">
			<h1 className="text-4xl font-bold tracking-tight mb-5">JSON to Form</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* TODO(Keyur): Make the below logic recursive*/}
				{schema &&
					schema.fields.map(
						(field) =>
							field.type === "field" && (
								<InputField
									key={`key-${field.accessorKey}`}
									register={register}
									labelText={field.fieldName}
									htmlFor={field.accessorKey}
									type={field.type}
								/>
							)
					)}
				<input type="submit" />
			</form>
		</div>
	);
}

export default App;
