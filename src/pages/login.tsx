import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/");
    }
  }, [session, status, router]);

  // If session is loading or authenticated, show a loading state or nothing
  if (status === "loading" || status === "authenticated") {
    return <span className="loading loading-spinner loading-lg"></span>; // or return null or a specific loading component
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm flex-shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="form-control mt-6">
              <button onClick={() => signIn()} className="btn btn-primary">
                CLICK TO LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
