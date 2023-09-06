const express = require('express');
const Datastore = require('nedb');
const bodyParser = require('body-parser');
const { getUser, createUser, signInWithEmailAndPassword } = require('./firebase');

const app = express();
app.use(bodyParser.json());

const db = new Datastore({ filename: 'database.db', autoload: true });

app.get('/user/:uid', (req, res) => {
    console.log('GET /user');

    const { uid } = req.params;

    const user = getUser(uid);

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(404).send('User not found');
    }
});

app.post('/user/login', (req, res) => {
    console.log('POST /user/login');

    const { email, password } = req.body;

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const { user } = userCredential;
            const { uid } = user;

            console.log('Signed in:', { email, uid });
            return res.status(200).json({ email, uid });
        })
        .catch((error) => {
            console.error('Error signing in:', error);
            return res.status(500).send('Error signing in');
        });
});

app.post('/user/signup', async (req, res) => {
    console.log('POST /user/signup');

    const { name, email, password } = req.body;
    console.log('Adding user:', { email, name });

    const user = await createUser(name, email, password);

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(500).send('Error creating user');
    }
});

app.post('/user', (req, res) => {
    console.log('POST /user');

    const { name, email, password } = req.body;
    console.log('Adding user:', { email, name });

    const user = createUser(name, email, password);

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(500).send('Error creating user');
    }
});

app.get('/history/:uid', (req, res) => {
    console.log('GET /history');

    const { uid } = req.params;

    // Get data with the given UID
    const result = db.findOne({ uid }, (err, doc) => {
        if (err) {
            console.error('Error fetching history:', err);
            return res.status(500).send('Error fetching history');
        } else {
            if (!doc) {
                // If the user's history collection doesn't exist, create it
                db.insert({ uid, items: [] }, (err) => {
                    if (err) {
                        console.error('Error initializing history:', err);
                        res.status(500).send('Error initializing history');
                    } else {
                        return res.status(200).json([]);
                    }
                });
            } else {
                return res.status(200).json(doc.items);
            }
        }
    });

    console.log('Result:', result);
});

app.post('/history', (req, res) => {
    console.log('POST /history');

    const { item, uid } = req.body;
    console.log('Adding history item:', item);

    // Add the item to the user's history collection with the given UID
    db.update({ uid }, { $push: { items: item } }, (err) => {
        if (err) {
            console.error('Error adding history item:', err);
            res.status(500).send('Error adding history item');
        } else {
            return res.status(200).json(item);
        }
    });
});

app.listen(3000, () => {
    console.log('App listening on: http://localhost:3000');
});
