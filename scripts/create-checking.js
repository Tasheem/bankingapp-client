document.getElementById('button-sub').addEventListener(
    'click', postForm
)

function postForm() {
    const id = document.getElementById('userID').value;
    const deposit = document.getElementById('deposit').value;

    let balance = Number(deposit);
    if(Number.isNaN(balance)) {
        let errorMessage = document.getElementById('depositError');
        errorMessage.textContent = 'Deposit must be a number';
        errorMessage.style.color = 'red';
        return;
    }

    if(balance < 0 || balance == 0) {
        let errorMessage = document.getElementById('depositError');
        errorMessage.textContent = 'Deposit must be greater than $0';
        errorMessage.style.color = 'red';
        return;
    }

    let request = new XMLHttpRequest();

    let URI = `http://localhost:8080/bankingapp/api/checking?userID=${id}&balance=${deposit}`;
    request.open('POST', URI, true);

    request.onload = function() {
        if(this.status === 201) {
            let feedback = document.getElementById('feedback');
            feedback.textContent = 'Checking Account Created';
            feedback.style.color = 'green';

            window.setTimeout(function() {
                this.location.href = "http://127.0.0.1:5500/views/index.html";
            }, 3000);
        }
        else if(this.status === 403) {
            let feedback = document.getElementById('feedback');
            feedback.textContent = 'Higher Privileges Required To Perform This Action';
            feedback.style.color = 'red';

            window.setTimeout(function() {
                this.location.href = "http://127.0.0.1:5500/views/forbidden.html";
            }, 3000);
        }
        else if(this.status === 401) {
            // Token Expired.
            window.location.href = "http://127.0.0.1:5500/views/login.html"
            window.sessionStorage.removeItem('Token');
            window.sessionStorage.removeItem('Name');
        }
        else {
            // status code 500
            let feedback = document.getElementById('feedback');
            feedback.textContent = 'There was a problem on our end. Please come back later.';
            feedback.style.color = 'red';

            window.setTimeout(function() {
                this.location.href = "http://127.0.0.1:5500/views/index.html";
            }, 5000);
        }
    }

    /* ------------------------ */
    // TODO: Sign in with admin and create admin's bank account.
    /* ------------------------ */

    let token = window.sessionStorage.getItem('Token');

    request.setRequestHeader('Authorization', token);
    request.send();

    let responseURL = request.responseURL;
    console.log(responseURL)
}