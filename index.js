const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Suggestion = require(./models/Suggestion);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const Mongo_URI = 'your-mongo-uri-here';
mongoose.connect(Mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.post('/suggestions', async (req, res) => {
    try {
        const newSuggestion = new Suggestion(req.body);
        await newSuggestion.save();
        res.status(201).send(newSuggestion);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/suggestions', async (req, res) => {
    try {
        const suggestions = await Suggestion.find();
        res.send(suggestions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Middleware to parse request body
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
