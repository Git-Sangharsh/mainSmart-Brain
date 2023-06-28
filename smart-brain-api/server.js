import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const database = {
    users : [
        {
            id: '123',
            name: 'sangharsh',
            password: 'cookies',
            email: 'sangharsh@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            password: 'banana',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'sangharsh@gmail.com'
        }
    ]
}

app.get('/', (req,res) =>{
    res.send(database.users)
})

app.post('/signin',(req,res) => {
// // Load hash from your password DB.
//     bcrypt.compare("sangharsh6969", '$2a$10$iV/EcMc1Ggp5NRa6iMzaDOYFdkah/s57BpGiEzajoKNRr9AQyoqgm', function(err, res) {
//         console.log("first Guess",res)
//     });
//     bcrypt.compare("veggies", '$2a$10$iV/EcMc1Ggp5NRa6iMzaDOYFdkah/s57BpGiEzajoKNRr9AQyoqgm', function(err, res) {
//         console.log("second Guess",res)
//     });
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json('Success')
        } else{
            res.status(400).json('error logging in')
        }
        res.send('working on it')
})

app.post('/register',(req,res) => {
    const { email, name, password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res) =>{
    const { id } = req.params;
    let found = false
    database.users.forEach( user => {
        if(user.id === id){
            found = true
            return res.json(user)
        }
    })
    if(!found){
        res.status(404).json('user not found')
    }
})

app.put('/image',(req,res) =>{
    const { id } = req.body;
    let found = false
    database.users.forEach( user => {
        if(user.id === id){
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if(!found){
        res.status(404).json('user not found')
    }
})




app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})


// --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile:userId --> GET = user
// /image --> PUT --> user