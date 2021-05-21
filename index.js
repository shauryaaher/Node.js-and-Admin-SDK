const admin = require("firebase-admin");
const serviceAccount = require("path/to/file");
const express = require("express");
const port = 5000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<projectId>.firebaseio.com/"
});

const app = express();
const fir = admin.firestore();
const rt = admin.database();

app.get("/", (request, response) => {
    response.send("Visit /firestore, /rtdb-foo or /rtdb-JSON to see Firestore and Realtime Database data.");
});

app.get("/firestore", (request, response) => {
    const ref = fir.doc("db/TwU07xvkfDWVgZdvApkN");
    ref.get()//Gets the doc
    .then((doc) => {
        if(!doc.exists) {
            response.send("No such doc.");
        } else {
            const data = doc.data();
            response.send(data);
        }
    })
    .catch((err) => {
        response.send(err);
    });
});

app.get("/rtdb-foo", (request, response) => {
    const ref = rt.ref().child("Foo");
    ref.on("value", (snapshot) => {
        response.send(snapshot.val());
    });
});

app.get("/rtdb-JSON", (request, response) => {
    const ref = rt.ref().child("JSON");
    ref.on("value", (snapshot) => {
        response.send(snapshot.val());
    });
});


app.listen(port, () => {
    console.log(`Listenin' @ ${port}`);
});
