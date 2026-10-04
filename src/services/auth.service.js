import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import AppError from "../utils/AppError.js";
import { createAccessToken ,createRefreshToken,verifyRefreshToken} from "../utils/jwt.js";
import Session from "../models/session.model.js";
import crypto from "crypto"


export const registerUserService = async (data) => {

    const existingUser = await User.findOne({
        email: data.email
    });

    if (existingUser) {
        throw new AppError("Email already exists", 409);
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        name: data.name,
        email: data.email,
        password: hashPassword
    });

    return user;
};


export const loginUserService = async (data) => {

    const existingUser = await User.findOne({
        email: data.email
    });

    if (!existingUser) {
        throw new AppError("Invalid credentials", 401);
    }

    const isPasswordCorrect = await bcrypt.compare(
        data.password,
        existingUser.password
    );

    if (!isPasswordCorrect) {
        throw new AppError("Invalid credentials", 401);
    }

    // Create session
    const session = new Session({
        userId: existingUser._id,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )
    });

    // Create refresh token
    const refreshToken = createRefreshToken(
        existingUser._id,
        session._id
    );

    // Hash refresh token
    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    // Store hash in session
    session.refreshTokenHash = refreshTokenHash;

    // Save session
    await session.save(); 

    // Create access token
    const accessToken = createAccessToken(existingUser._id);

    return {
        user: existingUser,
        accessToken,
        refreshToken
    };
};

export const refreshAccessTokenService = async (refreshToken) => {

    // 1. Check refresh token exists
    if (!refreshToken) {
        throw new AppError("Refresh token required", 401);
    }

    // 2. Verify old refresh token
    const payload = verifyRefreshToken(refreshToken);

    // 3. Get IDs from token
    const { userId, sessionId } = payload;

    // 4. Find session
    const session = await Session.findById(sessionId);

    if (!session) {
        throw new AppError("Invalid session", 401);
    }

    // 5. Check if session is revoked
    if (session.revoked) {
        throw new AppError("Session revoked", 401);
    }

    // 6. Check session expiry
    if (session.expiresAt < new Date()) {
        throw new AppError("Session expired", 401);
    }

    // 7. Hash the incoming refresh token
    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    // 8. Compare with database
    if (refreshTokenHash !== session.refreshTokenHash) {
        throw new AppError("Invalid refresh token", 401);
    }

    // 9. Create NEW access token
    const accessToken = createAccessToken(userId);

    // 10. Create NEW refresh token
    const newRefreshToken = createRefreshToken(
        userId,
        sessionId
    );

    // 11. Hash NEW refresh token
    const newRefreshTokenHash = crypto
        .createHash("sha256")
        .update(newRefreshToken)
        .digest("hex");

    // 12. Replace old refresh token hash
    session.refreshTokenHash = newRefreshTokenHash;

    // 13. Save updated session
    await session.save();

    // 14. Return both tokens
    return {
        accessToken,
        refreshToken: newRefreshToken
    };
};



// Logout

export const logoutUserService= async(refreshToken)=>{

      if(!refreshToken)
      {
        throw new AppError("Refresh Token required",401);
      }

      const payload= verifyRefreshToken(refreshToken);
       const { sessionId } = payload;
      const session = await Session.findById(sessionId);

      if(!session)
      {
        throw new AppError("Invalid session",401);
      }
      if(session.revoked)
      {
          throw new AppError("Session already revoked",401);
      }
      session.revoked= true;

      session.refreshTokenHash = newrefreshTokenHash;

      await session.save();
}