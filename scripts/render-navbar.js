let token = window.sessionStorage.getItem('Token');

if(token != null) {
    let div = document.getElementById('render-navbar');
    
    let request = new XMLHttpRequest();
    request.open('GET', '/views/nav/navbar-logged-in.html', true);
    
    request.onload = function() {
        if(this.status == 200 || this.status == 304) {
            let content = this.responseText;
            div.innerHTML = content;

            let name = window.sessionStorage.getItem('Name');
            
            let greeting = document.getElementById('Greeting');
            greeting.textContent = 'Welcome, ' + name + '!';

            document.getElementById('logout').addEventListener(
                'click', logout
                );
        }
    }
    
    request.send();
} else {
    let div = document.getElementById('render-navbar');
    
    let request = new XMLHttpRequest();
    request.open('GET', '/views/nav/navbar.html', true);
    
    request.onload = function() {
        if(this.status == 200) {
            let content = this.responseText;
            div.innerHTML = content;

            document.getElementById('login').addEventListener(
                'click', login
            );
        }
    }
    
    request.send();
}

function login() {
    window.location.href = 'http://127.0.0.1:5500/views/login.html';
}

function logout() {
    window.sessionStorage.removeItem('Token');
    window.sessionStorage.removeItem('Name');
    window.location.href = 'http://127.0.0.1:5500/views/index.html';
}