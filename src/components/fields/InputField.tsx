import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";

interface InputFieldProps extends InputProps {
	labelText: string;
	htmlFor: string;
}

const InputField = (props: InputFieldProps) => {
	const { htmlFor, labelText, ...rest } = props;
	return (
		<>
			<div className="flex flex-col space-y-2">
				<Label htmlFor={htmlFor}>{labelText}</Label>
				<Input id="htmlFor" {...rest} />
			</div>
		</>
	);
};

export default InputField;
