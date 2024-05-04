"use client";

import React, { ReactNode, createContext, useEffect, useReducer } from "react";

import firebase_app from "@/lib/firebase";
import { getAuth, signOut, User } from "firebase/auth";
import { addDoc, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useMessage } from "./messageProvider";

import SignInSide from "@/components/signInScreen";
import LoadingScreen from "@/components/loadingScreen";

export type AdminState = {
  userLoading: boolean;
  user: { user: User; role: string } | null;
};

export type AdminActionType =
  | {
      type: "SET_USER";
      payload: { user: User; role: string };
    }
  | {
      type: "SET_USER_LOADING";
      payload: boolean;
    };

const initialState: AdminState = {
  user: null,
  userLoading: true,
};

export const AdminContext = createContext<{
  state: AdminState;
  dispatch: React.Dispatch<AdminActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const message = useMessage();
  const [state, dispatch] = useReducer(
    (state: AdminState, action: AdminActionType) => {
      switch (action.type) {
        case "SET_USER":
          return { ...state, user: action.payload };
        case "SET_USER_LOADING":
          return { ...state, userLoading: action.payload };
        default:
          return state;
      }
    },
    initialState
  );
  useEffect(() => {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        // Check local storage for user and match credentials
        const localUser = localStorage.getItem("dashboard_user");
        if (localUser && JSON.parse(localUser).user.uid == user.uid) {
          dispatch({ type: "SET_USER", payload: JSON.parse(localUser) });
          dispatch({ type: "SET_USER_LOADING", payload: false });
          return;
        }
        const db = getFirestore(firebase_app);
        getDoc(doc(db, "users", user.uid))
          .then((res) => {
            if (res.exists()) {
              const role = res.data()?.role;
              if (role == "admin" || role == "editor") {
                localStorage.setItem(
                  "dashboard_user",
                  JSON.stringify({ user, role })
                );
                dispatch({
                  type: "SET_USER",
                  payload: { user, role },
                });
                dispatch({ type: "SET_USER_LOADING", payload: false });
                message.setSuccess("Welcome to dashboard");
              } else {
                message.setError("You are not authorized to access this page.");
                signOut(auth);
                router.push("/");
              }
            } else {
              setDoc(doc(db, "users", user.uid), {
                email: user.email,
              })
                .then((data) => {})
                .catch((error) => {})
                .finally(() => {
                  signOut(auth);
                  router.push("/");
                  message.setError(
                    "You are not authorized to access this page."
                  );
                });
            }
          })
          .catch((error) => {
            signOut(auth);
            router.push("/");
            message.setError("You are not authorized to access this page.");
          });
      } else {
        dispatch({ type: "SET_USER_LOADING", payload: false });
      }
    });
  }, []);

  if (state.userLoading) return <LoadingScreen />;

  if (state.user == null) return <SignInSide />;

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};
