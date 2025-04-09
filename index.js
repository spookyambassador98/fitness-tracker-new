const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const User = require('./models/user'); // Adjust path if necessary

const session = require('express-session');
const app = express();
const port = process.env.PORT || 3333;
const routes = require('./routes/newuserRoute'); // Adjust path if necessary

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));

// Session middleware
app.use(session({
    secret: '12312313',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Use routes
app.use('/api', routes);

app.set('view engine', 'ejs');

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/gather', (req, res) => {
    res.sendFile(__dirname + '/views/gather.html');
});

app.get('/profile', async (req, res) => {
    if (req.session.user) {
        try {
            const user = await User.findById(req.session.user.id).exec();
            res.render('profile', { user });
        } catch (error) {
            res.status(500).send('Failed to fetch user data');
        }
    } else {
        res.redirect('/');
    }
});

app.get('/report', async (req, res) => {
    if (req.session.user) {
        try {
            const user = await User.findById(req.session.user.id).exec();
            res.render('report', { user });
        } catch (error) {
            res.status(500).send('Failed to fetch user data');
        }
    } else {
        res.redirect('/');
    }
});

// Add this new route before your MongoDB connection
app.get('/feature1', async (req, res) => {
    if (req.session.user) {
        try {
            const user = await User.findById(req.session.user.id).exec();
            res.render('feature1', { user }); // We'll create this view next
        } catch (error) {
            res.status(500).send('Failed to fetch user data');
        }
    } else {
        res.redirect('/');
    }
});



// Connect to MongoDB
const mongoose_uri = 'mongodb+srv://bakuwork08:hYu8srEg0ZE56nv5@cluster0.wxcl4w9.mongodb.net/';
mongoose.connect(mongoose_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
