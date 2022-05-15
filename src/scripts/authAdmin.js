firebase.auth().onAuthStateChanged(handleAuthState);


function signoutUser() {
    firebase.auth().signOut();
    window.open('login.html', '_self');
}

// Application defs
function handleAuthState(user) {
    if (!user) {
        window.open('login.html', '_self');
    }
}