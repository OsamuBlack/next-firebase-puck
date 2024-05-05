"use client";

import { getFirestore, doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import firebase_app from "@/lib/firebase";
import { useEffect } from "react";

export default function Page() {
  
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <h1>This is a test page. Use this for testing but make sure to add it to .gitignore</h1>
    </div>
  );
}
