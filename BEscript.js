//https://script.google.com/macros/s/AKfycbyJy-bzG8dwXxRWYQwLjygvmd1SzaRFVW6gFZdyHbIM4sJrEEj3WzJb_rnpbI0xX4W8SA/exec?getFullData=true

var AllData = "";
var saveButton = document.getElementById("submitBTN");
var RefreshButton = document.getElementById("ReloadData");
var SearchTxtBox = document.getElementById("SearchBox");
var CheckModel;
var CrossModel;
var ModelNamesListSpan;
var SelectedModelID = "";
var CopyModelName;

var unpublishedLabel = document.getElementById("lbl_UnPublished");

var API_URL = "https://script.google.com/macros/s/AKfycbyJy-bzG8dwXxRWYQwLjygvmd1SzaRFVW6gFZdyHbIM4sJrEEj3WzJb_rnpbI0xX4W8SA/exec?";

function InitialLoad()
{
    fetch(API_URL + `getFullData=true`)
        .then(response => response.json())
        .then(data => {
            try {
                if (data.Data.toLowerCase() == "No Data Found".toLowerCase()) {
                }
            } catch (error) {
                AllData = Object.values(data.Data);
                console.log(AllData);
            }
            LoadData(); // Loading Data at the begining
        })
}

function LoadData() {
    var dataTable = document.querySelector("#content_holder");
    dataTable.innerHTML = "";
    
    if (AllData.length > 0) {

        for (i = 0; i < AllData.length; i++) { 
            dataTable.insertAdjacentHTML("beforeend", 
                `<a href="${AllData[i][7]}.html">
                    <span class="displayFlexMiddle">
                        <img src="CDN/imgs/${AllData[i][3]}.webp">
                        <p>${AllData[i][2]}</p>
                    </span>
                </a>
            `);                
        }
    }
}

function copyText(textToCopy) {

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            //triggerMessage("success", "New URL Copied");
            alert("Text copied to clipboard!");
        })
        .catch((error) => {
            console.error("Error copying text: ", error);
        });
}

function CopyModelNameFeature() {
    CopyModelName.forEach(element => {
        element.addEventListener("click", (e) => {
            e.stopPropagation();
            copyText(element.parentElement.innerText.trim());
        })
    });
}

function CrossModelFeature() {
    CrossModel.forEach(element => {
        element.addEventListener("click", (e) => {
            e.stopPropagation();
            UpdateModelData(element.parentElement.getAttribute("id") , element.parentElement.innerText.trim(), 'false');
        })
    });
}

function CheckModelFeature() {
    CheckModel.forEach(element => {
        element.addEventListener("click", (e) => {
            e.stopPropagation();
            UpdateModelData(element.parentElement.getAttribute("id") , element.parentElement.innerText.trim(), 'true');
        })
    });
}

function ModelNameClick() {
    ModelNamesListSpan.forEach(element => {
        element.addEventListener("click", () => { 
            if (element.classList.contains("active"))
                document.getElementById("toggle_Published").checked = true;
            else
                document.getElementById("toggle_Published").checked = false;

            document.getElementById("P_Title").value = element.innerText.trim();
            SelectedModelID = element.getAttribute("id");
            saveButton.innerText = "Update";
        })
        
    });
}

function UpdateModelData(ModelID, ModelName, ModelStatus) {
    fetch(API_URL + `updateRowData=${ModelID}&dt1=${ModelName}&dt2=${ModelStatus}`)
                .then(response => response.json())
                .then(data => {
                    alert(data.Data);
                    InitialLoad(); // Loading Data at the begining
                })
}