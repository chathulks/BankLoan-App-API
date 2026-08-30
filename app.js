function loadUserTable() {
    fetch("https://api.freeprojectapi.com/api/BankLoan/GetAllUsers")
        .then(response => response.json())
        .then(data => {
            const user = data.data;
            let body = `
                    <caption>List of users</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Full Name</th>
                            <th>Role</th>
                            <th>Created Date</th>
                            <th>Password</th>
                            <th class="d-flex justify-content-center align-items-center">Action</th>
                        </tr>
                    </thead>
            `;

            user.forEach(element => {
                body += `
                    <tbody>
                        <tr>
                            <td class="bg-danger bg-opacity-75 text-white"><div class="d-flex align-items-center m-1">${element.userId}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.userName}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.emailId}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.fullName}</div></td>
                            <td class="bg-dark bg-opacity-75 text-white"><div class="d-flex align-items-center m-1">${element.role}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.createdDate}</div></td>
                            <td><div class="d-flex m-1 align-items-center">${element.password}</div></td>
                            <td class="d-flex justify-content-center align-items-center">
                                <button class="btn border-0 p-0 m-1 delete-btn">
                                    <i class="bi bi-trash3-fill text-danger" style="font-size: 17px;" onclick="deleteUser()"></i>
                                </button>
                                <button class="btn border-0 p-0 m-1 update-btn">
                                    <i class="bi bi-pencil-square text-primary" style="font-size: 17px;" onclick="updateUserDataSet()"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                `;
            });
            document.getElementById("user-table").innerHTML = body;
        });
}

function newUserFieldClear() {
    document.getElementById("nu_id").value = "";
    document.getElementById("nu_name").value = "";
    document.getElementById("nu_fullname").value = "";
    document.getElementById("nu_email").value = "";
    document.getElementById("nu_pw").value = "";
}

