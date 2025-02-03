import { ChallengeModel } from '../../../models/Challenge.js';
import { SubmissionModel } from '../../../models/Submission.js';


export class ChallengeService {

static async getChallengeById(challengeId, userId, isManager = false) {
    try {
        const challenge = await ChallengeModel.findById(challengeId);
        if (!challenge) {
            throw new Error('Challenge not found');
        }

        // Calculating solution rate
        const totalSubmissions = await SubmissionModel.countDocuments({ challenge: challengeId });
        const successfulSubmissions = await SubmissionModel.countDocuments({
            challenge: challengeId,
            status: 'passed'
        });
        const solutionRate = totalSubmissions > 0 ? (successfulSubmissions / totalSubmissions) * 100 : 0;

        // Getting challenge status for coder
        let status = 'Waiting';
        if (!isManager) {
            const submission = await SubmissionModel.findOne({
                challenge: challengeId,
                coder: userId
            }).sort({ createdAt: -1 });

            if (submission) {
                status = submission.status === 'passed' ? 'Completed' : 'Attempted';
            }
        }

        return {
            ...challenge.toObject(),
            solutionRate,
            status: isManager ? undefined : status
        };
    } catch (error) {
        throw new Error(`Failed to get challenge: ${error.message}`);
    }
}

}
