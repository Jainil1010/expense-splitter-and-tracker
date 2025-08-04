import { JWT_SECRET } from "../config/env.js";

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split( ' ' )[1];
        }

        if(!token) return res.status(404).json({ message: 'Unauthorized' });

        const decode = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decode.userId);

        if(!user) return res.status(401).json({ message: 'Unaothorized' });
        
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

export default authorize;