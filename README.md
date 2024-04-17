## JSON-TO-FORM

This project focuses on demonstrating the Dependency Injection(DI) pattern by transforming a JSON schema into an HTML form.

Here the JSON schema acts a depenedency to the `SchemaRenderer` component. This component requires JSON schema so that it can map over to this object and rendered the required input fields for the form.

### Inspiration

I got inspired to make this project when I was debugging a friends react based form. It had a lot of explicit conditional cases based on the specific input field which made that form more prudent to new changes.

I found JSON schema driven form based soltions, which I found to be extensible and easily configurable and testable.

### Approach

- Here is the approach that I took to implement the project:

  - Every JSON schema should have the following format/fields so that we can call it a valid schema:

    ```ts
    type TField = {
    	type: "field";
    	dataType: "number" | "text" | "email";
    	fieldName: string;
    	accessorKey: string;
    	validation?:
    		| {
    				required?:
    					| {
    							value: boolean;
    							message: string;
    					  }
    					| undefined;
    				maxLength?:
    					| {
    							value: number;
    							message: string;
    					  }
    					| undefined;
    				minLength?:
    					| {
    							value: number;
    							message: string;
    					  }
    					| undefined;
    				max?:
    					| {
    							value: number;
    							message: string;
    					  }
    					| undefined;
    				min?:
    					| {
    							value: number;
    							message: string;
    					  }
    					| undefined;
    				pattern?:
    					| {
    							value: string;
    							message: string;
    					  }
    					| undefined;
    		  }
    		| undefined;
    };

    type GroupFieldType = {
    	type: "group";
    	orientation: "horizontal" | "vertical";
    	fields: (TField | GroupFieldType)[];
    };
    ```

  - Check the JSON schema input as per the above type by parsing it with [zod's schema parser](https://zod.dev/?id=basic-usage).
  - Next, we pass this schema to `SchemaRenderer` component that renders each `field` type object with the `input` element.
  - We make use of the react-hook-form to manage the form state and updates.
  - Lastly, we unregister fields from the form state when any field is removed from the schema.

### Advantages

With the help of the DI pattern we are able to easily configure forms. Making changes into the form is a breeze since we only need to change the JSON schema.

Here is a simple example of adding and removing fields

// video

You can also add validation to the form from the JSON schema itself:

// video that includes validation

You can read more about dependency injection pattern in react [here](https://blog.logrocket.com/dependency-injection-react/).

### Libraries

- [react-hook-form](https://react-hook-form.com/)
- [shadcn-ui](https://ui.shadcn.com/)
- [codemirror-react](https://uiwjs.github.io/react-codemirror/)
- [zod](https://zod.dev/)