function new_userAdd() {

    let nuId = document.getElementById("nu_id").value;
    let nuUname = document.getElementById("nu_name").value;
    let nuFullname = document.getElementById("nu_fullname").value;
    let nuEmail = document.getElementById("nu_email").value;
    let nuPw = document.getElementById("nu_pw").value;

    const newUser = {
        "userId": nuId,
        "userName": nuUname,
        "emailId": nuEmail,
        "fullName": nuFullname,
        "password": nuPw
    }

    fetch("https://api.freeprojectapi.com/api/BankLoan/RegisterAsBankUser", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then(data => {

            loadUserTable(data);
            newUserFieldClear();

            const modalElement = document.getElementById("modal-1");
            const modal_one = bootstrap.Modal.getInstance(modalElement);
            modal_one.hide();

            console.log(data);
        });

}

let deleteUserListenerAdded = false;

function deleteUser() {

    if (deleteUserListenerAdded) {
        return;
    }

    const table = document.getElementById("user-table");

    table.addEventListener("click", function (event) {

        const deleteButton = event.target.closest(".delete-btn");

        if (!deleteButton) {
            return;
        }

        const row = event.target.closest("tr");

        if (!row || row.parentElement.tagName === "THEAD") {
            return;
        }

        const cells = row.querySelectorAll("td");

        const id = cells[0].textContent.trim();

        console.log("ID:", id);

        fetch(`https://api.freeprojectapi.com/api/BankLoan/DeleteUserByUserId?userId=${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                loadUserTable();
            });
    });

    deleteUserListenerAdded = true;
}

let updateUserListenerAdded = false;

function updateUserDataSet() {

    if (updateUserListenerAdded) {
        return;
    }

    const table = document.getElementById("user-table");

    table.addEventListener("click", function (event) {

        const updateButton = event.target.closest(".update-btn");

        if (!updateButton) {
            return;
        }

        const row = event.target.closest("tr");

        // Ignore table header
        if (!row || row.parentElement.tagName === "THEAD") {
            return;
        }

        const cells = row.querySelectorAll("td");

        const id = cells[0].textContent;
        const uname = cells[1].textContent;
        const email = cells[2].textContent;
        const full_name = cells[3].textContent;
        const role = cells[4].textContent;
        const c_date = cells[5].textContent;
        const pw = cells[6].textContent;

        const modal = new bootstrap.Modal(
            document.getElementById("modal-3")
        );

        document.getElementById("uu_id").value = id;
        document.getElementById("uu_name").value = uname;
        document.getElementById("uu_fullname").value = full_name;
        document.getElementById("uu_email").value = email;
        document.getElementById("uu_pw").value = pw;
        document.getElementById("uu_cd").value = c_date;
        document.getElementById("uu_role").value = role;

        modal.show();

    });
    updateUserListenerAdded = true;
}

function updateInputFieldClear() {
    document.getElementById("uu_id").value = "";
    document.getElementById("uu_name").value = "";
    document.getElementById("uu_fullname").value = "";
    document.getElementById("uu_email").value = "";
    document.getElementById("uu_pw").value = "";
    document.getElementById("uu_cd").value = "";
    document.getElementById("uu_role").value = "";
}

function update() {

    let uu_id = document.getElementById("uu_id").value;
    let username = document.getElementById("uu_name").value;
    let email = document.getElementById("uu_email").value;
    let full_name = document.getElementById("uu_fullname").value;
    let role = document.getElementById("uu_role").value;
    let create_date = document.getElementById("uu_cd").value;
    let pw = document.getElementById("uu_pw").value;

    const userData =
    {
        "userId": uu_id,
        "userName": username,
        "emailId": email,
        "fullName": full_name,
        "role": role,
        "createdDate": create_date,
        "password": pw,
        "projectName": "BankLoan",
        "refreshToken": null,
        "refreshTokenExpiryTime": null
    };

    fetch("https://api.freeprojectapi.com/api/BankLoan/UpdateUser", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {

            loadUserTable();
            updateInputFieldClear();

            const modalElement = document.getElementById("modal-3");
            const modal_one = bootstrap.Modal.getInstance(modalElement);
            modal_one.hide();

            console.log(data.message);
        });
}

function newCustomerFieldClear() {
    document.getElementById("cus_id").value = "";
    document.getElementById("cus_name").value = "";
    document.getElementById("cus_fullname").value = "";
    document.getElementById("cus_email").value = "";
    document.getElementById("cus_pw").value = "";
}

function new_customerAdd() {

    let cusId = document.getElementById("cus_id").value;
    let cusUname = document.getElementById("cus_name").value;
    let cusFullname = document.getElementById("cus_fullname").value;
    let cusEmail = document.getElementById("cus_email").value;
    let cusPw = document.getElementById("cus_pw").value;

    const newCustomer = {
        "userId": cusId,
        "userName": cusUname,
        "emailId": cusEmail,
        "fullName": cusFullname,
        "password": cusPw
    }

    fetch("https://api.freeprojectapi.com/api/BankLoan/RegisterCustomer", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer)
    })
        .then(response => response.json())
        .then(data => {

            loadUserTable();
            newCustomerFieldClear();

            const modalElement = document.getElementById("modal-2");
            const modal_one = bootstrap.Modal.getInstance(modalElement);
            modal_one.hide();

            console.log(data);
        });

}

function changeApplicationStatus() {
    let pan_card = document.getElementById("pan_num").value;
    let app_st = document.getElementById("app_status").value;

    fetch(`https://api.freeprojectapi.com/api/BankLoan/CheckApplicationStatus?panNo=${pan_card}&status=${app_st}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

let setPanCardNumberListenerAdded = false;

function setPanCardNumber() {

    if (setPanCardNumberListenerAdded) {
        return;
    }

    const table_application = document.getElementById("application-table");

    table_application.addEventListener("click", function (event) {

        const changeStatusButton = event.target.closest(".changeStatus-btn");

        if (!changeStatusButton) {
            return;
        }

        const row = event.target.closest("tr");

        // Ignore table header
        if (!row || row.parentElement.tagName === "THEAD") {
            return;
        }

        const cells = row.querySelectorAll("td");

        const pan_card = cells[8].textContent;

        const modal = new bootstrap.Modal(
            document.getElementById("modal-5")
        );


        document.getElementById("pan_num").value = pan_card;

        modal.show();
    });

    setPanCardNumberListenerAdded = true;
}

function loadApplicationTable() {
    fetch("https://api.freeprojectapi.com/api/BankLoan/GetAllApplications")
        .then(response => response.json())
        .then(data => {
            const user = data.data;
            let body = `
                    <caption>List of Application</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Employement Status</th>
                            <th>Customer Mobile</th>
                            <th>Assigned Bank Employee</th>
                            <th>Pan Card</th>
                            <th>Action</th>
                        </tr>
                    </thead>
            `;

            user.forEach(element => {
                body += `
                    <tbody>
                        <tr>
                            <td class="bg-danger bg-opacity-75 text-white"><div class="d-flex align-items-center m-1">${element.applicantID}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.dateApplied}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.applicationStatus}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.fullName}</div></td>
                            <td class="bg-dark bg-opacity-75 text-white"><div class="d-flex align-items-center m-1">${element.email}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.employmentStatus}</div></td>
                            <td><div class="d-flex m-1 align-items-center">${element.customerPhone}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.assignedToBankEmployee}</div></td>
                            <td><div class="d-flex m-1 align-items-center">${element.panCard}</div></td>
                            <td>
                                <button class="btn border-0 p-0 m-1 changeStatus-btn">
                                    <i class="bi bi-arrow-up-right-square text-primary" style="font-size: 17px;" onclick="setPanCardNumber()"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                `;
            });
            document.getElementById("application-table").innerHTML = body;
        });
    allCallMy();
}

function dateSet() {
    const now = new Date();

    const formattedDate =
        now
            .toLocaleString("sv-SE", {
                timeZone: "Asia/Colombo"
            })
            .replace(" ", "T")
            .replace(",", ".") + ".000Z";

    document.getElementById("app_date").value = formattedDate;
}

function saveApplicationFieldClear() {
    document.getElementById("full_name").value = "";
    document.getElementById("as_data").selectedIndex = 0;
    document.getElementById("pan_card").value = "";
    document.getElementById("dob").value = "";

    document.getElementById("email").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("address").value = "";
    document.getElementById("city").selectedIndex = 0;
    document.getElementById("state").value = "";
    document.getElementById("zip_code").value = "";
    document.getElementById("a_income").value = "";
    document.getElementById("e_status").selectedIndex = 0;
    document.getElementById("c_score").value = "";
    document.getElementById("assets").value = "";
    document.getElementById("app_date").value = "";

    document.getElementById("l_id").value = "";
    document.getElementById("app_id").value = "";
    document.getElementById("bank_name").value = "";
    document.getElementById("l_amount").value = "";
    document.getElementById("emi").value = "";
    document.getElementById("cus_id").selectedIndex = 0;
}

function userIDload() {

    let cus_id = document.getElementById("cus_id");

    fetch("https://api.freeprojectapi.com/api/BankLoan/GetAllUsers")
        .then(response => response.json())
        .then(data => {
            const user = data.data;

            let drop = `
                <option selected>Select</option>
            `;

            user.forEach(element => {
                drop += `
                    <option value="${element.userId}">${element.userId}</option>
                `
            });
            cus_id.innerHTML = drop;
        });

}

function saveApplication() {

    let full_name = document.getElementById("full_name").value;
    let as_data = document.getElementById("as_data").value;
    let pan_card = document.getElementById("pan_card").value;
    let dob = document.getElementById("dob").value;

    const now = new Date(dob);

    const formattedDate =
        now
            .toLocaleString("sv-SE", {
                timeZone: "Asia/Colombo"
            })
            .replace(" ", "T")
            .replace(",", ".") + ".000Z";

    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zip_code = document.getElementById("zip_code").value;
    let a_income = document.getElementById("a_income").value;
    let e_status = document.getElementById("e_status").value;
    let c_score = document.getElementById("c_score").value;
    let assets = document.getElementById("assets").value;
    let app_date = document.getElementById("app_date").value;

    let l_id = document.getElementById("l_id").value;
    let app_id = document.getElementById("app_id").value;
    let bank_name = document.getElementById("bank_name").value;
    let l_amount = document.getElementById("l_amount").value;
    let emi = document.getElementById("emi").value;
    let cus_id = document.getElementById("cus_id").value;

    const application = {
        "applicantID": app_id,
        "fullName": full_name,
        "applicationStatus": as_data,
        "panCard": pan_card,
        "dateOfBirth": formattedDate,
        "email": email,
        "phone": mobile,
        "address": address,
        "city": city,
        "state": state,
        "zipCode": zip_code,
        "annualIncome": a_income,
        "employmentStatus": e_status,
        "creditScore": c_score,
        "assets": assets,
        "dateApplied": app_date,
        "loans": [
            {
                "loanID": l_id,
                "applicantID": app_id,
                "bankName": bank_name,
                "loanAmount": l_amount,
                "emi": emi
            }
        ],
        "customerId": cus_id
    }

    console.log(application);

    fetch("https://api.freeprojectapi.com/api/BankLoan/AddNewApplication", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application)
    })
        .then(response => response.json())
        .then(data => {

            loadApplicationTable();
            saveApplicationFieldClear();

            const modalElement = document.getElementById("modal-4");
            const modal_one = bootstrap.Modal.getInstance(modalElement);
            modal_one.hide();

            console.log(data);
        });

}

function userIDUseSearchApplication() {

    let user_id = document.getElementById("search_user_id").value;

    fetch(`https://api.freeprojectapi.com/api/BankLoan/GetMyApplications?customerId=${user_id}`)
        .then(response => response.json())
        .then(data => {
            const user = data.data;
            let body = `
                    <caption>List of Application</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Employement Status</th>
                            <th>Assigned Bank Employee</th>
                            <th>Pan Card</th>
                        </tr>
                    </thead>
            `;

            user.forEach(element => {
                body += `
                    <tbody>
                        <tr>
                            <td class="bg-danger bg-opacity-75 text-white"><div class="d-flex align-items-center m-1">${element.applicantID}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.dateApplied}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.applicationStatus}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.employmentStatus}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.assignedToBankEmployee}</div></td>
                            <td><div class="d-flex m-1 align-items-center">${element.panCard}</div></td>
                        </tr>
                    </tbody>
                `;
            });
            document.getElementById("application-table").innerHTML = body;
        });
    allCallMy();
}

function userIDandNameload() {

    let cus_name_id = document.getElementById("search_user_id");

    fetch("https://api.freeprojectapi.com/api/BankLoan/GetAllUsers")
        .then(response => response.json())
        .then(data => {
            const user = data.data;

            let dropdown = `
                <option selected>Select User ID Searching Your Application</option>
            `;

            user.forEach(element => {
                dropdown += `
                    <option value="${element.userId}">${element.userId + " / " + element.fullName}</option>
                `
            });
            cus_name_id.innerHTML = dropdown;
        });

}

function employeesIDandNameload() {

    let emp_name_id = document.getElementById("search_emp_id");

    fetch("https://api.freeprojectapi.com/api/BankLoan/GetAllUsers")
        .then(response => response.json())
        .then(data => {

            const employee = data.data;
            let dropdown_emp = `
                        <option selected>Select Employee ID Searching Assigneed Application</option>
                    `;

            employee.forEach(element => {
                if (element.role == "BankEmployee") {

                    dropdown_emp += `
                        <option value="${element.userId}">${element.userId + " / " + element.role}</option>
                    `;

                    emp_name_id.innerHTML = dropdown_emp;
                }
            });
        });

}

function allCallMy() {
    userIDload();
    userIDandNameload();
    employeesIDandNameload();
    dateSet();
}

function employeeIDUseSearchApplication() {
    let emp_id = document.getElementById("search_emp_id").value;

    fetch(`https://api.freeprojectapi.com/api/BankLoan/GetApplicationAssigneedToMe?bankEmployeeId=${emp_id}`)
        .then(response => response.json())
        .then(data => {
            const user = data.data;
            let body = `
                    <caption>List of Application</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Employement Status</th>
                            <th>Customer Mobile</th>
                            <th>Pan Card</th>
                        </tr>
                    </thead>
            `;

            user.forEach(element => {
                body += `
                    <tbody>
                        <tr>
                            <td class="bg-danger bg-opacity-75 text-white"><div class="d-flex align-items-center m-1">${element.applicantID}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.dateApplied}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.applicationStatus}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.fullName}</div></td>
                            <td class="bg-dark bg-opacity-75 text-white"><div class="d-flex align-items-center m-1">${element.email}</div></td>
                            <td><div class="d-flex align-items-center m-1">${element.employmentStatus}</div></td>
                            <td><div class="d-flex m-1 align-items-center">${element.customerPhone}</div></td>
                            <td><div class="d-flex m-1 align-items-center">${element.panCard}</div></td>
                        </tr>
                    </tbody>
                `;
            });
            document.getElementById("application-table").innerHTML = body;
        });
    allCallMy();
}