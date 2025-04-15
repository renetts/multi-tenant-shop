import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthProvider";

const withAdminProtection = (Component: React.FC) => {
  const WrappedComponent = () => {
    const { user, role } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (user && role !== "admin") {
        router.push("/unauthorized");
      }
    }, [user, role, router]);

    if (!user || role !== "admin") {
      return null; // You can replace this with a loading spinner
    }

    return <Component />;
  };

  return WrappedComponent;
};

export default withAdminProtection;
