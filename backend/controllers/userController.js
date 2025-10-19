import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.json(users);
};

// Get profile of currently authenticated user
export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile of currently authenticated user
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { name, email, phone, address } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

  // update allowed fields
  if (name) user.name = name;
  // email changes are not permitted via this endpoint
  if (phone !== undefined) user.phone = phone;
  if (address !== undefined) user.address = address;

    await user.save();

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    };

    res.json({ user: safeUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
