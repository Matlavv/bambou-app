import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { app, db } from "./firebaseConfig";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        getDoc(userDoc).then((doc) => {
          if (doc.exists()) {
            setUserInfo(doc.data());
          }
        });
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const updateUserInfo = (newInfo) => {
    setUserInfo((prev) => ({ ...prev, ...newInfo }));
  };

  const signOut = () => {
    return auth.signOut().then(() => {
      setCurrentUser(null);
      setIsAuthenticated(false);
      setUserInfo(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        userInfo,
        updateUserInfo,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
