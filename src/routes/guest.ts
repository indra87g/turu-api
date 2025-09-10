import { Hono } from "hono";
import { getGuests, newGuest } from "../controllers/GuestController";
import { Env } from "../supabaseClient";

const guest = new Hono<{ Bindings: Env }>();

// GET /api/guest -> Get all guests
guest.get("/", getGuests);

// POST /api/guest -> Create a new guest
guest.post("/", newGuest);

export const Guest = guest;
