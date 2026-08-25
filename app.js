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
                        </tr>
                    </tbody>
                `;
            });
            document.getElementById("user-table").innerHTML = body;
        });
}

                            // <th>Refresh Token</th>
                            // <th>Token Expir Time</th>

                            //                             <td>${element.refreshToken}</td>
                            // <td class="bg-secondary bg-opacity-75 text-white">${element.refreshTokenExpiryTime}</td>