"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // Handle loading state
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    // Redirect or show a message if not authenticated
    return <div>You need to be authenticated to view this page</div>;
  }

  // Access user data
  const user = session?.user;
  console.log(session);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {user && (
        <div>
          <p>User ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
