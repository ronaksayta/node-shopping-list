const express = require('express');
const mongoose = require('mongoose');
const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./auth/auth');
const config = require('config');
const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Configuration
const db = config.get('mongoURI');

// Connect to mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB Connected...')
    })
    .catch((error) => {
        console.log(error);
    })

const port = process.env.PORT || 5000;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    next();
});
app.use('/api', itemRouter);
app.use('/api', userRouter);
app.use('/api', authRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));