const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const { getUser, createUser, login } = require('./firebase');

const app = express();
app.use(bodyParser.json());

const DATABASE_FILE = 'database.json';

async function readData() {
    try {
        const data = await fs.readFile(DATABASE_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { users: [], history: [] };
    }
}

async function writeData(data) {
    try {
        await fs.writeFile(DATABASE_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to database:', error);
    }
}

app.get('/user/:uid', async (req, res) => {
    console.log('GET /user');

    const { uid } = req.params;

    try {
        const data = await readData();
        const user = getUser(uid);

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).send('Error fetching user');
    }
});

app.post('/user/login', async (req, res) => {
    console.log('POST /user/login');

    const { email, password } = req.body;

    try {
        const data = await readData();
        const user = await login(email, password);

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(500).send('Error logging in');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).send('Error signing in');
    }
});

app.post('/user/signup', async (req, res) => {
    console.log('POST /user/signup');

    const { name, email, password } = req.body;
    console.log('Adding user:', { email, name });

    try {
        const data = await readData();
        const user = await createUser(name, email, password);

        if (user) {
            data.users.push(user);
            await writeData(data);
            return res.status(200).json(user);
        } else {
            return res.status(500).send('Error creating user');
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send('Error creating user');
    }
});

app.delete('/history/:uid/:item_id', async (req, res) => {
    console.log('DELETE /history');

    const { uid, item_id } = req.params;

    try {
        const data = await readData();
        const userHistory = data.history.find((item) => item.uid === uid);

        if (userHistory) {
            userHistory.items = userHistory.items.filter((item) => item.id !== item_id);
            await writeData(data);
            return res.status(200).json(userHistory.items);
        } else {
            return res.status(500).send('Error deleting history item');
        }
    } catch (error) {
        console.error('Error deleting history item:', error);
        return res.status(500).send('Error deleting history item');
    }
});

app.post('/user', async (req, res) => {
    console.log('POST /user');

    const { name, email, password } = req.body;
    console.log('Adding user:', { email, name });

    try {
        const data = await readData();
        const user = await createUser(name, email, password);

        if (user) {
            data.users.push(user);
            await writeData(data);
            return res.status(200).json(user);
        } else {
            return res.status(500).send('Error creating user');
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send('Error creating user');
    }
});

app.get('/history/:uid', async (req, res) => {
    console.log('GET /history');

    const { uid } = req.params;

    try {
        const data = await readData();
        const userHistory = data.history.find((item) => item.uid === uid);

        if (!userHistory) {
            // If the user's history collection doesn't exist, create it
            data.history.push({ uid, items: [] });
            await writeData(data);
        }

        return res.status(200).json(userHistory ? userHistory.items : []);
    } catch (error) {
        console.error('Error fetching history:', error);
        return res.status(500).send('Error fetching history');
    }
});

app.post('/history', async (req, res) => {
    console.log('POST /history');

    const { item, uid } = req.body;

    try {
        const data = await readData();
        const userHistory = data.history.find((h) => h.uid === uid);

        if (userHistory) {
            userHistory.items.push(item);
            await writeData(data);
            return res.status(200).json(item);
        } else {
            return res.status(500).send('Error adding history item');
        }
    } catch (error) {
        console.error('Error adding history item:', error);
        return res.status(500).send('Error adding history item');
    }
});

app.listen(3000, () => {
    console.log('App listening on: http://localhost:3000');
});
