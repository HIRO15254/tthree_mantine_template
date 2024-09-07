import React from "react";

import {Button, Paper} from "@mantine/core";
import {redirect} from "next/navigation";

import {auth, signIn} from "~/server/auth";

interface LoginPageProps {
  searchParams: {
    callbackUrl: string;
  }
}

const LoginPage: React.FC<LoginPageProps> = async (props) => {
  const {searchParams} = props;
  await auth().then((session) => {
    if (session?.user) {
      redirect(searchParams.callbackUrl || "/");
    }
  })
  return (
    <Paper>
      <form
        action={async () => {
          "use server"
          await signIn("discord", {redirectTo: searchParams.callbackUrl});
        }}
      >
        <Button type={"submit"}>Login with Discord</Button>
      </form>
    </Paper>
  );
}

export default LoginPage;
