import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { api } from "~/utils/api";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status !== "loading") {
      window.location.href = "/login";
    }
  }, [session]);
 if (session) {
  return (
    <>
    <div className="bg-base-300 min-h-screen">
    <p>Home</p>
    </div>

    </>
  );
 }
}