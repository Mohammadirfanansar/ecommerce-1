const responseCreator=(message,data)=>{
    return {success:true,message,data}
}

const errorCreater=(message,status=500)=>{
    const err=new Error(message)
    err.status=status
    throw err
}

module.exports={responseCreator,errorCreater}