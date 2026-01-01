import { expect, describe, test } from "bun:test";
import app from "../src/index";

describe("API Test", () => {
	test("GET /api", async () => {
		const req = new Request("http://localhost:3000/api");
		const res = await app.fetch(req);

		expect(res.status).toBe(200);
	});

	test("GET /api/hello", async () => {
		const req = new Request("http://localhost:3000/api/hello/John");
		const res = await app.fetch(req);

		expect(res.status).toBe(200);
		expect(await res.text()).toBe("Hello, John!");
	});

	test("GET /api/calculate", async () => {
		const req = new Request(
			"http://localhost:3000/api/calculate?operation=multiply&num1=50&num2=50",
		);
		const res = await app.fetch(req);

		expect(res.status).toBe(200);
	});
});
