import dbConnect from '../../utils/db';
import User from '../../models/user';
import bcrypt from 'bcrypt';



export default async function handler(req, res) {
  let { email, password } = req.body;

  email=email.toLowerCase()

  await dbConnect();



  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    

    return res.status(200).json({ role:user.userType,userId:user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
