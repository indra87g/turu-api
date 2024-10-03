import { Context } from "hono";

import prisma from "../../prisma/client";

export const getGuests = async (c: Context) => {
  try {
    const guests = await prisma.guest.findMany({ orderBy: { id: "desc" } });

    return c.json(
      {
        success: true,
        message: "TURU REST API Guest",
        data: guests,
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error getting guest: ${e}`);
  }
};

export async function newGuest(c: Context) {
  try {
    const name = String(c.req.query('name'));
    const message = String(c.req.query('message'));

    const guest = await prisma.guest.create({
      data: {
        name: name,
        message: message,
      },
    });

    return c.json(
      {
        success: true,
        message: "Success",
        data: guest,
      },
      201
    );
  } catch (e: unknown) {
    console.error(`Error creating guest: ${e}`);
  }
}