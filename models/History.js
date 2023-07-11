const mongoose = require('mongoose')
const { Schema } = mongoose

const HistorySchema = new Schema(
    {
        user: { //it is added so that the notes of someone else cannot be accessed by someone 
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
            ref: 'user'
        },
        
        public_id: {
            type: String,
            required: true
        },

        url: {
            type: String,
            required: true
        },

        result: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        }
    }
);

const History = mongoose.model('histories', HistorySchema)
module.exports = History