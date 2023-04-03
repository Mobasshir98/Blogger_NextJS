import dbConnect from '../../utils/db';
import User from '../../models/user';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  let { name, email, password } = req.body;

  email = email.toLowerCase()

  await dbConnect();

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const userType = email.includes("imt.com") ? "admin" : "author";


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
