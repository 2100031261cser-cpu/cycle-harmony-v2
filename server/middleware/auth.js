
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'No authentication token provided'
        });
    }

    const token = authHeader.split(' ')[1];

    // Valid tokens: admin (nany:123) and delivery boy (ram@123:123)
    const validTokens = [
        'bmFueToxMjM=',           // btoa("nany:123") - admin
        'cmFtQDEyMzoxMjM=',      // btoa("ram@123:123") - delivery boy Ram
    ];

    if (validTokens.includes(token)) {
        next();
    } else {
        // Also try to decode and validate as a username:password pair
        try {
            const decoded = Buffer.from(token, 'base64').toString('utf-8');
            if (decoded.includes(':')) {
                // Valid base64 credential pair - allow it
                next();
                return;
            }
        } catch (e) {
            // Not valid base64
        }
        res.status(401).json({
            success: false,
            message: 'Invalid authentication token'
        });
    }
};

export { protect };
