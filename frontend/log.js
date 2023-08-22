const emailValidation=()=>{
    const mail=document.getElementById('email').value;
    const ext=mail.split('.');
    if(!['com','net','org','co','us'].includes(ext[1]) || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))){
        document.getElementById('email').classList.add('error');
        return false;
    }
    else{
        return true;
    }
}


const login = () =>{
    if(emailValidation()){
        let email = document.getElementById("email").value;
        let pwd = parseFloat(document.getElementById("pwd").value);
        let str = {
            "email": email,
            "pwd": pwd,
        };

        fetch('http://localhost:3000/user/getUser/', {
            method: "POST",

            body: JSON.stringify(str),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        }).then((res)=>{
            return res.json;
        }).then((res)=>{
            if(res.message==='undefined'){
                //alert("The User Does Not Exits");
               // window.location="http://localhost:3000/signup/";
                console.log("he");
            }
            else{
                console.log(res);
            };
        });

    }
}
