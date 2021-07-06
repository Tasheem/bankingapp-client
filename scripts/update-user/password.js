document.getElementById('button-sub').addEventListener(
    'click', sendPUT
)

document.addEventListener('keydown', catchEnter)

function catchEnter(event) {
    if(event.key === 'Enter')
        sendPUT();
}

function sendPUT() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('current-password').value;
    let newPassword = document.getElementById('new-password').value;
    let confirmNewPassword = document.getElementById('confirm-password').value;

    if(!passwordsMatch(newPassword, confirmNewPassword)) {
        let passwordFeedback = document.getElementsByClassName('pFeedback');
        passwordFeedback[0].textContent = "New Password & Confirm Password Do Not Match.";
        passwordFeedback[1].textContent = "New Password & Confirm Password Do Not Match.";
        
        passwordFeedback[0].style.color = 'red';
        passwordFeedback[1].style.color = 'red';

        return;
    }
    
    let request = new XMLHttpRequest();
    let URI = `http://localhost:8080/bankingapp/api/user?username=${username}&password=${password}&newPassword=${newPassword}`;
    request.open('PUT', URI, true);
    
    let feedback = document.getElementById('feedback');
    request.onload = function() {
        if(this.status === 204) {
            feedback.textContent = 'Password Updated!';
            feedback.style.color = 'green';
            window.setTimeout(function() {
                window.location.href = "http://127.0.0.1:5500/views/index.html";
            }, 3000)
        } else if(this.status === 401) {
            window.location.href = "http://127.0.0.1:5500/views/login.html";
        } else if(this.status === 403) {
            feedback.textContent = 'Incorrect Username Or Password';
            feedback.style.color = 'red';
        }
    }

    request.onerror = () => {
        feedback.textContent = 'Error Updating Password!';
        feedback.style.color = 'red';
    }

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', token);
    request.send();
}

function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}