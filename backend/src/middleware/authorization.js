const authorization = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied!, you need sign in as a Admin.' });
        }
        next();
    };
};

export default authorization;