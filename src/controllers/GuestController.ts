import { Context } from "hono";
import { getSupabase, Env } from "../supabaseClient";

export const getGuests = async (c: Context<{ Bindings: Env }>) => {
  try {
    const supabase = getSupabase(c);
    const { data, error } = await supabase
      .from("Guest")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error getting guests:", error);
      return c.json({ success: false, message: "Failed to fetch guests" }, 500);
    }

    return c.json(
      {
        success: true,
        message: "TURU REST API Guest",
        data: data,
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error getting guest: ${e}`);
    return c.json({ success: false, message: "An unexpected error occurred" }, 500);
  }
};

export async function newGuest(c: Context<{ Bindings: Env }>) {
  try {
    const name = c.req.query("name");
    const message = c.req.query("message");

    if (!name || !message) {
        return c.json({ success: false, message: "Name and message are required" }, 400);
    }

    const supabase = getSupabase(c);
    const { data, error } = await supabase
      .from("Guest")
      .insert([{ name: String(name), message: String(message) }])
      .select();

    if (error) {
      console.error("Error creating guest:", error);
      return c.json({ success: false, message: "Failed to create guest" }, 500);
    }

    return c.json(
      {
        success: true,
        message: "Success",
        data: data,
      },
      201
    );
  } catch (e: unknown) {
    console.error(`Error creating guest: ${e}`);
    return c.json({ success: false, message: "An unexpected error occurred" }, 500);
  }
}
