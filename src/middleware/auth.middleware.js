export const authMiddleware = (req, res, next) => {

    try {

        console.log("AUTH MIDDLEWARE REACHED");

        const token = req.cookies.accessToken;

        if (!token) {
            throw new AppError("Authentication required", 401);
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        console.log("USER:", req.user);

        next();

    } catch (error) {
        next(error);
    }
};