
import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['Coder', 'Manager'],
        required: true
    },
   
    is_verified: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: function() {
            return this.role === 'Coder';
        }
    },
    score: {
        type: Number,
        default: 0,
        required: function() {
            return this.role === 'Coder';
        }
    }
}, {
    timestamps: true
});

export const UserModel = model('User', userSchema, 'users');