const speakeasy=require("speakeasy");
const QRcode=require("qrcode")


const generateQRcode=async(username)=>{
    const {base32:secret,otpauth_url}=speakeasy.generateSecret({name:username ,issuer:"irfan"})
    // console.log("base32 , otp path",secret,otpauth_url)

    const qrcode=await QRcode.toDataURL(otpauth_url)
    return {secret,qrcode}
}

const verifyOTP=(secret, otp)=>{
    const isVerified=speakeasy.totp.verify({
        secret,
        token:otp,
        encoding:"base32"
    });
    return isVerified;
}

// console.log("qr",generateQRcode().then(console.log))
module.exports={generateQRcode,verifyOTP}

//verifyOTP('LM7SIXKXF5YWONLDHRID63JTOVCHI22LLNBT4QTXKJQVCQT2GFQQ')
