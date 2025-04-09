const User = require('../models/user');

// Controller for login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            req.session.user = { id: user._id, username: user.username };
            res.redirect('/profile');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
};


// Controller for signup
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        const savedUser = await newUser.save();
        req.session.user = { id: savedUser._id, username: savedUser.username };
        res.redirect('/gather');
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error: error.message });
    }
};

// Controller for gather
exports.gather = async (req, res) => {
    try {
        const { 
            Current_weight, 
            Desired_weight, 
            Height, 
            BMI, 
            Body_Fat_Percentage, 
            BMR, 
            RHR, 
            MHR, 
            LBM, 
            WHR, 
            VO2_Max, 
            Blood_Pressure, 
            Hydration_Level,
            Activity_Level,
            Age,
            Gender,
            Goal
        
        } = req.body;
        
        const userId = req.session.user.id;
        await User.findByIdAndUpdate(userId, {
            Current_weight, 
            Desired_weight, 
            Height, 
            BMI, 
            Body_Fat_Percentage, 
            BMR, 
            RHR, 
            MHR, 
            LBM, 
            WHR, 
            VO2_Max, 
            Blood_Pressure, 
            Hydration_Level,
            Activity_Level,
            Age,
            Gender,
            Goal
        
        });

        res.redirect('/profile');
    } catch (error) {
        res.status(500).json({ message: 'Error during data gathering', error: error.message });
    }
};


// Controller for logout
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.redirect('/');
    });
};

// Controller for profile
exports.profile = async (req, res) => {
    try {
        if (!req.session.user || !req.session.user.id) {
            return res.redirect('/');
        }
        
        const userId = req.session.user.id;
        const user = await User.findById(userId).exec();
        
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        res.render('profile', { user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile data', details: error.message });
    }
};
