//https://script.google.com/macros/s/AKfycbwue2qjVhBHDvkwIP2i7hmFdBWOJ6h_1Bu61BtQ-4s3NAfQDp94-ugvBnI-Am6Bkbeskg/exec?getFullData=true

var AllData = "";
var saveButton = document.getElementById("submitBTN");
var RefreshButton = document.getElementById("ReloadData");
var SearchTxtBox = document.getElementById("SearchBox");
var CheckModel;
var CrossModel;
var ModelNamesListSpan;
var SelectedModelID = "";
var CopyModelName;

var VideoCount = 0, imageCount = 0, ArticleCount = 0, StoryCount = 0;

var unpublishedLabel = document.getElementById("lbl_UnPublished");

var API_URL = "https://script.google.com/macros/s/AKfycbwue2qjVhBHDvkwIP2i7hmFdBWOJ6h_1Bu61BtQ-4s3NAfQDp94-ugvBnI-Am6Bkbeskg/exec?";

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
    var dataTablevid = document.querySelector("#content_holder .vid");
    var dataTableimg = document.querySelector("#content_holder .img");
    var dataTablestory = document.querySelector("#content_holder .story");
    var dataTablearticle = document.querySelector("#content_holder .article");
    
    if (AllData.length > 0) {

        for (i = 0; i < AllData.length; i++) { 

            var IndexPostLinks = "";
            
            IndexPostLinks = `
            <a post-type="${AllData[i][1]}" href="Post.html?viewkey=${AllData[i][0]}">
                <span class="displayFlexMiddle">`;
            
            
            if (AllData[i][3].includes("https"))
                IndexPostLinks += `<img src="${AllData[i][3]}">`;
            else
                IndexPostLinks += `<img src="CDN/thumb/${AllData[i][3]}.webp">`;
                
            IndexPostLinks += `
                    <p>${AllData[i][2]}</p>
                </span>
            </a>`;

            if (AllData[i][1] == "Video") {
                VideoCount++;
                dataTablevid.insertAdjacentHTML("beforeend", IndexPostLinks);
            }
                
            
            if (AllData[i][1] == "Image") {
                imageCount++;
                dataTableimg.insertAdjacentHTML("beforeend", IndexPostLinks);
            }
            
            if (AllData[i][1] == "Article") {
                ArticleCount++;
                dataTablearticle.insertAdjacentHTML("beforeend", IndexPostLinks);
            }

            if (AllData[i][1] == "Story") {
                StoryCount++;
                dataTablestory.insertAdjacentHTML("beforeend", IndexPostLinks);
            }
        }
        if (VideoCount > 0)
            dataTablevid.insertAdjacentHTML("beforebegin", `<h3 class="headingTitles">New Videos</h3>`);

        if (imageCount > 0)
            dataTableimg.insertAdjacentHTML("beforebegin", `<h3 class="headingTitles">New Photos</h3>`);

        if (ArticleCount > 0)
            dataTablearticle.insertAdjacentHTML("beforebegin", `<h3 class="headingTitles">Articles</h3>`);

        if (StoryCount > 0)
            dataTablestory.insertAdjacentHTML("beforebegin", `<h3 class="headingTitles">Fun Stories</h3>`);
        decidePostType();
    }
}

function decidePostType(){
    var allThePostLinks = document.querySelectorAll("section .wrapper .content-holder a");
    allThePostLinks.forEach(AnchorTaglinks => {
        if (AnchorTaglinks.getAttribute("post-type") == "Video") {
            AnchorTaglinks.children[0].insertAdjacentHTML("beforeend", `<img src="include/plybutton.png">`)
        }
    });
}

function loadPostData() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const PostIDKey = params.get('viewkey'); 

    var PageTitle;
    var PostCast;
    var PostProduc;
    var PostTag;
    var PostVid;
    var PostImage;
    var PostImageCount;
    var PostContent;

    fetch(API_URL + `getFullData=true`)
        .then(response => response.json())
        .then(data => {
            try {
                if (data.Data.toLowerCase() == "No Data Found".toLowerCase()) {
                }
            } catch (error) {
                AllData = Object.values(data.Data);
                //console.log(AllData);
                for (i = 0; i < AllData.length; i++){
                    if (AllData[i][0] == PostIDKey) {
                        console.log(AllData[i]);
                        document.title = AllData[i][2] + " - Adult Time Saga";
                        document.querySelector(".container .headingTitles").innerText = AllData[i][2];
                        var TempArray = AllData[i][4].split(',');
                        for (j = 0; j < TempArray.length; j++){
                            document.querySelector("#data1").insertAdjacentHTML("beforeend", `<a href="">${TempArray[j].trim()}</a>`);
                        }
                        
                        TempArray = AllData[i][5].split(',');
                        for (j = 0; j < TempArray.length; j++){
                            document.querySelector("#data2").insertAdjacentHTML("beforeend", `<a href="">${TempArray[j].trim()}</a>`);
                        }
                        
                        TempArray = AllData[i][6].split(',');
                        for (j = 0; j < TempArray.length; j++){
                            document.querySelector("#data3").insertAdjacentHTML("beforeend", `<a href="">${TempArray[j].trim()}</a>`);
                        }

                        if (AllData[i][7] != "") {
                            document.querySelector(".content-holder").insertAdjacentHTML("afterbegin", `
                        <video controlsList="nodownload" id="directVid" width="100%" height="auto" controls>
                            <source src="${AllData[i][7]}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        `);
                        }

                        if (AllData[i][8] != "") {
                            var imageName = AllData[i][8];
                            var imageCount = AllData[i][9];
                            const imageHolderTag = document.querySelector(".images-holder");
                            for (i = 0; i < imageCount; i++) {
                                imageHolderTag.insertAdjacentHTML("beforeend" , `<a href="CDN/imgs/${imageName} (${(i+1)}).webp"><img src="CDN/imgs/${imageName} (${(i+1)}).webp"></a>`);
                            }
                        }
                        
                        //document.querySelector(".images-holder")
                        //document.querySelector(".content-holder")
                    }
                }
            }
        })
}

function SaveDataAsATSPost(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13) {
    
    fetch(API_URL + `addRowData=true&dt1=${data1}&dt2=${data2}&dt3=${data3}&dt4=${data4}&dt5=${data5}&dt6=${data6}&dt7=${data7}&dt8=${data8}&dt9=${data9}&dt10=${data10}&dt11=${data11}&dt12=${data12}&dt13=${data13}`)
        .then(response => response.json())
        .then(data => {
            console.log (data.Data);
        })

}