const db = firebase.firestore();


//Getting the error containers by ID
var imageError = document.getElementById("imageError");
var nameError = document.getElementById("nameError");
var brandError = document.getElementById("brandError");
var priceError = document.getElementById("priceError");
var quantityError = document.getElementById("quantityError");
var arrivalDateError = document.getElementById("arrivalDateError");


//Locks the register button and sets it in loading status
function setLoadingButton() {
    buttonRegister.innerHTML = "";
    html = `
        <button type="button" class="btn btn-success" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Registrando...
        </button>
        `
    buttonRegister.innerHTML = html;
}


function setDefaultRegisterButton(event) {
    buttonRegister.innerHTML = "";
    if (event == 1) {
        html = `
    <button type="button" class="btn btn-success" onclick="getDocumentData()">
    <i class="fas fa-upload pe-3" aria-hidden="true"></i>Publicar</button>
        `
    }
    else if (event == 2) {
        html = `
    <button type="button" class="btn btn-success" onclick="">
    <i class="fas fa-upload pe-3" aria-hidden="true"></i>Publicar</button>
        `
    }
    buttonRegister.innerHTML = html;
}



//Gets the values of the inputs
function getDocumentData() {
    setLoadingButton();
    var Iname = document.getElementById('inputName').value.trim();
    var Ibrand = document.getElementById('inputBrand').value.trim();
    var Iprice = document.getElementById('inputPrice').value.trim();
    var Iquantity = document.getElementById('inputQuantity').value.trim();
    var IarrivalDate = document.getElementById('inputArrivalDate').value.trim();
    var Ifeatures = document.getElementById('inputFeatures').value.trim();

    if (!validateData(
        Iname,
        Ibrand,
        Iprice,
        Iquantity,
        IarrivalDate
    )) {
        setDefaultRegisterButton(1);
        return;

    } else {
        const separateDate = IarrivalDate.split("/");

        uploadImage(
            "Items",
            Iname,
            Ibrand,
            Iprice,
            Iquantity,
            parseInt(separateDate[1]), //Month
            parseInt(separateDate[0]), //Day
            parseInt(separateDate[2]), //Year
            Ifeatures,
        );
    }

}

function uploadImage(
    imageref,
    name,
    brand,
    price,
    quantity,
    month,
    day,
    year,
    features
) {

    try {
        const ref = firebase.storage().ref();
        const file = document.querySelector("#upload-button").files[0];
        var Iname = document.getElementById('inputName').value.trim();

        if (file == null) {
            let html = "";
            html = `
        Por favor, cargue una imagen<br>
        `;
            imageError.innerHTML = html;
            setDefaultRegisterButton(1);
            return;
        }
        else {
            imageError.innerHTML = "";
            const fileName = Date.now() + "-" + Iname;
            const metadata = {
                contentType: file.type
            }
            const task = ref.child(imageref + "/" + fileName).put(file, metadata)

            task.then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    addNewItem(
                        name,
                        brand,
                        price,
                        quantity,
                        month,
                        day,
                        year,
                        features,
                        url
                    );
                });
        }
    } catch (error) {
        console.error(error);

    }

}

async function addNewItem(
    name,
    brand,
    price,
    quantity,
    month,
    day,
    year,
    features,
    itemImage
) {
    try {
        console.log(itemImage);
        const newItem = {
            name: name,
            brand: brand,
            price: parseFloat(parseFloat(price).toFixed(2)),
            quantity: parseInt(quantity),
            arrivalDate: firebase.firestore.Timestamp.fromDate(
                new Date(month + ' ' + day + ', ' + year)
            ),
            features: features,
            itemImage: itemImage,
        };
        const response = await insert(newItem, "Items");
        setDefaultRegisterButton(2);
        toastr.success("Item añadido satisfactoriamente");
        setTimeout(function () {
            window.location.reload()
        }, 800);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

async function insert(document, collection) {
    try {
        const response = await db.collection(collection).add(document)



        return response;

    } catch (error) {
        throw new Error(error);
    }
}


function validateData(
    Iname,
    Ibrand,
    Iprice,
    Iquantity,
    IarrivalDate
) {
    var infoIsCorrect = true;

    priceError.innerHTML = "";
    quantityError.innerHTML = "";
    arrivalDateError.innerHTML = "";

    //RegEx for the validations
    var regDate = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/
    var regDecimal = /^[-+]?[0-9]+\.[0-9]+$/;
    var regInteger = /^[0-9]*$/;

    let html = "";

    if (Iname == "") {

        html = `
            Por favor, no ingrese valores vacíos
            `
        nameError.innerHTML = html;
        infoIsCorrect = false;
    }if (Ibrand == "") {

        html = `
            Por favor, no ingrese valores vacíos
            `
        brandError.innerHTML = html;
        infoIsCorrect = false;
    } if (Iprice == "" || (!regDecimal.test(Iprice) && !regInteger.test(Iprice))) {

        html = `
            Ingrese un valor adecuado
            `
        priceError.innerHTML = html;
        infoIsCorrect = false;
    }   if (Iquantity == "" || !regInteger.test(Iquantity)) {

        html = `
            Ingrese un valor adecuado
            `
        quantityError.innerHTML = html;
        infoIsCorrect = false;
    }if (IarrivalDate == "" || !regDate.test(IarrivalDate)) {

        html = `
            Fecha en formato mm/dd/aaaa
            `
        arrivalDateError.innerHTML = html;
        infoIsCorrect = false;
    }
    
    if (infoIsCorrect) {
        nameError.innerHTML = "";
        brandError.innerHTML = "";
        priceError.innerHTML = "";
        quantityError.innerHTML = "";
        arrivalDateError.innerHTML = "";
    }

    return infoIsCorrect;
}


function clearInputsOnFocusGained(calledFrom) {

    if (calledFrom == "nameError")
    nameError.innerHTML = "";
    else if (calledFrom == "brandError")
    brandError.innerHTML = "";
    else if (calledFrom == "priceError")
        priceError.innerHTML = "";
    else if (calledFrom == "quantityError")
        quantityError.innerHTML = "";
    else if (calledFrom == "arrivalDateError")
        arrivalDateError.innerHTML = "";
}

