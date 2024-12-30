import { model, Schema } from 'mongoose';


const challengeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Moderate', 'Hard'],
        required: true
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        functionName: {
            type: String,
            required: true
        },
        codeContent: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        inputDefinitions: [{
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        }]
    },
    testCases: [{
        weight: {
            type: Number,
            required: true,
            min: 0,
            max: 1
        },
        functionInputs: [{
            name: {
                type: String,
                required: true
            },
            value: {
                type: Schema.Types.Mixed,
                required: true
            }
        }],
        expectedOutput: {
            type: Schema.Types.Mixed,
            required: true
        }
    }]
}, {
    timestamps: true
});

export const Challenge = model('Challenge', challengeSchema, 'challenges');