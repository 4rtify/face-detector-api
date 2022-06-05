import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import { handleRegister } from "./controllers/register.js";
import { handleSignin } from "./controllers/signin.js";
import { handleImage, handleApiCall } from "./controllers/image.js";
import { handleProfile } from "./controllers/profile.js";

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json("connected")
})

app.post('/signin', handleSignin(db, bcrypt));

app.post('/register', handleRegister(db, bcrypt));

app.get('/profile/:id', handleProfile(db))

app.put('/image', handleImage(db))
app.post('/imageurl', handleApiCall())

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is on port${process.env.PORT}`)
});

/*
/ --> res = this is working
/signin --> POST  ? suc : fale
/regiser --> POST = user
/profile/:userId --> Get = user
/image --> PUT --> user

*/