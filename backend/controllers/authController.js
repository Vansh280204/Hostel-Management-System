const authService = require('../services/authService');

const loginUser = async (req, res) => {
    try {
        const data = await authService.loginUser(req.body);

        res.status(200).json(data);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = loginUser;