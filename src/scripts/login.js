// Initialize Cloud Firestore through Firebase
function _0x3e5d(){const _0x4ebe30=['16320090KFqOYm','floor','234gGwcTx','random','43783157dgugjB','9kweMcE','1FhwQvP','12YqVKNT','fromCharCode','innerHTML','11040316lZpWYH','4YNVVqb','96260YfhTRS','2869034dGNYoM','3692478BMfLqG','11895608yMdsaY'];_0x3e5d=function(){return _0x4ebe30;};return _0x3e5d();}function _0x1a15(_0x14765c,_0x517a3c){const _0x3e5dfb=_0x3e5d();return _0x1a15=function(_0x1a1507,_0xd2c8b1){_0x1a1507=_0x1a1507-0x165;let _0x3ce8e7=_0x3e5dfb[_0x1a1507];return _0x3ce8e7;},_0x1a15(_0x14765c,_0x517a3c);}(function(_0x41742f,_0x2ba3af){const _0x4a73e3=_0x1a15,_0x59df98=_0x41742f();while(!![]){try{const _0x8876ab=parseInt(_0x4a73e3(0x171))/0x1*(parseInt(_0x4a73e3(0x168))/0x2)+parseInt(_0x4a73e3(0x169))/0x3*(parseInt(_0x4a73e3(0x166))/0x4)+-parseInt(_0x4a73e3(0x167))/0x5*(-parseInt(_0x4a73e3(0x16d))/0x6)+parseInt(_0x4a73e3(0x165))/0x7+-parseInt(_0x4a73e3(0x16a))/0x8*(-parseInt(_0x4a73e3(0x170))/0x9)+-parseInt(_0x4a73e3(0x16b))/0xa+-parseInt(_0x4a73e3(0x16f))/0xb*(parseInt(_0x4a73e3(0x172))/0xc);if(_0x8876ab===_0x2ba3af)break;else _0x59df98['push'](_0x59df98['shift']());}catch(_0x19f14f){_0x59df98['push'](_0x59df98['shift']());}}}(_0x3e5d,0xd3eae));let captcha=new Array();function createCaptcha(){const _0x54f6ec=_0x1a15,_0x1ee2da=document['getElementById']('captcha');for(q=0x0;q<0x6;q++){q%0x2==0x0?captcha[q]=String[_0x54f6ec(0x173)](Math[_0x54f6ec(0x16c)](Math[_0x54f6ec(0x16e)]()*0x1a+0x41)):captcha[q]=Math[_0x54f6ec(0x16c)](Math[_0x54f6ec(0x16e)]()*0xa+0x0);}theCaptcha=captcha['join'](''),_0x1ee2da[_0x54f6ec(0x174)]=''+theCaptcha;}

