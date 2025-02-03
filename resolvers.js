import { ChallengeModel } from './models/Challenge.js';

const resolvers = {
    challenges: async ({ category }, context) => {
        try {
            const query = category ? { category } : {};
            const challenges = await ChallengeModel.find(query)
                .populate('manager', '-password')
                .lean();

            // Add status and solution rate if user is authenticated
            if (context.user) {
                return challenges.map(challenge => ({
                    ...challenge,
                    status: 'NOT_ATTEMPTED',
                    solutionRate: 0
                }));
            }

            return challenges;
        } catch (error) {
            throw new Error('Error fetching challenges: ' + error.message);
        }
    },

    challenge: async ({ id }, context) => {
        try {
            const challenge = await ChallengeModel.findById(id)
                .populate('manager', '-password')
                .lean();

            if (!challenge) {
                throw new Error('Challenge not found');
            }

            // Add status and solution rate if user is authenticated
            if (context.user) {
                return {
                    ...challenge,
                    status: 'NOT_ATTEMPTED',
                    solutionRate: 0
                };
            }

            return challenge;
        } catch (error) {
            throw new Error('Error fetching challenge: ' + error.message);
        }
    },

    categories: async () => {
        try {
            const challenges = await ChallengeModel.distinct('category');
            return challenges;
        } catch (error) {
            throw new Error('Error fetching categories: ' + error.message);
        }
    }
};

export default resolvers;
