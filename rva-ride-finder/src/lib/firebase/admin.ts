import "server-only";

import admin, { type ServiceAccount } from "firebase-admin";

import serviceAccount from '../../../service-account.json'

let app;

if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
  })
} else {
  app = admin.app();
}

export const adminAuth = app.auth();