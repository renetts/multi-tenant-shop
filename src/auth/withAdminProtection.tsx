"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthProvider";

const withAdminProtection = (Component: React.FC) => {
  const WrappedComponent = () => {
    const { user, role, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push("/login");
        } else if (role !== "admin") {
          router.push("/unauthorized");
        }
      }
    }, [user, role, loading, router]);

    if (loading || !user || role !== "admin") {
      return <p className="p-4 text-center">Loading or unauthorized...</p>;
    }

    return <Component />;
  };

  return WrappedComponent;
};

export default withAdminProtection;