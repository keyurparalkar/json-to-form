import { useForm } from "react-hook-form";
import InputField from "./components/fields/InputField";
import personalInfoSchema from "./schemas/forms/personal_info.json";

function App() {
	const schema = personalInfoSchema;
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log("form Data = ", data);
	};

	return (
		<div className="container mx-auto flex flex-col items-center">
			<h1 className="text-4xl font-bold tracking-tight mb-5">JSON to Form</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* TODO(Keyur): Make the below logic recursive*/}
				{schema &&
					schema.fields.map((field) => (
						<InputField
							key={`key-${field.accessorKey}`}
							register={register}
							labelText={field.fieldName}
							htmlFor={field.accessorKey}
							type={field.type}
						/>
					))}
				<input type="submit" />
			</form>
		</div>
	);
}

export default App;
