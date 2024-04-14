import { FieldError, UseFormRegister } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { TField } from "@/interfaces/field";

interface InputFieldProps extends InputProps {
	labelText: string;
	htmlFor: string;
	register: UseFormRegister<any>;
	validation?: TField["validation"];
	error?: FieldError;
}

const InputField = (props: InputFieldProps) => {
	const { htmlFor, register, labelText, validation, error, ...rest } = props;
	console.log({ htmlFor, validation });
	return (
		<>
			<div className="flex flex-col space-y-2">
				<Label htmlFor={htmlFor}>{labelText}</Label>
				<Input
					id="htmlFor"
					{...rest}
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					{...register(htmlFor, { ...validation })}
				/>
				{error && <span>{error.message}</span>}
			</div>
		</>
	);
};

export default InputField;
