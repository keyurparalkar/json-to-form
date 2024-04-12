import InputField from "./components/fields/InputField";

function App() {
	return (
		<div className="container mx-auto flex flex-col items-center">
			<h1 className="text-4xl font-bold tracking-tight mb-5">JSON to Form</h1>
			<InputField type="text" labelText="First Name" htmlFor="firstName" />
		</div>
	);
}

export default App;
