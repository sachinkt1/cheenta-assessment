import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center h-screen home-container">
      {session ? (
        <div className="flex flex-wrap flex-row justify-around items-center gap-12">
          <p className="text-sm">Welcome, {session.user?.name}!</p>
          <div className="text-sm">
            <button onClick={() => signOut()} className="p-2 bg-red-500 text-white rounded">
              Logout
            </button>
          </div>
        </div>
      ) : (
          <div>
            <h2 className="flex flex-col">
              <span className="text-2xl">Welcome To,</span>
              <span className="text-lg pt-2">Task Management System</span>
            </h2>
            <div className="login-btn-wrapper">
              <button onClick={() => signIn("google")} className="p-2 bg-blue-500 text-white rounded">
                Login with Google
              </button>
            </div>
          </div>
      )}
    </div>
  );
}