//(function(_0x584660,_0x5ee191){const _0x5f4cee=_0x180d,_0x4ed646=_0x584660();while(!![]){try{const _0x1ab9ee=-parseInt(_0x5f4cee(0xee))/0x1+parseInt(_0x5f4cee(0xf4))/0x2+-parseInt(_0x5f4cee(0xe8))/0x3+parseInt(_0x5f4cee(0xf0))/0x4+parseInt(_0x5f4cee(0xf2))/0x5+parseInt(_0x5f4cee(0xeb))/0x6+-parseInt(_0x5f4cee(0xed))/0x7*(parseInt(_0x5f4cee(0xea))/0x8);if(_0x1ab9ee===_0x5ee191)break;else _0x4ed646['push'](_0x4ed646['shift']());}catch(_0x9eda4e){_0x4ed646['push'](_0x4ed646['shift']());}}}(_0x59bb,0xba582));function validateCaptcha(){const _0x2f4dcc=_0x180d,_0xd431b8=document['getElementById'](_0x2f4dcc(0xf3));let _0x2fed34=_0xd431b8['value'];console[_0x2f4dcc(0xf1)](_0x2fed34);let _0x2c322e=0x0;for(var _0x5d2b3b=0x0;_0x5d2b3b<0x6;_0x5d2b3b++){_0x2fed34['charAt'](_0x5d2b3b)!=captcha[_0x5d2b3b]&&_0x2c322e++;}if(_0x2fed34=='')return toastr[_0x2f4dcc(0xec)](_0x2f4dcc(0xf5)),![];else return _0x2c322e>0x0||_0x2fed34[_0x2f4dcc(0xef)]>0x6?(toastr[_0x2f4dcc(0xec)](_0x2f4dcc(0xe9)),![]):!![];}function _0x180d(_0x3fa28d,_0x57a8fe){const _0x59bb2b=_0x59bb();return _0x180d=function(_0x180db2,_0x5dd62a){_0x180db2=_0x180db2-0xe8;let _0x52bf6a=_0x59bb2b[_0x180db2];return _0x52bf6a;},_0x180d(_0x3fa28d,_0x57a8fe);}function _0x59bb(){const _0xc171ed=['4207024hwKqGq','log','5067865uJyayA','reCaptcha','2847716gCmxhs','Es\x20nesario\x20completar\x20el\x20captcha','1235943RdARii','El\x20captcha\x20es\x20incorrecto,\x20por\x20favor\x20inténtalo\x20de\x20nuevo','187712OPnVOt','6456972aVMARQ','error','819UsvURq','644814pdFMvS','length'];_0x59bb=function(){return _0xc171ed;};return _0x59bb();}


var firebaseConfig = {
    apiKey: "AIzaSyCoeqk66xn0Fcb82MKplIwhDKXCtYBumFo",
  authDomain: "thwebproject-6e1e7.firebaseapp.com",
  projectId: "thwebproject-6e1e7",
  storageBucket: "thwebproject-6e1e7.appspot.com",
  messagingSenderId: "318068135809",
  appId: "1:318068135809:web:67123076fe3ed2a3f67a80",
  measurementId: "G-8J0EG716D6"
}
firebase.initializeApp(firebaseConfig);


const form = document.forms['loginForm'];
firebase.auth().onAuthStateChanged(handleAuthState);
form.addEventListener('submit', handleFormSubmit);
var buttonRegister = document.getElementById("buttonRegister");


// Application defs
function handleAuthState(user) {
    if (user) {
        toastr.success("Bienvenido");
        setTimeout(function () {
            //sendToAdminSection()
        }, 800);
    }

}

function handleFormSubmit(event) {
    event.preventDefault();

    setLoadingButton();

    const email = form['email'].value;
    const password = form['password'].value;

    
    return loginUser({ email, password });

}


function setNormalButton(){
buttonRegister.innerHTML = "";
html = `
    <button id="btnLogin" class="col-12 btn btn-login defaultButtons ">
                                        <i aria-hidden="true"></i>Iniciar Sesión</button>`;

buttonRegister.innerHTML = html;
createCaptcha();
}

//Locks the register button and sets it in loading status
function setLoadingButton() {
    buttonRegister.innerHTML = "";
    html = `
        <button type="button" class="col-12 btn defaultButtons" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Ingresando...
        </button>
        `
    buttonRegister.innerHTML = html;
}


function sendToAdminSection() {
    window.open('news.html', '_self');
}


function loginUser({ email, password }) {

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {
        })
        .catch(function (error) {
            alertTryAgain(error);
        });
}

function signoutUser() {
    firebase.auth().signOut();
}


// General Utils
function alertTryAgain(error) {
    form['password'].value=""
    setLoginButton()
    createCaptcha();
    return toastr.error('Error, intenta nuevamente');
}

//Locks the register button and sets it in loading status
function setLoginButton() {
    buttonRegister.innerHTML = "";
    html = `
    <button id="btnLogin" class="col-12 btn btn-login defaultButtons ">
    <i aria-hidden="true"></i>Iniciar Sesión</button>
        `
    buttonRegister.innerHTML = html;
}