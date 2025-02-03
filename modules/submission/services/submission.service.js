import axios from 'axios';
import { SubmissionModel } from '../../../models/Submission.js';
import { ChallengeModel } from '../../../models/Challenge.js';
import { UserModel } from '../../../models/User.js';

const CODE_RUNNER_URL = 'https://runlang-v1.onrender.com/run';

export class SubmissionService {
    static async submitAndGrade(submissionData, coderId) {
        try {
            // Checking if challenge already solved
            const existingSolution = await SubmissionModel.findOne({
                challenge: submissionData.challenge_id,
                coder: coderId,
                status: 'passed'
            });

            if (existingSolution) {
                throw new Error('Challenge already solved');
            }

            // Getting challenge details
            const challenge = await ChallengeModel.findById(submissionData.challenge_id);
            if (!challenge) {
                throw new Error('Challenge not found');
            }

            // Preparing grading payload
            const gradingPayload = {
                lang: submissionData.lang,
                code: submissionData.code,
                func_name: challenge.code.functionName,
                tests: challenge.testCases.map(test => ({
                    _id: test._id.toString(),
                    inputs: test.functionInputs,
                    output: test.expectedOutput
                }))
            };

            // Calling code runner
            const response = await axios.post(CODE_RUNNER_URL, gradingPayload);
            const result = response.data;

            // Calculating score if tests passed
            let score = 0;
            if (result.status === 'passed') {
                score = challenge.testCases.reduce((acc, test) => acc + (test.weight * 100), 0);
                
                // Updating user's total score
                await UserModel.findByIdAndUpdate(
                    coderId,
                    { $inc: { totalScore: score } }
                );
            }

            // Creating submission record
            const submission = new SubmissionModel({
                challenge: submissionData.challenge_id,
                coder: coderId,
                submittedCode: submissionData.code,
                status: result.status,
                score,
                testResults: result.test_results
            });

            await submission.save();
            return {
                status: result.status,
                score,
                message: result.message,
                testResults: result.test_results
            };

        } catch (error) {
            throw new Error(`Grading failed: ${error.message}`);
        }
    }
}