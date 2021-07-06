let check = window.sessionStorage.getItem('Token');
if(check != null) {
    window.sessionStorage.removeItem('Token');
    window.sessionStorage.removeItem('Name');

    // Reloading page to switch from navbar-logged-in.html 
    // to navbar.html
    window.location.href = './login.html';
}

let doc = document.getElementsByTagName('Body')[0].addEventListener(
    'keydown', enter
);

function enter(e) {
    if(e.key === 'Enter')
        login();
}

document.getElementById('log-in').addEventListener(
    'click', login
);

function login() {
    let formsFilled = formsAreFilled();
    console.log('Forms filled: ' + formsFilled);
    if(formsFilled === false)
        return;

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let login = {};
    login.username = username;
    login.password = password;

    let requestBody = JSON.stringify(login);

    let request = new XMLHttpRequest();

    let URI = "http://localhost:8080/bankingapp/api/login";
    request.open('POST', URI, true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    let feedback = document.getElementById('feedback');
    request.onload = () => {
        if(request.status == 401) {
            // TODO: Add error messages to dom.
            feedback.innerText = 'Invalid Username Or Password!';
            feedback.style.color = 'red';
            console.log("Invalid Credentials");
        }else if(request.status == 200) {
            feedback.innerText = 'Logging In...';
            feedback.style.color = 'green';

            let authHeader = request.getResponseHeader('Authorization');
            window.sessionStorage.setItem('Token', authHeader);

            let username = request.getResponseHeader('Name');
            window.sessionStorage.setItem('Name', username);
            
            window.setTimeout(function() {
                this.location.href = "http://127.0.0.1:5500/views/index.html";
            }, 3000);
        } else {
            feedback.innerText = 'An error occured on our side. Sorry for the inconvience.';
            feedback.style.color = 'red';
        }
    }

    request.send(requestBody);
}

function formsAreFilled() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let usernameError = document.getElementById('usernameError');
    let passwordError = document.getElementById('passwordError');

    // Clearing error messages for subsequent invalid attempts.
    usernameError.innerText = '';
    passwordError.innerText = '';

    if(username.trim().length === 0 && password.trim().length === 0) {
        usernameError.innerText = 'Username field cannot be left blink!';
        usernameError.style.color = 'red';
        passwordError.innerText = 'Password field cannot be left blink!';
        passwordError.style.color = 'red';

        return false;
    }
    else if(username.trim().length === 0) {
        usernameError.innerText = 'Username field cannot be left blink!';
        usernameError.style.color = 'red';

        return false
    }
    else if(password.trim().length === 0) {
        passwordError.innerText = 'Password field cannot be left blink!';
        passwordError.style.color = 'red';

        return false;
    }
    else
        return true;
}