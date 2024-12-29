export const registerCoder = async (req, res) => {
    try {
      // Service implementation will be added later
      res.status(201).json({ message: 'Coder registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const registerManager = async (req, res) => {
    try {
      // Service implementation will be added later
      res.status(201).json({ message: 'Manager registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const loginCoder = async (req, res) => {
    try {
      // Service implementation will be added later
      res.status(200).json({ message: 'Coder logged in successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const loginManager = async (req, res) => {
    try {
      // Service implementation will be added later
      res.status(200).json({ message: 'Manager logged in successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  };export const getCoderProfile = async (req, res) => {
    try {
      // Service implementation will be added later
      res.status(200).json({ message: 'Coder profile fetched successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export const getManagerProfile = async (req, res) => {
    try {
      // Service implementation will be added later
      res.status(200).json({ message: 'Manager profile fetched successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateCoderProfile = async (req, res) => {
    try {
      // Service implementation will be added later
      res.status(200).json({ message: 'Coder profile updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateManagerProfile = async (req, res) => {
    try {    
      // Service implementation will be added later
      res.status(200).json({ message: 'Manager profile updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

