// this is main
import express, { response } from 'express'
import bodyParser from 'body-parser'
import bcrypt, { hash } from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'

import register from './controller/register.cjs';
import signin from "./controller/signin.cjs";
import profile from './controller/profile.cjs';
import image from './controller/image.cjs'

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'smart-brain',
      database: 'smart-brain',
    },
  });

  db.select

const app = express()
app.use(bodyParser.json())
app.use(cors())


// const database = {
//     users : [
//         {
//             id: '123',
//             name: 'sangharsh',
//             password: 'cookies',
//             email: 'sangharsh@gmail.com',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'sally',
//             password: 'banana',
//             email: 'sally@gmail.com',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [
//         {
//             id: '987',
//             hash: '',
//             email: 'sangharsh@gmail.com'
//         }
//     ]
// }

app.get('/', (req,res) =>{ res.send(database.users)})
app.post('/signin', (req,res) => { signin.handelSignin(req,res,db,bcrypt)})
app.post('/register', (req,res) => { register.handelRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req,res) =>{ profile.handelProfiel(req,res,db)})
app.put('/image', (req,res) => { image.handelImage(req,res,db)})

// app.put("/image", (req, res) => {
//   const { id } = req.body;
//   db("users")
//     .where("id", "=", id)
//     .increment("entries", 1)
//     .returning("entries")
//     .then((entries) => {
//       res.json(entries[0]); // You can simply return the updated entries count
//     })
//     .catch((err) => res.status(400).json("unable to get entries"));
// });


app.listen(4000, ()=>{
    console.log('app is running on port 4000');
})


// --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile:userId --> GET = user
// /image --> PUT --> user