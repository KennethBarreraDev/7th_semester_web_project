//This script is called in admin-team-members.html
//But updateCyclistInfo method and --- are called in the code injection of loadModal method in adminShowTeamMembers.js

var haveToGenerateNewProfileURL = false;


//Locks the delete button and sets it in droping data status
function setLoadingDeleteButton() {
    var buttonUpdate = document.getElementById("buttonDelete");
    buttonUpdate.innerHTML = "";
    html = `
        <button type="button" class="btn defaultButtonDeleteRegister" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Eliminando...
        </button>
        `
    buttonUpdate.innerHTML = html;
}

//Returns the delete button to his original state after a delete data action was executed. 
function setDefaultDeleteButton() {
    var buttonUpdate = document.getElementById("buttonDelete");
    buttonUpdate.innerHTML = "";
    html = `
    <button type="button" class="btn defaultButtonDeleteRegister" onclick="">
    <i class="far fa-trash-alt pe-3" aria-hidden="true"></i>Eliminar</button>
        `
    buttonUpdate.innerHTML = html;
}


async function deleteDocument(
    itemID,
) {
    try {
        setLoadingDeleteButton();
        await db.collection("Items").doc(itemID).delete();
        toastr.success("Producto eliminado correctamente");
        setTimeout(function () {
            window.location.reload()
        }, 800);
        setDefaultDeleteButton();
    } catch (error) {
        throw new Error(error);
    }
}

