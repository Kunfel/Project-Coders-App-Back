export const getLeaderboard = async (req, res) => {
  try {
    // Service implementation will be added later
    res.status(200).json({ leaderboard: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTopCoders = async (req, res) => {
  try {
    const { k = 10 } = req.query;
    // Service implementation will be added later
    res.status(200).json({ topCoders: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};