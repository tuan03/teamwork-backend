const userModel = require('../../models/userModel');

// Function for user registration
async function registerUser(req, res) {
    try {
        // Validate user data from req.body
        const { error } = validateUserData(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Create a new user using userModel
        const newUser = await userModel.create(req.body);
        
        // Redirect to the main website
        res.redirect('/');

    } catch (error) {
        // Handle error if registration fails
        console.error('User registration failed:', error);
        res.status(500).json({ error: 'User registration failed' });
    }
}

// Function for user login
async function loginUser(req, res) {
    try {
        // Make a POST request to the API endpoint for user login using userModel
        const response = await userModel.login(req.body);

        // Return the logged-in user from the API response
        res.json(response);
    } catch (error) {
        // Handle error if login fails
        console.error('User login failed:', error);
        res.status(500).json({ error: 'User login failed' });
    }
}

// Function for user logout
async function logoutUser(req, res) {
    try {
        // Make a POST request to the API endpoint for user logout using userModel
        const response = await userModel.logout(req.body);

        // Return the logout message from the API response
        res.json(response);
    } catch (error) {
        // Handle error if logout fails
        console.error('User logout failed:', error);
        res.status(500).json({ error: 'User logout failed' });
    }
}

// Function for updating user information
async function updateUser(req, res) {
    try {
        // Make a PUT request to the API endpoint for updating user information using userModel
        const response = await userModel.update(req.params.userId, req.body);

        // Return the updated user from the API response
        res.json(response);
    } catch (error) {
        // Handle error if update fails
        console.error('User update failed:', error);
        res.status(500).json({ error: 'User update failed' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUser
};
