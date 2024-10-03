import { Hono } from "hono";

import { getGuests } from "../controllers/GuestController";

const router = new Hono();

router.get("/", (c) => getGuests(c));

export const Routes = router;
