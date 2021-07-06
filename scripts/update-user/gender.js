let radioCustom;
try {
    radioCustom = document.getElementById('radio-custom');
    radioCustom.addEventListener('click', createDropdown);
} catch(e) {
    console.log(e);
}

let her = null;
let he = null;
let they = null;

let clicks = 0;

function createDropdown() {
    checkCustom();
    clicks += 1;

    if(clicks > 1) {
        return;
    }

    // Bootstrap html syntax reference: https://getbootstrap.com/docs/3.4/components/#btn-dropdowns

    // Adding bootstrap .dropdown to empty div tag.
    let pronoun = document.getElementById('pronoun-dropdown');
    pronoun.className = 'dropdown';

    // Creating columns for positioning
    let row = document.createElement('div');
    row.className = 'row';
    pronoun.appendChild(row);

    let labelCol = document.createElement('div');
    labelCol.className = 'col-2';
    let label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = 'Custom:';
    label.setAttribute('for', 'customGender');
    labelCol.appendChild(label);
    row.appendChild(labelCol);

    let dropdownColumn = document.createElement('div');
    dropdownColumn.className = 'col-4';
    row.appendChild(dropdownColumn);
    let emptyEnd = document.createElement('div');
    emptyEnd.className = 'col-6';
    row.appendChild(emptyEnd);

    // Creating bootstrap button then inserting into div tag.
    let button = document.createElement('button');
    button.id = 'selection';
    button.className = 'btn btn-secondary dropdown-toggle';
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'dropdown');
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = 'Select your pronoun';
    dropdownColumn.appendChild(button);

    // creating div container for dropdown menu items.
    // Making this the child of the original div tag.
    let ul = document.createElement('ul');
    ul.className = 'dropdown-menu';
    ul.setAttribute('aria-labelledby', 'dropdownMenuButton1');
    dropdownColumn.appendChild(ul);

    // Creating individual dropdown items
    let li1 = document.createElement('li');
    let option1 = document.createElement('a');
    option1.className = 'dropdown-item';
    option1.id = 'she';
    option1.textContent = 'She';
    option1.setAttribute('value', 'She');
    li1.appendChild(option1)
    ul.appendChild(li1);

    let li2 = document.createElement('li');
    let option2 = document.createElement('a');
    option2.className = 'dropdown-item';
    option2.id = 'he';
    option2.textContent = 'He';
    option2.setAttribute('value', 'He');
    li2.appendChild(option2);
    ul.appendChild(li2);

    let li3 = document.createElement('li');
    let option3 = document.createElement('a');
    option3.className = 'dropdown-item';
    option3.id = 'they';
    option3.textContent = 'They';
    option3.setAttribute('value', 'They');
    li3.appendChild(option3);
    ul.appendChild(li3);

    let br = document.getElementById('breaks');
    br.innerHTML = '<br>';
    console.log(document.body);

    /* 
    * Setting up eventlisteners for he option in the
    * dropdown menu so that the menu can be updated
    * to show the selected item.
    */
    her = document.getElementById('she');
    her.addEventListener('click', selectHer);

    he = document.getElementById('he');
    he.addEventListener('click', selectHim);

    they = document.getElementById('they');
    they.addEventListener('click', selectThey);
}

function removeDropdown(dropdown, errorMessage) {
    if(her != null)
        her.removeEventListener('click', selectHer);

    if(he != null)    
        he.removeEventListener('click', selectHim);

    if(they != null)
        they.removeEventListener('click', selectThey);
        
    while(errorMessage.firstChild) {
        errorMessage.removeChild(errorMessage.lastChild);
    }

    while(dropdown.firstChild) {
        dropdown.removeChild(dropdown.lastChild);
    }
}

/* ------------ Radio button logic ------------ */

let radioFemale;
let radioMale;
try {
    radioFemale = document.getElementById('radio-female');
    radioFemale.addEventListener('click', checkFemale);
    
    radioMale = document.getElementById('radio-male');
    radioMale.addEventListener('click', checkMale);
} catch(e) {
    console.log(e);
}

function checkFemale() {
    radioMale.checked = false;
    radioCustom.checked = false;
    clicks = 0;

    let dropdown = document.getElementById('pronoun-dropdown');
    if(dropdown.children.length != 0) {
        let errorMessage = document.getElementById('error-message');
        removeDropdown(dropdown, errorMessage);
    }

    return;
}

function checkMale() {
    radioFemale.checked = false;
    radioCustom.checked = false;
    clicks = 0;

    const dropdown = document.getElementById('pronoun-dropdown');
    if(dropdown.children.length != 0) {
        let errorMessage = document.getElementById('error-message');
        removeDropdown(dropdown, errorMessage);
    }
    return;
}

function checkCustom() {
    radioFemale.checked = false;
    radioMale.checked = false;
    return;
}

function selectHer() {
    let selection = document.getElementById('selection');
    let value = her.textContent;
    selection.textContent = value;
}

function selectHim() {
    let selection = document.getElementById('selection');
    let value = he.textContent;
    selection.textContent = value;
}

function selectThey() {
    let selection = document.getElementById('selection');
    let value = they.textContent;
    selection.textContent = value;
}

try {
    document.getElementById('button-sub').addEventListener('click', 
    sendData);
} catch(e) {
    console.log(e);
}

function sendData() {
    let row = document.getElementById('radios');

    // Each column in the row that the radio buttons are in.
    let rowElms = row.children;
    let gender = null;
    for(let i = 1; i < rowElms.length; i++) {
        // Button element in each column that wraps the radio box.
        let button = rowElms[i].lastElementChild;
        // div containing the label and input of radio box.
        let div = button.lastElementChild;
        // input is the first child.
        let input = div.firstElementChild;
        if(input.checked) {
            gender = input.value;
            break;
        }
    }
    
    let preferredPronoun = null
    if(gender === 'Custom') {
        let customGender = document.getElementById('selection').textContent;
        if(customGender === 'Select your pronoun') {
            dropdownError();
            return;
        }
        else {
            preferredPronoun = customGender;
        }
    }

    let request = new XMLHttpRequest();
    let URI = `http://localhost:8080/bankingapp/api/user?gender=${gender}&preferredPronoun=${preferredPronoun}`;
    request.open('PUT', URI, true);

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', token);

    request.onload = () => {
        let feedback = document.getElementById('feedback');

        if(request.status == 204) {
            feedback.textContent = 'Gender Updated';
            feedback.style.color = 'green';
            window.setTimeout(function() {
                this.location.href = "http://127.0.0.1:5500/views/index.html";
            }, 3000);
        }
        else if(request.status === 401) {
            feedback.textContent = 'Login Required';
            feedback.style.color = '#10BDF5';

            window.setTimeout(function() {
                this.location.href = "http://127.0.0.1:5500/views/login.html";
            }, 3000);
        }
    }

    request.onerror = () => {
        let feedback = document.getElementById('feedback');
        feedback.textContent = 'Error Updating Gender!';
        feedback.style.color = 'red';
    }
    
    request.send();
    console.log('URI: ' + URI);
}

function dropdownError() {
    let div = document.getElementById('error-message');

    // Creating columns for positioning
    let row = document.createElement('div');
    row.className = 'row';
    div.appendChild(row);

    let emptyCol = document.createElement('div');
    emptyCol.className = 'col-2';
    row.appendChild(emptyCol);

    let message = document.createElement('div');
    message.className = 'col';
    message.textContent = 'A pronoun must be selected!';
    message.style.color = 'red';
    row.appendChild(message);
}