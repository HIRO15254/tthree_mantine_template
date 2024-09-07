import {headers} from "next/headers";
import {redirect} from "next/navigation";

import {auth} from "~/server/auth";

export const protectPage = async () => {
  await auth().then((session) => {
    if (!session?.user) {
      redirect(`/login?callbackUrl=${headers().get("x-url") || "/"}`);
    }
  })
}
