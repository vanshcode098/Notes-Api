import  jwt  from "jsonwebtoken"

export const createAccessToken= (userId)=>
    {
    return jwt.sign(
        {
        id: userId.toString()
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "15m"
    }
);
};

export const createRefreshToken= (userId,sessionId)=>{
    return jwt.sign(
        {
            userId: userId.toString(),
            sessionId: sessionId.toString()
        },
         process.env.JWT_REFRESH_SECRET,
         {
            expiresIn: "7d"
         }
    );
};

export const verifyRefreshToken= (token)=>{
    return jwt.verify(
        token,
            process.env.JWT_REFRESH_SECRET
    );
};