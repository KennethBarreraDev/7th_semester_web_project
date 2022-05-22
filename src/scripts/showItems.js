const itemsContainer = document.getElementById("items-container");
const modalTeamMembersContainer = document.getElementById("updateRegisterModal");
let returnedItems;



loadItems();


async function loadItems() {
    itemsContainer.innerHTML = "";
    try {
        const response = await db.collection("Items").get();
        returnedItems = response;
        renderItemsInScreen();
    } catch (error) {
        console.error(error);
    }
}

function renderItemsInScreen() {
    let htmlCardItem = "";

    returnedItems.forEach((itemFound) => {
        htmlCardItem += `
    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4 mt-5 d-flex justify-content-center">
        <!-- Card-->
        <div id="${itemFound.id}" class="shadow-animation card shadow border-0 rounded item-card text-center" style="width: 15rem;">
            <div class="card-body p-3 embed-responsive-item"><img src="${itemFound.data().itemImage}" alt=""
                    class="card-img-top img-fluid" >
                <div class="p-2">
                    <h5 class="mb-0 text-center">${itemFound.data().name}</h5>
                </div>
                <div class="p-2 text-end">

                    <button type="button"
                        class="btn btn-outline-primary btn-rounded waves-effect btn-sm"
                        data-bs-toggle="modal" data-bs-target="#updateRegisterModal">
                        <i class="fas fa-eye pr-2" aria-hidden="true"></i> Ver perfil</button>
                </div>
            </div>
        </div>
    </div>
        `;
    });
    itemsContainer.innerHTML = htmlCardItem;


    document.querySelectorAll(".item-card").forEach((itemsCard) => {
        itemsCard.addEventListener("click", (e) => {
            loadModal(itemsCard.id);
        });
    });
}


function loadModal(itemID) {
    modalTeamMembersContainer.innerHTML = "";
    let htmlModalTeamMembers = "";

    console.log("--- LOAD MODAL---");

    returnedItems.forEach((currentItem) => {
        if (currentItem.id == itemID) {
            htmlModalTeamMembers = `
            <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">

                <!--Modal header-->
                <div class="text-center modalHead modal-header">
                    <h5 class="w-100">Editar perfil</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                <div class="container">
                <div class="row">
                    <form>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">

                                    <div class="row">
                                        <div class="form-group">
                                            
                                            <div class="card bg-white mt-2 rounded" style="width: 14rem;">
                                                <img id="chosen-update-image" src="${currentItem.data().itemImage}"
                                                    class="card-img-top img-fluid">
                                                <figcaption id="file-update-name"></figcaption>
                                                <div class="card-body">

                                                    <input type="file" id="update-button" accept="image/*"
                                                        onclick="clearInputsOnFocusGained('imageUpdateError')">
                                                    <label class="text-picker" for="update-button">
                                                        <i class="fas fa-upload"></i> &nbsp; Selecciona una
                                                        imagen
                                                    </label>
                                                </div>
                                            </div>
                                            <span id="imageUpdateError" class="errorMessages"></span>
                                            
                                            
                                            <label class="lb-blue mt-3 mb-2"
                                                for="inputUpdateName">Nombre producto:</label>
                                            <input id="inputUpdateName" type="text" class="form-control"
                                                placeholder="Nombre del producto" value="${currentItem.data().name}"
                                                onfocus="clearInputsOnFocusGained('nameError')">
                                            <span id="nameUpdateError" class="errorMessages"></span>

                                            
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 mb-3">
                                            <label class="lb-blue mt-3 mb-2"
                                                for="inputUpdateBrand">Marca:</label>
                                            <input id="inputUpdateBrand" type="text" class="form-control"
                                                placeholder="Marca" value="${currentItem.data().brand}"
                                                onfocus="clearInputsOnFocusGained('brandError')">
                                            <span id="brandUpdateError" class="errorMessages"></span>
                                        </div>

                                        <div
                                            class="col-sm-12 col-md-12 col-lg-6 col-xl-6 ms-sm-0 ms-md-0 ms-lg-4 ms-xl-4 mb-3">
                                            <label class="lb-blue mt-3 mb-2" for="inputPrice">Precio</label>
                                            <input id="inputUpdatePrice" type="text" class="form-control"
                                                placeholder="$0.0" value="${currentItem.data().price}"
                                                onfocus="clearInputsOnFocusGained('priceError')">
                                            <span id="priceUpdateError" class="errorMessages"></span>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 mb-3">
                                            <label class="lb-blue mt-3 mb-2"
                                                for="inputUpdateQuantity">Cantidad:</label>
                                            <input id="inputUpdateQuantity" type="text" class="form-control"
                                                placeholder="0 = agotado" value="${currentItem.data().quantity}"
                                                onfocus="clearInputsOnFocusGained('quantityError')">
                                            <span id="quantityUpdateError" class="errorMessages"></span>
                                        </div>

                                        <div
                                            class="col-sm-12 col-md-12 col-lg-6 col-xl-6 ms-sm-0 ms-md-0 ms-lg-4 ms-xl-4 mb-3">
                                            <label class="lb-blue mt-3 mb-2" for="inputUpdateArrivalDate">Fecha arribo</label>
                                            <input id="inputUpdateArrivalDate" type="text" class="form-control"
                                                placeholder="dd/mm/aaaa" value="${getDD_MM_AAAA(currentItem.data().arrivalDate.toDate())}"
                                                onfocus="clearInputsOnFocusGained('arrivalDateError')">
                                            <span id="arrivalUpdateDateError" class="errorMessages"></span>
                                        </div>
                                    </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 ms-xs-0 ms-sm-0 ms-md-0 ms-lg-5 ms-xl-5">
                                    <label class="mt-3 mb-2"
                                    for="inputUpdateFeatures">Características</label>
                                    <textarea id="inputUpdateFeatures" class="form-control" rows="17">${currentItem.data().features}</textarea>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>

                </div>

            <div class="modal-footer">
                <div id="buttonDelete">
                    <button type="button" class="btn defaultButtonDeleteRegister" onclick="deleteDocument('${itemID}')">
                        <i class="far fa-trash-alt pe-3" aria-hidden="true"></i>Eliminar</button>
                </div>
                <div id="buttonUpdate">
                    <button type="button" class="btn defaultButtonUpdateRegister" onclick="updateItemInfo('${itemID}', '${currentItem.data().ItemImage}')">
                        <i class="fas fa-upload pe-3" aria-hidden="true"></i>Aplicar</button>
                </div>
            </div>

            </div>
        </div>
            `;
        }
    });
    modalTeamMembersContainer.innerHTML = htmlModalTeamMembers;
}



function getDD_MM_AAAA(timestamp) {
    var date = timestamp.getDate();
    var month = timestamp.getMonth();
    var year = timestamp.getUTCFullYear();

    //If the date is between 1 - 9
    if (date < 10 && (month + 1) < 10) return ("0" + date + "/" + "0" + (month + 1) + "/" + year);
    if (date < 10) return ("0" + date + "/" + (month + 1) + "/" + year)
    if ((month + 1) < 10) return (date + "/" + "0" + (month + 1) + "/" + year);
    return (date + "/" + (month + 1) + "/" + year);


}
