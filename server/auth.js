// @ts-nocheck
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const SECRET_KEY=process.env.JWT_SECRET;

const generateToken=(userId)=>{
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1hr' });
}

const verifyToken=(token)=>{
    return jwt.verify(token, SECRET_KEY);
}

const hashPassword=async(password)=>{
    const saltRounds=12;
    try{
        const salt=await bcrypt.genSalt(saltRounds);
        const hashedPassword=await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch(error){
        throw error;
    }
};

const comparePassword=async(password, hashed)=>{
    try{    
        const isMatch=await bcrypt.compare(password, hashed);
        return isMatch;
    }
    catch(error){
        throw error;
    }
}

module.exports={
    generateToken,
    verifyToken,
    hashPassword,
    comparePassword
}