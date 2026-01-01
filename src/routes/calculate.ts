import { Hono } from "hono";

const calculate = new Hono();

calculate.get("/", (c) => {
	const operation = c.req.query("operation");
	const num1 = parseFloat(c.req.query("num1"));
	const num2 = parseFloat(c.req.query("num2"));

	let result;

	switch (operation) {
		case "add":
			result = num1 + num2;
			break;
		case "subtract":
			result = num1 - num2;
			break;
		case "multiply":
			result = num1 * num2;
			break;
		case "divide":
			if (num2 === 0) {
				c.json(
					{
						success: false,
						message: "Cannot divide with zero!",
					},
					400,
				);
			}
			result = num1 / num2;
			break;
		default:
			return c.json(
				{
					success: false,
					message: "Invalid operation!",
				},
				400,
			);
	}

	return c.json(
		{
			success: true,
			message: "Operation success",
			data: result,
		},
		200,
	);
});

export const Calculate = calculate;
