import { FieldError, UseFormRegister } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { TField } from "@/interfaces/field";
import { TFormValues } from "@/App";

interface InputFieldProps extends InputProps {
	labelText: string;
	htmlFor: string;
	register: UseFormRegister<TFormValues>;
	validation?: TField["validation"];
	error?: FieldError;
}

const InputField = (props: InputFieldProps) => {
	const { htmlFor, register, labelText, validation, error, ...rest } = props;
	return (
		<>
			<div className="flex flex-col space-y-2 my-2">
				<Label className={`${error ? "text-red-600" : ""}`} htmlFor={htmlFor}>
					{labelText}
				</Label>
				<Input
					id="htmlFor"
					{...rest}
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					{...register(htmlFor, { ...validation })}
				/>
				{error && (
					<span className="text-xs text-red-600 font-light">
						{error.message}
					</span>
				)}
			</div>
		</>
	);
};

export default InputField;
