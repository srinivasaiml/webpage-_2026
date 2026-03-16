const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/authMiddleware');

const Visitor = require('../models/visitorModel'); 
const Contact = require('../models/Contact'); // Using capital 'C'

router.use(protectAdmin);

router.get('/stats', async (req, res) => {
  try {
    const totalVisits = await Visitor.countDocuments();
    const totalMessages = await Contact.countDocuments();
    
    // Get stats by status
    const messageStats = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    const byStatus = messageStats.reduce((acc, stat) => {
      acc[stat._id || 'new'] = stat.count;
      return acc;
    }, {});

    res.json({
      success: true,
      data: { 
        totalVisits, 
        totalMessages, 
        byStatus,
        new: byStatus.new || 0
      },
    });
  } catch (error) {
    console.error('--- CRASH IN /api/admin/stats ---', error);
    res.status(500).json({ success: false, message: 'Server failed to fetch stats.' });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('--- CRASH IN /api/admin/messages ---', error);
    res.status(500).json({ success: false, message: 'Server failed to fetch messages.' });
  }
});

module.exports = router;