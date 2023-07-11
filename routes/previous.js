const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const History = require('../models/History');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dzxg41hqi',
    api_key: '968554488622792',
    api_secret: 'SKyx2VwvJa9qgjtiKESBsVsOS5I'
});


//Get all images
router.get('/fetchhistory', fetchuser, async (req, res) => {
    try {
        const history = await History.find({ user: req.user.id });
        res.json(history);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

// Add history
router.post('/addhistory', fetchuser, async (req, res) => {
    try {
      const { url, public_id, result } = req.body;
  
      // Checking if the history is not bigger than 2
      let history = await History.find({ user: req.user.id });
      const historySize = history.length;
      const maxImages = 6;
  
      if (historySize >= maxImages) {
        const historyEntry = await History.findOne({ user: req.user.id }).sort({ createdAt: 1 });
        if (historyEntry) {
          const publicId = historyEntry.public_id;
          await History.findOneAndDelete({ user: req.user.id }, null, { sort: { createdAt: 1 } });
  
          // Delete image from Cloudinary
          await cloudinary.uploader.destroy(publicId);
        }
      }
  
      const nhistory = new History({
        public_id,
        url,
        result,
        user: req.user.id
      });
  
      const savedhis = await nhistory.save();
      res.json(savedhis);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

module.exports = router