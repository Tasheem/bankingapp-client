document.getElementById('button-sub').addEventListener(
    'click', () => {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        let account = {};
        account.username = username;
        account.password = password;

        let request = new XMLHttpRequest();
        
        let URI = 'http://localhost:8080/bankingapp/api/user';
        request.open('DELETE', URI, true);
        request.setRequestHeader('Content-Type', 'application/json');
        
        let token = window.sessionStorage.getItem('Token');
        request.setRequestHeader('Authorization', token);

        let feedback = document.getElementById('feedback');
        request.onload = function() {

            if(this.status === 204) {
                feedback.textContent = 'User Account Successfully Deleted!';
                feedback.style.color = 'green';
                window.setTimeout(function() {
                    window.sessionStorage.removeItem('Token');
                    window.sessionStorage.removeItem('Name');
                    this.location.href = 'http://127.0.0.1:5500/views/index.html';
                }, 3000);
            }
            else if(this.status === 401) {
                window.location.href = 'http://127.0.0.1:5500/views/login.html';
            }
            else if(this.status === 403) {
                feedback.textContent = 'Invalid Username or Password.';
                feedback.style.color = 'red';
            }
            else if(this.status === 500) {
                feedback.textContent = 'Error Deleting User';
                feedback.style.color = 'red';
            }
        }

        request.onerror = () => {
            feedback.textContent = 'Error Deleting User';
            feedback.style.color = 'red';
        }

        let requestBody = JSON.stringify(account);

        request.send(requestBody);
    }
)