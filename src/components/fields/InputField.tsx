import { UseFormRegister } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { FieldType } from "@/interfaces/field";

interface InputFieldProps extends InputProps {
	labelText: string;
	htmlFor: string;
	register: UseFormRegister<any>;
}

const InputField = (props: InputFieldProps) => {
	const { htmlFor, register, labelText, ...rest } = props;
	return (
		<>
			<div className="flex flex-col space-y-2">
				<Label htmlFor={htmlFor}>{labelText}</Label>
				<Input id="htmlFor" {...rest} {...register(htmlFor)} />
			</div>
		</>
	);
};

export default InputField;
