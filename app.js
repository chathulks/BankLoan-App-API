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
                            <td class="bg-danger bg-opacity-75 text-white">${element.userId}</td>
                            <td>${element.userName}</td>
                            <td>${element.emailId}</td>
                            <td>${element.fullName}</td>
                            <td class="bg-dark bg-opacity-75 text-white">${element.role}</td>
                            <td>${element.createdDate}</td>
                            <td>${element.password}</td>
                            <td class="d-flex justify-content-center align-items-center">
                                <button class="btn border-0 p-0 m-1">
                                    <i class="bi bi-trash3-fill text-danger" style="font-size: 17px;" onclick="deleteUser()"></i>
                                </button>
                                <button class="btn border-0 p-0 m-1">
                                    <i class="bi bi-pencil-square text-primary" style="font-size: 17px;" onclick="deleteUser()"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                `;
            });
            document.getElementById("user-table").innerHTML = body;
        });
}

function deleteUser() {
    const table = document.getElementById("user-table");

    table.addEventListener("click", function (event) {

        const row = event.target.closest("tr");

        // Ignore table header
        if (!row || row.parentElement.tagName === "THEAD") {
            return;
        }

        const cells = row.querySelectorAll("td");

        const id = cells[0].textContent;

        console.log("ID:", id);

    });
}
