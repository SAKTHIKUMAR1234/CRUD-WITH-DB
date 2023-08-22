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
const nameValidation=()=>{
    const name=document.getElementById('frname').value+document.getElementById('lsname').value;
    console.log(name);
    if(/^[a-zA-Z]/.test(name)){
        console.log("hei")
        return true;
    }
    document.getElementById('frname').classList.add('error');
    document.getElementById('lsname').classList.add('error');
    return false;
}

const passwordValidation=()=>{
    if(document.getElementById('pwd').value===document.getElementById('repwd').value){
        return true;
    }
    document.getElementById('pwd').classList.add('error');
    document.getElementById('repwd').classList.add('error');
    return false;
}



const validation=()=>{
    if(nameValidation() && emailValidation() && passwordValidation()){
        let fname = document.getElementById("frname").value;
        let lname = document.getElementById("lsname").value;
        let email = document.getElementById("email").value;
        let pwd = parseFloat(document.getElementById("pwd").value);
        let str = {
            "fname": fname,
            "lname": lname,
            "email": email,
            "pwd": pwd,
        };

        fetch('http://localhost:3000/user/createUser/', {
            method: "POST",

            body: JSON.stringify(str),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        }).then((res)=>{
            if(res.status==200){
                window.location.href = "login.html";
            }
            else{
                alert(res.json.message);
            }
        });
    }
}