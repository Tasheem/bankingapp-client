document.getElementById('button-sub').addEventListener(
    'click', send
)

function send() {
    let username = document.getElementById('username').value;

    let request = new XMLHttpRequest();
    let URI = `http://localhost:8080/bankingapp/api/user?username=${username}`;
    request.open('PUT', URI, true);

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', token);

    request.onload = function() {
        let feedback = document.getElementById('feedback');

        if(this.status == 204) {
            feedback.textContent = 'Username Updated!';
            feedback.style.color = 'green';
            window.setTimeout(function() {
                this.location.href = "http://127.0.0.1:5500/views/index.html";
            }, 3000);
        }
    }

    request.onerror = () => {
        let feedback = document.getElementById('feedback');
        feedback.textContent = 'Error Updating Username!';
        feedback.style.color = 'red';
    }

    request.send();
}