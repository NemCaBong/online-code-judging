import { createContext, useState } from "react";

const initAuthContext: any = {
  user: JSON.parse(localStorage.getItem("user_info") || "{}"),
  isLoggedIn: Boolean(localStorage.getItem("access_token") || ""),
};

export const AuthContext = createContext(initAuthContext);
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(initAuthContext.user);
  const [isLoggedIn, setIsLoggedIn] = useState(initAuthContext.isLoggedIn);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
