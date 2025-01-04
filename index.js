import express from 'express';
import authRouter from './routes/auth.router.js';
import challengeRouter from './routes/challenge.router.js';
import submissionRouter from './routes/submission.router.js';
import leaderboardRouter from './routes/leaderboard.router.js';
import statsRouter from './routes/stats.router.js';
import connectDB from './lib/db.js';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/challenges', challengeRouter);
app.use('/submissions', submissionRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/stats', statsRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
    connectDB();
});

export default app;
