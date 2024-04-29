import React from "react";
import {
  Avatar,
  Card,
  Spacer,
  Button,
  Input,
  Checkbox,
} from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { User } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app, { auth } from "@/lib/firebase";

export default function SignInSide() {
  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider)
        .then(async (result) => {})
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <Card className="w-64 mx-auto p-4">
        <Avatar size="lg" className="mx-auto" color="primary"></Avatar>
        <Spacer y={4} />
        <Button
          color="primary"
          startContent={<FaGoogle className="text-xl text-white" />}
          onClick={handleSignInWithGoogle}
        >
          Sign In with Google
        </Button>
      </Card>
    </div>
  );
}
