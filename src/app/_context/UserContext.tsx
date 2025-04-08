"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { profileType } from "../../../util/types";

type UserContextType = {
  users: profileType[] | null;
};

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<profileType[] | null>(null);

  const getUsers = async () => {
    try {
      const res = await fetch("api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();
      console.log("jsonData=>", jsonData);

      setUsers(jsonData);

      if (jsonData.error) {
        console.log(jsonData.error);
        return;
      }
    } catch (error) {
      console.log("error", error);
      // alert("error in getting users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
