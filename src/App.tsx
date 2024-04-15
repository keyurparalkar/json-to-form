import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

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
	const [value, setValue] = useState(`${JSON.stringify(schema, null, 2)}`);
	const onChange = useCallback((val, viewUpdate) => {
		console.log("val:", val);
		setValue(val);
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TFormValues>();

	const onSubmit = (data: TFormValues) => {
		console.log("form Data = ", data);
	};

	return (
		<div className="grid grid-rows-[70px_1fr_40px] m-5 gap-2">
			<h1 className="text-4xl font-bold">JSON to Form</h1>

			<div id="container" className="grid grid-cols-2 gap-x-2">
				<div id="editor">
					<CodeMirror
						className="border border-slate-300"
						value={value}
						height="500px"
						extensions={[json()]}
						onChange={onChange}
					/>
				</div>
				<div id="form-container" className="border border-slate-300">
					<form className="my-5 mx-10" onSubmit={handleSubmit(onSubmit)}>
						<SchemaRenderer
							schema={schema}
							errors={errors}
							register={register}
						/>
						<input type="submit" />
					</form>
				</div>
			</div>

			<div id="status-bar" className="bg-gray-400"></div>
		</div>
	);
}

export default App;
