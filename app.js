const express = require('express');
const config = require('config');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require("./utils/errorHandler");

const PORT = process.env.PORT || config.get('port');

app.use(cors({
    //origin: 'https://hype1-dm2bhb1vv-lemann89.vercel.app',
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json({extended: true}));

app.use('/api/auth', require('./controllers/auth.controller'));
app.use('/api/posts', require('./controllers/post.controller'));
app.use('/api/user', require('./controllers/user.controller'));

app.use(errorHandler);

(async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
})();
