import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import authRouter from './routes/auth.router.js';
import challengeRouter from './routes/challenge.router.js';
import submissionRouter from './routes/submission.router.js';
import leaderboardRouter from './routes/leaderboard.router.js';
import statsRouter from './routes/stats.router.js';
import schema from './schema.js';
import resolvers from './resolvers.js';
import { auth } from './middleware/auth.middleware.js';

const app = express();

app.use(express.json());

// REST endpoints
app.use('/auth', authRouter);
app.use('/challenges', challengeRouter);
app.use('/submissions', submissionRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/stats', statsRouter);

// GraphQL endpoint
app.use('/graphql',
    (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (token) {
                req.user = auth(token);
            }
        } catch (error) { }
        next();
    },
    graphqlHTTP((req) => ({
        schema,
        rootValue: resolvers,
        context: { user: req.user },
        graphiql: true
    }))
);

app.listen(3000);

export default app;
