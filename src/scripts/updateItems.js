var haveToGenerateNewProfileURL = false;

//Locks the update button and sets it in updating status
function setLoadingUpdateButton() {
    var buttonUpdate = document.getElementById("updateButton");
    buttonUpdate.innerHTML = "";
    html = `
        <button type="button" class="btn defaultButtonUpdateRegister" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Actualizando...
        </button>
        `
    buttonUpdate.innerHTML = html;
}

function setDefaultUpdateButton(event, itemID, itemImage) {
    var buttonUpdate = document.getElementById("updateButton");
    buttonUpdate.innerHTML = "";
    if (event == 1) {
        html = `
    <button type="button" class="btn defaultButtonUpdateRegister" onclick="updateItemInfo('${itemID}', '${itemImage}')">
    <i class="fas fa-upload pe-3" aria-hidden="true"></i>Aplicar</button>
        `
    }
    else if (event == 2) {
        html = `
    <button type="button" class="btn defaultButtonUpdateRegister" onclick="">
    <i class="fas fa-upload pe-3" aria-hidden="true"></i>Aplicar</button>
        `
    }
    buttonUpdate.innerHTML = html;
}

function addNewImage() {
    haveToGenerateNewProfileURL = true;
    let updateButton = document.getElementById("update-button");
    let chosenUpdateImage = document.getElementById("chosen-update-image");
    let fileUpdateName = document.getElementById("file-update-name");

    let reader = new FileReader();
    reader.readAsDataURL(updateButton.files[0]);
    reader.onload = () => {
        chosenUpdateImage.setAttribute("src", reader.result);
    }
    fileUpdateName.textContent = 'Archivo:' + updateButton.files[0].name;
}


function updateItemInfo(itemID, itemImage) {
    setLoadingUpdateButton();
    var IUname = document.getElementById('inputUpdateName').value.trim();
    var IUbrand = document.getElementById('inputUpdateBrand').value.trim();
    var IUprice = document.getElementById('inputUpdatePrice').value.trim();
    var IUquantity = document.getElementById('inputUpdateQuantity').value.trim();
    var IUarrivalDate = document.getElementById('inputUpdateArrivalDate').value.trim();
    var IUfeatures = document.getElementById('inputUpdateFeatures').value.trim();


    if (!validateUpdateData(
        IUname,
        IUbrand,
        IUprice,
        IUquantity,
        IUarrivalDate
    )) {
        setDefaultUpdateButton(1, itemID, itemImage);
        return;
    } else {
        if (haveToGenerateNewProfileURL) {
            const ref = firebase.storage().ref();
            const file = document.querySelector("#update-button").files[0];
            var Cname = document.getElementById('inputUpdateName').value.trim();
            const name = Date.now() + "-" + Cname;
            const metadata = {
                contentType: file.type
            }
            const task = ref.child("Items" + "/" + name).put(file, metadata)

            task.then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    const separateDate = IUarrivalDate.split("/");
                    const updateItem = {
                        name: IUname,
                        brand: IUbrand,
                        price: parseFloat(parseFloat(IUprice).toFixed(2)),
                        quantity: parseInt(IUquantity),
                        arrivalDate: firebase.firestore.Timestamp.fromDate(
                            new Date(parseInt(separateDate[1]) + ' ' + parseInt(separateDate[0]) + ', ' + parseInt(separateDate[2]))
                        ),
                        features: IUfeatures,
                        itemImage: url,
                    };

                    updateData(itemID, updateItem);
                });
        }

        else {
            const separateDate = IUarrivalDate.split("/");
            const updateItem = {
                name: IUname,
                brand: IUbrand,
                price: parseFloat(parseFloat(IUprice).toFixed(2)),
                quantity: parseInt(IUquantity),
                arrivalDate: firebase.firestore.Timestamp.fromDate(
                    new Date(parseInt(separateDate[1]) + ' ' + parseInt(separateDate[0]) + ', ' + parseInt(separateDate[2]))
                ),
                features: IUfeatures,
                itemImage: itemImage,
            };

            updateData(itemID, updateItem);
        }
    }
}


async function updateData(
    itemID,
    document
) {
    try {
        await db.collection("Items").doc(itemID).update(document);
        haveToGenerateNewProfileURL = false;
        setDefaultUpdateButton(2, "", "");
        toastr.success("Perfil actualizado correctamente");

        setTimeout(function () {
            window.location.reload()
        }, 800);
    } catch (error) {
        throw new Error(error);
    }
}


function validateUpdateData(
    IUname,
    IUbrand,
    IUprice,
    IUquantity,
    IUarrivalDate
) {
    var infoIsCorrect = true;

    nameUpdateError.innerHTML = "";
    brandUpdateError.innerHTML = "";
    priceUpdateError.innerHTML = "";
    quantityUpdateError.innerHTML = "";
    arrivalDateUpdateError.innerHTML = "";

    //RegEx for the validations
    var regDate = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/
    var regDecimal = /^[-+]?[0-9]+\.[0-9]+$/;
    var regInteger = /^[0-9]*$/;

    let html = "";

    if (IUname == "") {

        html = `
        Por favor, no ingrese valores vacíos
            `
        nameUpdateError.innerHTML = html;
        infoIsCorrect = false;
    }  if (IUbrand == "") {
        html = `
        Por favor, no ingrese valores vacíos
            `
        brandUpdateError.innerHTML = html;
        infoIsCorrect = false;
    }if (IUprice == "" || (!regDecimal.test(IUprice) && !regInteger.test(IUprice))) {

        html = `
            Ingrese un valor adecuado
            `
        priceUpdateError.innerHTML = html;
        infoIsCorrect = false;
    }   if (IUquantity == "" || !regInteger.test(IUquantity)) {

        html = `
            Ingrese un valor adecuado
            `
        quantityUpdateError.innerHTML = html;
        infoIsCorrect = false;
    }if (IUarrivalDate == "" || !regDate.test(IUarrivalDate)) {

        html = `
            Fecha en formato mm/dd/aaaa
            `
        arrivalDateUpdateError.innerHTML = html;
        infoIsCorrect = false;
    }
    
    if (infoIsCorrect) {
        nameUpdateError.innerHTML = "";
        brandUpdateError.innerHTML = "";
        priceUpdateError.innerHTML = "";
        quantityUpdateError.innerHTML = "";
        arrivalDateUpdateError.innerHTML = "";
    }

    return infoIsCorrect;
}



function clearUpdateInputsOnFocusGained(calledFrom) {
if (calledFrom == "nameUpdateError")
    nameUpdateError.innerHTML = "";
else if (calledFrom == "brandUpdateError")
    brandUpdateError.innerHTML = "";
else if (calledFrom == "priceUpdateError")
    priceUpdateError.innerHTML = "";
else if (calledFrom == "quantityUpdateError")
    quantityUpdateError.innerHTML = "";
else if (calledFrom == "arrivalDateUpdateError")
    arrivalDateUpdateError.innerHTML = "";
}


