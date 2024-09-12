// @ts-nocheck
const User = require("./model");
const { generateToken, verifyToken, hashPassword, comparePassword } = require("./auth");

// Register new user
const registerUser = async (req, res) => {
    try {
        const { name, username, email, password, confirmPassword } = req.body;

        if (!name || !username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const usernameExist = await User.findOne({ username });
        if (usernameExist) {
            return res.status(400).json({ message: "This username is taken" });
        }

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

        if (password.length < 6 || !hasUpperCase || !hasNumber || !hasSpecialCharacter) {
            return res.status(400).json({ message:
                "Password should meet the following conditions:\n" +
                "1. At least 6 characters long\n" +
                "2. Contains at least one uppercase letter\n" +
                "3. Contains at least one number\n" +
                "4. Contains at least one special character"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({
            name,
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({ user, token, message: "User created successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "No user found" });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = generateToken(user._id);
        res.status(200).json({ user, token, message: "Login successfull" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logout user
const logoutUser = (req, res) => {
    res.status(200).json({ message: "Logout successful" });
};

// Update user
const updateUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token);
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            decoded.userId,
            { name, email },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user, message: "User details updated"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token);
        const user = await User.findByIdAndDelete(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    updateUser,
    deleteUser
};

