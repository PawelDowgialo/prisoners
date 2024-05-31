const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const myDataBase = "myDB";
const url = `mongodb://127.0.0.1:27017/${myDataBase}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Connection error:', err.message));

// User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.age = req.body.age || user.age;
        user.imageUrl = req.body.imageUrl || user.imageUrl;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete("/api/users/:id", async (req, res)=>{
        const userId = req.params.id
        try{
            const deletedUser = await User.findByIdAndDelete(userId)
            if(!deletedUser){
                return res.status(404).json({message:"User not found"})
            }
            res.json({message:"User deleted hurrraaa!"})
        }catch(err){
            res.status(500).json({message: err.message})
        }
    })
    

// Server start
app.listen(PORT, () => console.log(`Server express is running on port ${PORT}`));


process.on('SIGINT', async () => {
    console.log('Closing MongoDB');
    try {
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
    } catch (err) {
        console.log(`Closing MongoDB error: ${err.message}`);
    } finally {
        process.exit();
    }
});
