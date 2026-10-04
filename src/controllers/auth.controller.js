import {
    registerUserService,
    loginUserService,
    refreshAccessTokenService,
    logoutUserService
} from "../services/auth.service.js";


// =========================
// REGISTER
// =========================

export const register = async (req, res, next) => {
    try {

        const user = await registerUserService(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
};


// =========================
// LOGIN
// =========================

export const login = async (req, res, next) => {
    try {

        const {
            user,
            accessToken,
            refreshToken
        } = await loginUserService(req.body);


        // Access Token Cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });


        // Refresh Token Cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
};


// =========================
// REFRESH ACCESS TOKEN
// =========================

export const refresh = async (req, res, next) => {
    try {

        // 1. Get old refresh token from cookie
        const refreshToken = req.cookies.refreshToken;

        // 2. Rotate tokens
        const {
            accessToken,
            refreshToken: newRefreshToken
        } = await refreshAccessTokenService(refreshToken);

        // 3. Set new access token
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        // 4. Set NEW refresh token
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // 5. Response
        return res.status(200).json({
            success: true,
            message: "Access token refreshed"
        });

    } catch (error) {
        next(error);
    }
};


// =========================
// LOGOUT
// =========================

export const logout = async (req, res, next) => {
    try {

        // Get refresh token from cookie
        const refreshToken = req.cookies.refreshToken;


        // Revoke session
        await logoutUserService(refreshToken);


        // Remove access token cookie
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });


        // Remove refresh token cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });


        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        next(error);
    }
};
