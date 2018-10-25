import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
const fs = admin.firestore();
const settings = {timestampsInSnapshots: true};
fs.settings(settings);


exports.firebaseToFirestoreStudentData = functions.database.ref('Estudiantes/{id}').onUpdate(data=>{
    const datos = data.after.val();
    return fs.collection('Estudiantes').doc(data.before.key).set(datos);
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
