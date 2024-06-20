import { ReactNode, createContext, useState } from "react";

export interface User {
    email: string;
    name: string;
    lastname: string;
}

interface UserContextType {
    user: User
    setUser: (user: User) => void;
}

const defaultUser: User = {email: 'defaultmail', name: 'defaultname', lastname: 'defaultlastname'}
const defaultUserContext: UserContextType = {
  user: defaultUser,
  setUser: () => {}
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(defaultUser);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };
