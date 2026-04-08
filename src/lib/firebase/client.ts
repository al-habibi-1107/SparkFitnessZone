import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth }                         from "firebase/auth";

// ── Firebase client config ────────────────────────────────────────────────────
// All NEXT_PUBLIC_ vars are safe to expose to the browser.
// They identify your project but grant no privileged access.

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

function getClientApp() {
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export function getClientAuth() {
  return getAuth(getClientApp());
}
