import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { ZodError } from "zod";

import personalInfoSchema from "./schemas/forms/personal_info.json";
import { SchemaDef } from "./interfaces/schema";
import SchemaRenderer from "./components/ui/SchemaRenderer";
import { getFormValuesFromSchema, symmetricDiff } from "./utils";
import { Button } from "./components/ui/button";

const schema = SchemaDef.parse(personalInfoSchema);

const FormValues = schema.fields.reduce((acc, currValue) => {
	if (currValue.type === "field") {
		acc[currValue.accessorKey] = "";
	}
	return acc;
}, {} as Record<string, string>);

export type TFormValues = typeof FormValues;

function App() {
	const [value, setValue] = useState(schema);
	const previousSchema = useRef<typeof value | null>(null);
	const [editorError, setEditorError] = useState<ZodError>();

	const onChange = (val: string) => {
		try {
			// Save the previous schema value
			previousSchema.current = value;
			const tempSchema = SchemaDef.parse(JSON.parse(val));
			setValue(tempSchema);
			setEditorError(undefined);
		} catch (error) {
			console.log({ error });
			setEditorError(error as ZodError);
		}
	};

	const errorMessage = useMemo(() => {
		if (editorError && editorError.issues?.[0]) {
			const firstIssue = editorError.issues[0];
			return firstIssue.code === "invalid_union"
				? firstIssue.unionErrors[0]
				: "";
		}

		return editorError;
	}, [editorError]);

	const {
		register,
		unregister,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TFormValues>();

	const onSubmit = (data: TFormValues) => {
		console.log("form Data = ", data);
		reset();
	};

	// Effect that finds the diff and unregister's the field on schema change.
	useEffect(() => {
		const previousValues = previousSchema.current
			? getFormValuesFromSchema(previousSchema.current)
			: {};
		const currentValues = getFormValuesFromSchema(value);

		const diff = symmetricDiff(
			Object.keys(currentValues),
			Object.keys(previousValues)
		);

		diff.forEach((fieldName) => {
			unregister(fieldName);
		});
	}, [unregister, value]);

	return (
		<div className="grid grid-rows-[70px_1fr_40px] m-5 gap-2">
			<h1 className="text-4xl font-bold">JSON to Form</h1>

			<div id="container" className="grid grid-cols-2 gap-x-2">
				<div id="editor">
					<CodeMirror
						className="border border-slate-300"
						value={`${JSON.stringify(value, null, 2)}`}
						height="500px"
						extensions={[json()]}
						onChange={onChange}
					/>
				</div>
				<div id="form-container" className="border border-slate-300">
					<form className="my-8 mx-[52px]" onSubmit={handleSubmit(onSubmit)}>
						<div
							id="form-fields--fixed--container"
							className="h-[400px] overflow-y-scroll p-[10px]"
						>
							<SchemaRenderer
								schema={value}
								errors={errors}
								register={register}
							/>
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</div>
			</div>

			<code id="error-status-bar" className="bg-red-100 text-red-600 text-sm">
				{JSON.stringify(errorMessage)}
			</code>
		</div>
	);
}

export default App;
