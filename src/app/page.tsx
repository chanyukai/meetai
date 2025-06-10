"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

/**
 * Renders the home page with user authentication functionality.
 *
 * Displays sign-up and login forms when no user session exists, allowing users to register or log in with their email, password, and (for sign-up) name. If a user session is active, shows the user's name and a sign-out button.
 *
 * @returns The authentication UI or session information, depending on the user's authentication state.
 */
export default function Home() {

  const { 
    data: session, 
  } = authClient.useSession();
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
    }, {
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        console.log(ctx);
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    });
  };

  const onLogin = () => {
    authClient.signIn.email({
      email, // user email address
      password, // user password -> min 8 characters by default
    }, {
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        console.log(ctx);
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    });
  }

  if (session) {
    return (
      <div className="flex flex-col gap-y-4 p-4">
        <p>{session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    )
  }

  return (
    <div className="p-4 gap-y-10 flex flex-col">
      <div className="p-4 flex flex-col gap-y-4">
       <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)} />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onSubmit}>Create new User</Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onLogin}>Login In</Button>
      </div>
    </div>
    
  );
}
