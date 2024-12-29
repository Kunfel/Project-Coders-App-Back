export const submitSolution = async (req, res) => {
    try {
      const { lang, code, challenge_id } = req.body;
      // Service implementation will be added later
      res.status(200).json({ message: 'Solution submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };