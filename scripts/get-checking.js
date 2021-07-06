document.getElementById('get-users').addEventListener(
    'click', getCheckingAccounts
);

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getCheckingAccounts() {
    let request = new XMLHttpRequest();

    let URI = 'http://localhost:8080/bankingapp/api/checking';
    request.open('GET', URI, true);

    request.onload = () => {
        if(request.status == 401) {
            window.location.href = "http://127.0.0.1:5500/views/login.html";
        }

        if(request.status == 403) {
            window.location.href = "http://127.0.0.1:5500/views/forbidden.html";
        }

        if(request.status == 200) {
            let checkingAccounts = JSON.parse(request.responseText);
            console.log(checkingAccounts);

            let tbody = document.getElementById('tbody');
            removeAllChildNodes(tbody);

            for(let i = 0; i < checkingAccounts.length; i++) {
                let idID = `id${i + 1}`;
                let accountNumID = `accountNum${i + 1}`
                let dateOfAccountCreationID = `created${i + 1}`;
                let userID = `user${i + 1}`;
                let balanceID = `balance${i + 1}`;
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
                id.textContent = checkingAccounts[i].id;
                tableRow.appendChild(id);

                let accountNum = document.createElement('td');
                accountNum.id = accountNumID;
                accountNum.textContent = checkingAccounts[i].accountNumber;
                tableRow.appendChild(accountNum);

                let dateOfAccountCreation = document.createElement('td');
                dateOfAccountCreation.id = dateOfAccountCreationID;
                // converting UTC to local timezone.
                let localDate = new Date(checkingAccounts[i].dateOfAccountCreation);
                dateOfAccountCreation.textContent = localDate;
                tableRow.appendChild(dateOfAccountCreation);

                let user = document.createElement('td');
                user.id = userID;
                user.textContent = checkingAccounts[i].userID;
                tableRow.appendChild(user);

                let balance = document.createElement('td');
                balance.id = balanceID;
                let amount = Number(checkingAccounts[i].balance);
                let formattedAmount = amount.toFixed(2);
                let output = '$' + formattedAmount;
                balance.textContent = output;
                tableRow.appendChild(balance);
            }
        }
    }

    let jwt = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', jwt);
    request.send();
}