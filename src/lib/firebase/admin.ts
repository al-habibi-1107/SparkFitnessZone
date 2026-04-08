import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore }                  from "firebase-admin/firestore";

// ── Initialise once ───────────────────────────────────────────────────────────
// Supports two env var formats (pick one in .env.local):
//   FIREBASE_SERVICE_ACCOUNT_JSON_BASE64  — base64-encoded JSON (recommended,
//     avoids quoting issues with the private key's \n characters)
//   FIREBASE_SERVICE_ACCOUNT_JSON         — raw JSON string (wrap in single
//     quotes in .env.local if you use this)

function getServiceAccount(): Parameters<typeof cert>[0] {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64;
  if (b64) {
    return JSON.parse(Buffer.from(b64, "base64").toString("utf8")) as Parameters<typeof cert>[0];
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (raw) {
    return JSON.parse(raw) as Parameters<typeof cert>[0];
  }

  throw new Error(
    "Firebase Admin credentials not found. Set FIREBASE_SERVICE_ACCOUNT_JSON_BASE64 " +
    "(recommended) or FIREBASE_SERVICE_ACCOUNT_JSON in .env.local.",
  );
}

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0]!;
  return initializeApp({ credential: cert(getServiceAccount()) });
}

export function getDb() {
  return getFirestore(getAdminApp());
}

// ── Member helpers ────────────────────────────────────────────────────────────

export interface Member {
  id:                 string;
  name:               string;
  email:              string;
  phone:              string;
  subscriptionId:     string | null;
  subscriptionStatus: string | null;
  createdAt:          string;
  updatedAt:          string;
}

export async function createMember(
  data: Pick<Member, "name" | "email" | "phone">,
): Promise<Member> {
  const db  = getDb();
  const ref = db.collection("members").doc();
  const now = new Date().toISOString();

  const member: Member = {
    id:                 ref.id,
    name:               data.name,
    email:              data.email,
    phone:              data.phone,
    subscriptionId:     null,
    subscriptionStatus: "created",
    createdAt:          now,
    updatedAt:          now,
  };

  await ref.set(member);
  return member;
}

export async function updateMemberBySubscriptionId(
  subscriptionId: string,
  patch: Partial<Pick<Member, "subscriptionId" | "subscriptionStatus">>,
): Promise<void> {
  const db      = getDb();
  const snapshot = await db
    .collection("members")
    .where("subscriptionId", "==", subscriptionId)
    .limit(1)
    .get();

  if (snapshot.empty) return;

  await snapshot.docs[0]!.ref.update({
    ...patch,
    updatedAt: new Date().toISOString(),
  });
}

export async function updateMemberById(
  memberId: string,
  patch: Partial<Pick<Member, "subscriptionId" | "subscriptionStatus">>,
): Promise<void> {
  const db = getDb();
  await db
    .collection("members")
    .doc(memberId)
    .update({ ...patch, updatedAt: new Date().toISOString() });
}
