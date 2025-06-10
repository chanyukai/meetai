"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

/**
 * Renders the main authentication UI, allowing users to sign up, log in, and sign out.
 *
 * Displays a sign-up form for new users and a login form for existing users when no session is active. If a user is signed in, shows the user's name and a sign-out button.
 *
 * @remark
 * The component manages its own state for user credentials and interacts with {@link authClient} for authentication operations.
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
