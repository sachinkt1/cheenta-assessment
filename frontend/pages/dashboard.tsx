import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.name}!</p>
    </div>
  );
}
