"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { cartTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { SingleStoreSession } from "drizzle-orm/singlestore-core";

export const getCart = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Unauthorized");

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();
    return { ...newCart, items: [] };
  }

  return cart;
};
