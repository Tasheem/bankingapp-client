import User from '../classes/user-model.js';

document.getElementById('get-users').addEventListener(
    'click', getUsers
);

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getUsers() {
    let request = new XMLHttpRequest();

    let URI = 'http://localhost:8080/bankingapp/api/user';
    request.open('GET', URI, true);

    request.onload = () => {
        if(request.status == 401) {
            window.location.href = "http://127.0.0.1:5500/views/login.html";
        }

        if(request.status == 403) {
            window.location.href = "http://127.0.0.1:5500/views/forbidden.html";
        }

        if(request.status == 200) {
            let users = JSON.parse(request.responseText);
            // console.log(users);

            displayUsers(users);
        }
    }

    let jwt = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', jwt);
    request.send();
}

function displayUsers(users) {
    let tbody = document.getElementById('tbody');
    removeAllChildNodes(tbody);
    
    /*  Outline of the creation of each row.
    <tr id="data">
        <th scope="row">1</th>
        <td id="id"></td>
        <td id="created"></td>
        <td id="fname"></td>
        <td id="lname"></td>
        <td id="email"></td>
        <td id="username"></td>
        <td id="password"></td>
        <td id="bday"></td>
        <td id="gender"></td>
        <td id="pronoun"></td>
    </tr> 
    */
    for(let i = 0; i < users.length; i++) {
        let user = new User();
        user.convertJSON(users[i]);

        let idID = `id${i + 1}`;
        let dateOfAccountCreationID = `created${i + 1}`;
        let fnameID = `fname${i + 1}`;
        let lnameID = `lname${i + 1}`;
        let emailID = `email${i + 1}`;
        let usernameID = `username${i + 1}`;
        let passwordID = `password${i + 1}`;
        let birthdayID = `bday${i + 1}`;
        let genderID = `gender${i + 1}`;
        let pronounID = `pronoun${i + 1}`;
        let roleID = `role${i + 1}`;
        let tableRowID = `data${i + 1}`;
        
        let tableRow = document.createElement('tr');
        tableRow.id = tableRowID;
        tbody.appendChild(tableRow);

        let rowCount = document.createElement('th');
        rowCount.setAttribute('scope', 'row');
        rowCount.textContent = i + 1;
        tableRow.appendChild(rowCount);

        let id = document.createElement('td');
        id.id = idID;
        id.textContent = user.id;
        tableRow.appendChild(id);

        let dateOfAccountCreation = document.createElement('td');
        dateOfAccountCreation.id = dateOfAccountCreationID;
        // converting UTC to local timezone.
        let localDate = new Date(user.accountCreation);
        dateOfAccountCreation.textContent = localDate;
        tableRow.appendChild(dateOfAccountCreation);

        let fname = document.createElement('td');
        fname.id = fnameID;
        fname.textContent = user.firstName;
        tableRow.appendChild(fname);

        let lname = document.createElement('td');
        lname.id = lnameID;
        lname.textContent = user.lastName;
        tableRow.appendChild(lname);

        let email = document.createElement('td');
        email.id = emailID;
        email.textContent = user.email;
        tableRow.appendChild(email);

        let username = document.createElement('td');
        username.id = usernameID;
        username.textContent = user.username;
        tableRow.appendChild(username);

        let password = document.createElement('td');
        password.id = passwordID;
        password.textContent = user.password;
        tableRow.appendChild(password);

        let birthday = document.createElement('td');
        birthday.id = birthdayID;
        let bDate = user.birthday;
        birthday.textContent = bDate;
        tableRow.appendChild(birthday);

        let gender = document.createElement('td');
        gender.id = genderID;
        gender.textContent = user.gender;
        tableRow.appendChild(gender);

        let pronoun = document.createElement('td');
        pronoun.id = pronounID;
        
        if(user.preferredPronoun == null)
            pronoun.textContent = 'N/A';
        else
            pronoun.textContent = user.preferredPronoun;
            
        tableRow.appendChild(pronoun);

        let role = document.createElement('td');
        role.id = roleID;
        role.textContent = user.role.name;
        tableRow.appendChild(role);
    }
}