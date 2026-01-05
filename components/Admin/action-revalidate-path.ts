"use server";

import { revalidatePath } from "next/cache";

export async function RevalidatePathServerAction() {
  revalidatePath("/", "layout");
}
