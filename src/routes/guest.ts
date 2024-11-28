import { Hono } from "hono";
import { sign, verify } from 'hono/jwt'
import { getPrisma } from '../prismaFunction';

import { getGuests, newGuest } from "../controllers/GuestController";

const guest = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

guest.post("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
});
guest.get("/new", (c) => newGuest(c));

export const Guest = guest;
