
let update_id = null;
const data = {
    "name": ["text", "name"],
    "Designation": ["text", "desc"],
    "Salary": ["number", "sal"],
    "City": ["text", "city"]
};

function add_menu() {
    document.getElementById("edit-form").style.display = "block";
    document.getElementById("update-form").style.display = "none";
    let str = '';
    for (let i in data) {
        //console.log(data[i][0]);
        str += `<div>${i}: <input class="input" id="emp-${data[i][1]}" type="${data[i][0]}" placeholder="Enter ${i}" required></div>`;
    }
    str += `
        <div><button onclick="add_employee()" class="btn">Add Data</button></div>
        <div><a onclick="exit_menu(1)" class="btn">close</a></div>`;

    document.getElementById("form-sec").innerHTML = str;
    document.getElementById("emp-name").value = "";
    document.getElementById("emp-desc").value = "";
    document.getElementById("emp-sal").value = "";
    document.getElementById("emp-city").value = "";
}

async function add_employee() {
    event.preventDefault();
    document.getElementById("alert").style.display = "none";
    let err = validate();
    if (err==='valid') {
        let city = document.getElementById("emp-city").value;
        let name = document.getElementById("emp-name").value;
        let desc = document.getElementById("emp-desc").value;
        let sal = parseFloat(document.getElementById("emp-sal").value);
        let str = {
            "name": name,
            "desc": desc,
            "sal": sal,
            "city": city
        };
        fetch("http://localhost:3000/saveData/", {
            method: "POST",
            body: JSON.stringify(str),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            console.log(typeof response.status);
            if (response.status == 200) {
                document.getElementById("alert").style.display = "block";
                document.getElementById("msg").innerHTML = response.json.message;
                document.getElementById("edit-form").style.display = "none";
                detailsDisplay();
            }
            else {
                document.getElementById("alert").style.display = "block";
                document.getElementById("msg").innerHTML = response.json.message;
            }
        }).catch(error => {
            console.error(error);
            alert('Failed to retrieve data. Please try again later.');
        });

    }
    else {
        document.getElementById("alert").style.display = "block";
        document.getElementById("msg").innerHTML = err;
    }
}

function validate() {
    let city = document.getElementById("emp-city").value;
    let name = document.getElementById("emp-name").value;
    let sal = document.getElementById("emp-sal").value;
    let desc = document.getElementById("emp-desc").value;
    if (/\d/.test(city)) {
        return 'Enter Valid city Name';
    }
    else if (/\d/.test(name)) {
        return 'Enter Valid Name';
    }
    else if (city == '' || name == '' || sal == '' || desc == '') {
        return 'All data are required';
    }
    else {
        return 'valid';
    }
}


async function detailsDisplay() {

    document.getElementById("alert").style.display = "none";
    let tag = document.getElementById("main-table").innerHTML = "";
    document.getElementById("main-table").innerHTML = `
        <div class="row-data row-head">
            <div><a>Employee Id</a></div>
            <div><a>Name</a></div>
            <div><a>Designation</a></div>
            <div><a>Salary</a></div>
            <div><a>City</a></div>
            <div><a>Action</a></div>
        </div>`;

    await fetch("http://localhost:3000/getData/").then(res => {
        return res.json();
    }).then(res => {
        res.forEach(local => {
            //console.log(local);
            document.getElementById("main-table").innerHTML += `
            <div class="row-data">
                <div><a>${local.empid}</a></div>
                <div><a>${local.empname}</a></div>
                <div><a>${local.des}</a></div>
                <div><a>${local.sal}</a></div>
                <div><a>${local.city}</a></div>
                <div><a class="btn" id="btne" onclick="edit(${local.empid})">Edit</a><a class="btn" id="btnd" onclick="del(${local.empid})" style="margin:10px;">Delete</a></div>
            </div>`;
        });
    })

}


function exit_menu(i) {
    if (i == 1) {
        document.getElementById("edit-form").style.display = "none";
    }
    if (i == 2) {
        document.getElementById("update-form").style.display = "none";
    }
}

function edit(index) {
    document.getElementById("edit-form").style.display = "none";
    let str = '';
    for (let i in data) {
        //console.log(data[i][0]);
        str += `<div>${i}: <input class="input" id="emp-${data[i][1]}-u" type="${data[i][0]}" placeholder="Enter ${i}" required></div>`;
    }
    str += `
    <div><button onclick="update_employee()" class="btn">Update Data</button></div>
    <div><a onclick="exit_menu(2)" class="btn">close</a></div>`;

    document.getElementById("form-up").innerHTML = str;
    fetch('http://localhost:3000/getData/', {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => {
        return res.json();
    }).then(list => {
        list.forEach(local => {
            if (local.empid == index) {
                document.getElementById("emp-name-u").value = local.empname;
                document.getElementById("emp-desc-u").value = local.des;
                document.getElementById("emp-sal-u").value = local.sal;
                document.getElementById("emp-city-u").value = local.city;
            }
        });
    });
    update_id = index;
    document.getElementById("update-form").style.display = "block";


}

function update_employee() {
    event.preventDefault();
    //console.log(update_id);
    let err = validate1();
    if (err==='valid') {

        let city = document.getElementById("emp-city-u").value;
        let name = document.getElementById("emp-name-u").value;
        let desc = document.getElementById("emp-desc-u").value;
        let sal = parseFloat(document.getElementById("emp-sal-u").value);
        let str = {
            "id": update_id,
            "name": name,
            "desc": desc,
            "sal": sal,
            "city": city
        };

        fetch('http://localhost:3000/updateData/',{
            method:"PUT",

            body: JSON.stringify(str),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        }).then(res=>{
            return res.json();
        }).then(result=>{
            //console.log(result);
            detailsDisplay();
        });
        document.getElementById("update-form").style.display = "none";
    }
    else {
        document.getElementById("alert").style.display = "block";
        document.getElementById("msg").innerHTML = err;
    }
}


function validate1() {
    let city = document.getElementById("emp-city-u").value;
    let name = document.getElementById("emp-name-u").value;
    let sal = document.getElementById("emp-sal-u").value;
    let desc = document.getElementById("emp-desc-u").value;

    if (/\d/.test(city)) {
        return 'Enter Valid city Name';
    }
    else if (/\d/.test(name)) {
        return 'Enter Valid Name';
    }

    else if (/\d/.test(desc)) {
        return 'Enter Valid Designation';
    }

    else if (city == '' || name == '' || sal == '' || desc == '') {
        return 'All data are required';
    }
    else {
        return 'valid';
    }
}


function del(i) {
    console.log(i);
    const data={
        "id" : i
    };
    fetch('http://localhost:3000/deleteData/',{

        method:"DELETE",

        body:JSON.stringify(data),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    }).then(location.reload());
}
