"use client";
import { Chip, colorVariants } from "@nextui-org/react";
import React, { ReactNode, createContext, useEffect, useReducer } from "react";
import { motion } from "framer-motion";

export type MessageState = {
  open: boolean;
  message: string;
  color: string;
};

export type MessageAction =
  | {
      type: "SET_ERROR";
      payload: string;
    }
  | {
      type: "SET_SUCCESS";
      payload: string;
    }
  | {
      type: "SET_INFO";
      payload: string;
    }
  | {
      type: "SET_WARNING";
      payload: string;
    }
  | {
      type: "CLOSE";
    };

const initialState: MessageState = {
  open: false,
  message: "",
  color: "success",
};

export const MessageContext = createContext<{
  dispatch: React.Dispatch<MessageAction>;
}>({
  dispatch: () => null,
});

const variants = {
  open: { y: "100%", opacity: 1 },
  closed: { y: "-100%", opacity: 0 },
};

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    (state: MessageState, action: MessageAction) => {
      switch (action.type) {
        case "CLOSE":
          return { ...state, open: false };
        case "SET_ERROR":
          return { open: true, message: action.payload, color: "danger" };
        case "SET_SUCCESS":
          return { open: true, message: action.payload, color: "primary" };
        case "SET_INFO":
          return { open: true, message: action.payload, color: "default" };
        case "SET_WARNING":
          return { open: true, message: action.payload, color: "warning" };
        default:
          return state;
      }
    },
    initialState
  );

  useEffect(() => {
    if (state.open) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLOSE" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.open]);

  return (
    <MessageContext.Provider value={{ dispatch }}>
      {children}
      <div className="fixed top-8 left-1/2 -translate-x-1/2">
        <motion.div
          initial="closed"
          animate={state.open ? "open" : "closed"}
          variants={variants}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
          }}
        >
          <Chip
            size="lg"
            radius="sm"
            onClose={() => dispatch({ type: "CLOSE" })}
            color={
              state.color as
                | "success"
                | "warning"
                | "default"
                | "primary"
                | "secondary"
                | "danger"
            }
          >
            {state.message}
          </Chip>
        </motion.div>
      </div>
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const { dispatch } = React.useContext(MessageContext);
  return {
    setError: (message: string) =>
      dispatch({ type: "SET_ERROR", payload: message }),
    setSuccess: (message: string) =>
      dispatch({ type: "SET_SUCCESS", payload: message }),
    setInfo: (message: string) =>
      dispatch({ type: "SET_INFO", payload: message }),
    setWarning: (message: string) =>
      dispatch({ type: "SET_WARNING", payload: message }),
  };
};
