
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'No authentication token provided'
        });
    }

    const token = authHeader.split(' ')[1];

    // Decrypt/Check token (matching AdminLogin.tsx logic: btoa("nany:123"))
    // "nany:123" in base64 is "bmFueToxMjM="
    if (token === 'bmFueToxMjM=') {
        next();
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid authentication token'
        });
    }
};

export { protect };
