//singup 
document.addEventListener("DOMContentLoaded", () => {
    const getStartedButton = document.getElementById("getStartedButton");

    getStartedButton.addEventListener("click", () => {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("inputEmail").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("inputPassword").value;
        const confirmPassword = document.getElementById("cPassword").value;

        handleRegister(firstName, lastName, email, username, password, confirmPassword);
    });

    
	const handleRegister = async (firstName, lastName, email, username, password, confirmPassword) => {
    clearError("errorFirstName");
    clearError("errorlastName");
    clearError("errorinputEmail");
    clearError("errorusername");
    clearError("errorinputPassword");
    clearError("errorcPassword");

    const nameRegex = /^[a-zA-Z]+$/;

    if (!nameRegex.test(firstName)) {
        displayError("errorFirstName", "First Name should contain only alphabetic characters!");
    }

    if (!nameRegex.test(lastName)) {
        displayError("errorlastName", "Last Name should contain only alphabetic characters!");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        displayError("errorinputEmail", "Invalid email format!");
    }

    if (!username) {
        displayError("errorusername", "Username is required!");
    }

    if (!password) {
        displayError("errorinputPassword", "Password is required!");
    } else if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        displayError("errorinputPassword", "Password must be at least 8 characters long and include at least one digit and one symbol!");
    }

    if (!confirmPassword) {
        displayError("errorcPassword", "Confirm password is required!");
    }

    if (
        document.getElementById("errorFirstName").innerText === "" &&
        document.getElementById("errorlastName").innerText === "" &&
        document.getElementById("errorinputEmail").innerText === "" &&
        document.getElementById("errorusername").innerText === "" &&
        document.getElementById("errorinputPassword").innerText === "" &&
        document.getElementById("errorcPassword").innerText === ""
    ) {
        try {
            document.getElementById("error").innerText = `Loading..`;
            let headersList = {
                Accept: "*/*",
                "Content-Type": "application/json",
            };

            const fullName = firstName + " " + lastName;

            let bodyContent = JSON.stringify({
                name: fullName,
                username,
                email,
                password,
            });

            let response = await fetch(
                "https://broomes-9hpd.onrender.com/register",
                {
                    method: "POST",
                    body: bodyContent,
                    headers: headersList,
                }
            );

            let data = await response.json();
            console.log(data);

            if (data) {
                document.getElementById(
                    "error"
                ).innerHTML = `<p class='success'>User Created Successfully!</p>`;
                clearInputFields();

            } else {
                document.getElementById(
                    "error"
                ).innerHTML = `<p class='error'>User Already exists!</p>`;
            }
        } catch (error) {
            console.log(error);
        }
    }
};

    function clearInputFields() {
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("inputEmail").value = "";
        document.getElementById("username").value = "";
        document.getElementById("inputPassword").value = "";
        document.getElementById("cPassword").value = "";
    }

    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.innerText = "";
        }
    }

    function displayError(elementId, errorMessage) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.innerHTML = errorMessage;
        }
    }
});

//userlist 
document.addEventListener("DOMContentLoaded", () => {
	let tableData = [];
	const getData = async () => {
		
		let headersList = {
			Accept: "*/*",
		};

		let response = await fetch(
			"https://broomes-9hpd.onrender.com/getAllUsers",
			{
				method: "GET",
				headers: headersList,
			}
		);

		let data = await response.json();
		tableData = data;
		if (tableData.length < 1) {
			document.getElementById(
				"title"
			).innerHTML = `<h1 class="title" id="title"  style="margin-top: 5rem;">No User Found</h1> `;

			document.getElementById("table").style.display = `none`;

			console.log(tableData, "hello");
		} else {
			const table = document.getElementById("table-data");
			tableData.forEach((user) => {
				let newRow = document.createElement("tr");
				let fullName = user.name;

				newRow.innerHTML = `
                    <td>${user.username}</td>
                    <td>${fullName}</td>
                    <td>${user.email}</td>
                `;
				table.appendChild(newRow);
			});
		}
	};
	getData();
});


