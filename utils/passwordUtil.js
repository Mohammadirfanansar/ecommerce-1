const {compare,genSalt,hash}=require("bcrypt")

const generatePasswordHash=async (password)=>{
    const salt=await genSalt()
    const hashedPwd=hash(password,salt);
    console.log(hashedPwd)
    return hashedPwd
}

const verifyPassword=async (password,hash)=>{
    const isVerified=await compare(password,hash)
    return isVerified
}

// generatePasswordHash("Zulekha21%").then(console.log)

module.exports={generatePasswordHash,verifyPassword}