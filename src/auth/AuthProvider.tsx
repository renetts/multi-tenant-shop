import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  role: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  role: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const idTokenResult = await firebaseUser.getIdTokenResult();
        setRole((idTokenResult?.claims?.role as string) ?? null);
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role }}>
      {children}
    </AuthContext.Provider>
  );
};
