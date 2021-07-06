let doc = document.getElementsByTagName('Body')[0].addEventListener(
    'keydown', enter
);

function enter(e) {
    if(e.keyCode === 13)
        console.log('Enter');
}