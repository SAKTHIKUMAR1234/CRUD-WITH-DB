const getStatus=(result)=>{
    if(result instanceof Error){
        return 500;
    }
    else{
        return 200;
    }
}

const getMessage=(result)=>{
    if(result instanceof Error){
        return result;
    }
    else{
        return "Success";
    }
}

module.exports={
    getStatus,
    getMessage
}