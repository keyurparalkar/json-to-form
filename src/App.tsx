import { useForm } from "react-hook-form";
import personalInfoSchema from "./schemas/forms/personal_info.json";
import { SchemaDef } from "./interfaces/schema";
import SchemaRenderer from "./components/ui/SchemaRenderer";

const schema = SchemaDef.parse(personalInfoSchema);

const FormValues = schema.fields.reduce((acc, currValue) => {
	if (currValue.type === "field") {
		acc[currValue.accessorKey] = "";
	}
	return acc;
}, {} as Record<string, string>);

export type TFormValues = typeof FormValues;

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TFormValues>();

	const onSubmit = (data: TFormValues) => {
		console.log("form Data = ", data);
	};

	return (
		<div className="container mx-auto flex flex-col items-center">
			<h1 className="text-4xl font-bold tracking-tight mb-5">JSON to Form</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				<SchemaRenderer schema={schema} errors={errors} register={register} />
				<input type="submit" />
			</form>
		</div>
	);
}

export default App;
