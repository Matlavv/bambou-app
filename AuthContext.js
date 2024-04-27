import { signOut as firebaseSignOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Définition de la fonction signOut
  const signOut = () => {
    firebaseSignOut(auth)
      .then(() => {
        console.log("Déconnexion réussie");
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
