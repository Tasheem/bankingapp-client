document.getElementById('radio-send').addEventListener(
    'click', createField
)

function createField() {
    let destinationAccountNumberField = document.getElementById('destination-account-field');
    destinationAccountNumberField.className = 'mb-3';

    let br = document.createElement('br');
    destinationAccountNumberField.appendChild(br);

    let row = document.createElement('div');
    row.className = 'row';
    destinationAccountNumberField.appendChild(row);

    let labelContainer = document.createElement('div');
    labelContainer.className = 'col-2';
    row.appendChild(labelContainer);

    let label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = 'Receiver\'s Account #:';
    labelContainer.appendChild(label);

    let inputContainer = document.createElement('div');
    inputContainer.className = 'col-10';
    row.appendChild(inputContainer);

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.className = 'form-control';
    input.id = 'destination-account-num';
    inputContainer.appendChild(input);

    let h3 = document.getElementsByTagName('h3')[0];
    h3.textContent += ' And Receiver\'s account number';
}

document.getElementById('submit-transaction').addEventListener(
    'click', submit = () => {
        let amount = document.getElementById('amount').value;

        transaction = {};

        transaction.amount = amount;

        let row = document.getElementById('radios');

        // Each column in the row that the radio buttons are in.
        let rowElms = row.children;
        for(let i = 1; i < rowElms.length; i++) {
            // Button element in each column that wraps the radio box.
            let button = rowElms[i].lastElementChild;
            // div containing the label and input of radio box.
            let div = button.lastElementChild;
            // input is the first child.
            let input = div.firstElementChild;
            if(input.checked) {
                transaction.category = input.value.toUpperCase();
                break;
            }
        }

        transaction.destinationAccountNumber = null;
        if(transaction.category === 'SEND') {
            let fieldValue = document.getElementById('destination-account-num').value;
            console.log(fieldValue);
            transaction.destinationAccountNumber = fieldValue;
        }

        let payload = JSON.stringify(transaction);
        console.log(payload);

        let request = new XMLHttpRequest();
        let uri = 'http://localhost:8080/bankingapp/api/transaction';
        request.open('POST', uri, true);
        request.setRequestHeader('Content-Type', 'application/json');

        let jwt = window.sessionStorage.getItem('Token');
        request.setRequestHeader('Authorization', jwt);

        let feedback = document.getElementById('feedback');
        request.onload = function() {
            if(this.status === 200) {
                feedback.textContent = 'Transaction Completed!'
                feedback.style.color = 'green';
                window.setTimeout(function() {
                    this.location.href = "http://127.0.0.1:5500/views/index.html";
                }, 3000);
            }
            else if(this.status === 401) {
                feedback.textContent = 'Log-In Is Required!';
                feedback.style.color = 'red';
                window.setTimeout(function() {
                    this.location.href = "http://127.0.0.1:5500/views/login.html";
                }, 3000);
            }
            else {
                feedback.textContent = 'Error!';
                feedback.style.color = 'red';
            }
        } 
        
        request.onerror = () => {
            feedback.textContent = 'Error!';
            feedback.style.color = 'red';
        }

        request.send(payload);
    }
)