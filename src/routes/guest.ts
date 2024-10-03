import { Hono } from "hono";

import { getGuests, newGuest } from "../controllers/GuestController";

const guest = new Hono();

guest.get("/", (c) => getGuests(c));
guest.get("/new", (c) => newGuest(c));

export const Guest = guest;
