// 連接 firebase SDK (Firebase-web)
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
const serviceAccount = JSON.parse(await readFile(new URL('../fir-web-d11ce-firebase-adminsdk-hr2r6-c936e0f638.json', import.meta.url)));


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-web-d11ce-default-rtdb.firebaseio.com"
  });
}
const db = admin.firestore();

export default db;
