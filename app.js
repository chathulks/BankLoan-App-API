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
                                <button class="btn border-0 p-0 m-1">
                                    <i class="bi bi-trash3-fill text-danger" style="font-size: 17px;" onclick="deleteUser()"></i>
                                </button>
                                <button class="btn border-0 p-0 m-1">
                                    <i class="bi bi-pencil-square text-primary" style="font-size: 17px;" onclick="updateUser()"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                `;
            });
            document.getElementById("user-table").innerHTML = body;
        });
}

let deleteUserListenerAdded = false;

function deleteUser() {

    if (deleteUserListenerAdded) {
        return;
    }

    const table = document.getElementById("user-table");

    table.addEventListener("click", function (event) {

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

function updateUser() {

    if (updateUserListenerAdded) {
        return;
    }

    const table = document.getElementById("user-table");

    table.addEventListener("click", function (event) {

        const row = event.target.closest("tbody tr");

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

        document.getElementById("u_id").value = id;
        document.getElementById("u_name").value = uname;
        document.getElementById("u_fullname").value = full_name;
        document.getElementById("u_email").value = email;
        document.getElementById("u_pw").value = pw;
        document.getElementById("u_cd").value = c_date;
        document.getElementById("u_role").value = role;

        modal.show();

    });
    updateUserListenerAdded = true;
}