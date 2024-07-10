const User = require('../models/User');
const generateToken = require('../utils/tokenUtils.js');
const { generateToken } = require('../utils/tokenUtils.js');

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try{
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });
    const token = generateToken(newUser._id);
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
};

exports.loginUser = async (req, res) => {
    const { email, password} = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({ message: 'User with Email not found' });
        } 

        if(user && (await user.matchPasswors(password))) {
            const token = generateToken(user._id);
            res.json({user, token});
        } else {
            res.status(401).json({ message: 'Invalid email or password'});
        }
    }
    catch (err){
        res.status(400).json({ message: err.message });
    }
};

