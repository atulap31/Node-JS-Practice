import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true  // Add index for better query performance
    }
});

// Create compound index for better query performance when filtering by room and timestamp
messageSchema.index({ room: 1, timestamp: -1 });

export const messageModel = mongoose.model('Message', messageSchema);