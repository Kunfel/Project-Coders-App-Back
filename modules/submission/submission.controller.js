import { SubmissionService } from './services/submission.service.js';

export const submitSolution = async (req, res) => {
    try {
        const { lang, code, challenge_id } = req.body;
        const result = await SubmissionService.submitAndGrade(
            { lang, code, challenge_id },
            req.user._id
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};