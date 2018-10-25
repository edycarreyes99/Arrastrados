"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const fs = admin.firestore();
const settings = { timestampsInSnapshots: true };
fs.settings(settings);
exports.firebaseToFirestoreStudentData = functions.database.ref('Estudiantes/{id}').onUpdate(data => {
    const datos = data.after.val();
    return fs.collection('Estudiantes').doc(data.before.key).set(datos);
});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//# sourceMappingURL=index.js.map