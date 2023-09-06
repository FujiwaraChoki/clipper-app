const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyD5jv0tjEIvvGJDwdDtKZU_PpqXv9u-5QU",
    authDomain: "getclipper.firebaseapp.com",
    projectId: "getclipper",
    storageBucket: "getclipper.appspot.com",
    messagingSenderId: "781625170618",
    appId: "1:781625170618:web:c678ffd2b44b3f66aa0083"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const createUser = (name, email, password) => {
    console.log('Adding user:', { email, name });

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const { user } = userCredential;
            const { uid } = user;

            // Set the user's name
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

const getUser = (uid) => {
    getAuth().getUser(uid).then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully fetched user data:', userRecord.toJSON());
        return userRecord.toJSON();
    }).catch((error) => {
        console.error('Error fetching user data:', error);
        return null;
    });
};


module.exports = {
    createUser,
    getUser,
    signInWithEmailAndPassword
};
