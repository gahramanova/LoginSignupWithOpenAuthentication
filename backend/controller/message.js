const Message = require('../models/messages');

exports.getAllMessages = async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: 1 });
    res.status(200).json(msgs);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
