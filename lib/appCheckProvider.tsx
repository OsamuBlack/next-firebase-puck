"use client";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import firebase_app from "./firebase";
import { useEffect, useState } from "react";

const AppCheckProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const siteKey = process.env.NEXT_PUBLIC_APPCHECK_KEY;
  if (!siteKey) {
    return <>{children}</>;
  }

  const provider = new ReCaptchaV3Provider(siteKey);

  useEffect(() => {
    setLoading(false);
  }, []);
  if (!loading) {
    const sdk = initializeAppCheck(firebase_app, {
      provider,
      isTokenAutoRefreshEnabled: true,
    });
  }

  return children;
};

export default AppCheckProvider;
