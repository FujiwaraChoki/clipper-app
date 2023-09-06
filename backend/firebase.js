const { initializeApp } = require('firebase/app');
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} = require('firebase/auth');

require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env['API_KEY'],
    authDomain: "getclipper.firebaseapp.com",
    projectId: "getclipper",
    storageBucket: "getclipper.appspot.com",
    messagingSenderId: process.env['MESSAGING_SENDER_ID'],
    appId: process.env['APP_ID']
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const createUser = async (name, email, password) => {
    console.log('Adding user:', { email, name });

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const { user } = userCredential;
            const { uid } = user;

            updateProfile(user, {
                displayName: name,
            }).then(() => {
                console.log('Updated user profile:', { name, email, uid });
            }).catch((error) => {
                console.error('Error updating user profile:', error);
                res.status(500).send('Error updating user profile');
            });

            return { name, email, uid };
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            return error;
        });
};

const getUser = async (uid) => {
    await getAuth().getUser(uid).then((userRecord) => {
        console.log('Successfully fetched user data:', userRecord.toJSON());
        return userRecord.toJSON();
    }).catch((error) => {
        console.error('Error fetching user data:', error);
        return null;
    });
};

const login = async (email, password) => {
    let userAbove = null;

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const { user } = userCredential;

            userAbove = user.toJSON();
        });

    return {
        uid: userAbove.uid,
        name: userAbove.displayName,
        email: userAbove.email,
    };
};


module.exports = {
    createUser,
    getUser,
    login
};
