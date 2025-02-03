import { model, Schema } from 'mongoose';

const submissionSchema = new Schema({
    challenge: {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    coder: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submittedCode: {
        type: String,
        required: true
    },
    passed: {
        type: Boolean,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const SubmissionModel = model('Submission', submissionSchema, 'Submissions');