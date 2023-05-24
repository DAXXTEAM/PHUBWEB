var AllData = "";
var saveButton = document.getElementById("submitBTN");
var RefreshButton = document.getElementById("ReloadData");
var SearchTxtBox = document.getElementById("SearchBox");
var CheckModel;
var CrossModel;
var ModelNamesListSpan;
var SelectedModelID = "";
var CopyModelName;
var IndexPgHeading;
var LongAds;
var Ads300x250;

var VideoCount = 0, imageCount = 0, ArticleCount = 0, StoryCount = 0;

var unpublishedLabel = document.getElementById("lbl_UnPublished");

var API_URL = "https://script.google.com/macros/s/AKfycbyJTv_bUx45AbLjqhkC0qeqhCRsPOLhn2-eDUAWbuuiaCKXuHegc7h4n82hPwvXInpqtg/exec?";

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
        
        //Ads part Start
        IndexPgHeading = document.querySelectorAll(".headingTitles");
        Ads300x250 = document.querySelectorAll(".box-adds");
        //Ads part End
        LoadAds();
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

    fetch(API_URL + `viewPost=${PostIDKey}&code=${PostIDKey}`)
        .then(response => response.json())
        .then(data => {
            try {
                if (data.Data.toLowerCase() == "No Data Found".toLowerCase()) {
                }
            } catch (error) {
                AllData = Object.values(data.Data);
                //console.log(AllData);
                document.title = AllData[2] + " - Adult Time Saga";
                        document.querySelector(".container .headingTitles").innerText = AllData[2];
                        var TempArray;
                        
                        if (AllData[4] == "")
                            document.querySelector("#data1").style.display = "none";
                        else{
                            TempArray = AllData[4].split(',');
                            for (j = 0; j < TempArray.length; j++){
                                document.querySelector("#data1").insertAdjacentHTML("beforeend", `<a href="">${TempArray[j].trim()}</a>`);
                            }
                            document.querySelector("#data1").insertAdjacentHTML("afterbegin", `<h4>Cast- </h4>`);
                        }
                        
                        if (AllData[5] == "")
                            document.querySelector("#data2").style.display = "none";
                        else {
                            TempArray = AllData[5].split(',');
                            for (j = 0; j < TempArray.length; j++){
                                document.querySelector("#data2").insertAdjacentHTML("beforeend", `<a href="">${TempArray[j].trim()}</a>`);
                            }
                            document.querySelector("#data2").insertAdjacentHTML("afterbegin", `<h4>Production - </h4>`);
                        }
                        
                        
                        if (AllData[6] == "")
                            document.querySelector("#data3").style.display = "none";
                        else { 
                            TempArray = AllData[6].split(',');
                            for (j = 0; j < TempArray.length; j++){
                                document.querySelector("#data3").insertAdjacentHTML("beforeend", `<a href="">${TempArray[j].trim()}</a>`);
                            }
                            document.querySelector("#data3").insertAdjacentHTML("afterbegin", `<h4>Tags - </h4>`);
                        }

                        if (AllData[7] != "") {
                            
                            if (AllData[7].includes("iframe")) {
                                document.querySelector(".content-holder").insertAdjacentHTML("afterbegin", `<iframe src="${AllData[7].replace("iframe","").trim()}" frameborder="0"></iframe>`);
                            }
                            else
                                document.querySelector(".content-holder").insertAdjacentHTML("afterbegin", `
                                <video controlsList="nodownload" id="directVid" width="100%" height="auto" controls>
                                    <source src="${AllData[7]}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                                `);
                        }

                        if (AllData[8] != "") {
                            var imageName = AllData[8];
                            var imageCount = AllData[9];
                            const imageHolderTag = document.querySelector(".images-holder");
                            for (i = 0; i < imageCount; i++) {
                                imageHolderTag.insertAdjacentHTML("beforeend" , `<a data-fancybox="thumb" href="CDN/imgs/${imageName} (${(i+1)}).webp"><img src="CDN/imgs/${imageName} (${(i+1)}).webp"></a>`);
                            }
                        }
                        
                if (AllData[10] != "" || AllData[11] != "" || AllData[12] != "" || AllData[13] != "") {
                    var textDataContent = "";
                    if (AllData[10] != "")
                        textDataContent += AllData[10];
                    if (AllData[11] != "")
                        textDataContent += "<br/>"+AllData[11];
                    if (AllData[12] != "")
                        textDataContent += "<br/>"+AllData[12];
                    if (AllData[13] != "")
                        textDataContent += "<br/>"+AllData[13];
                    
                    if (textDataContent.includes("<a")) {
                        textDataContent = textDataContent.replace("<a", "<div style='text-align:center'><a");
                        textDataContent = textDataContent.replace("</a>", "</div></a>");
                    }
                    textDataContent = `<div class="text-data">${textDataContent}</div>`;
                    document.querySelector(".content-holder").insertAdjacentHTML("beforeend", textDataContent)
                }
            }
        })
}

function SaveDataAsATSPost(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13) {
    var queryString = API_URL + `addRowData=true&dt1=${data1}&dt2=${data2}&dt3=${data3}&dt4=${data4}&dt5=${data5}&dt6=${data6}&dt7=${data7}&dt8=${data8}&dt9=${data9}&dt10=${data10}&dt11=${data11}&dt12=${data12}&dt13=${data13}`;
    console.log("Save - "+queryString);
    if (queryString.length < 2000) {
        fetch(queryString)
        .then(response => response.json())
            .then(data => {
                if(data.Data.includes("Data Inserted Successfully")){
                    document.querySelector("#PostType").value = "";
                    document.querySelector("#Post_Title").value = "";
                    document.querySelector("#Post_Thumbnail").value = "";
                    document.querySelector("#Post_Casts").value = "";
                    document.querySelector("#Post_Production").value = "";
                    document.querySelector("#Post_Tags").value = "";
                    document.querySelector("#Post_VideoContent").value = "";
                    document.querySelector("#Post_Imagefolder").value = "";
                    document.querySelector("#Post_ImageCount").value = "";
                    document.querySelector("#Post_Content1").value = "";
                    document.querySelector("#Post_Content2").value = "";
                    document.querySelector("#Post_Content3").value = "";
                    document.querySelector("#Post_Content4").value = "";
                }
                alert(data.Data);
        })    
    }

    //<a target='_blank' href='https://www.locoloader.com/?url=https%3A%2F%2Fspankbang.com%2F81nyt%2Fvideo%2F'>Click here to Download</a>
}

function UpdateDataAsATSPost(code, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13) {
    var queryString = API_URL + `updateRowData=${code}&dt1=${data1}&dt2=${data2}&dt3=${data3}&dt4=${data4}&dt5=${data5}&dt6=${data6}&dt7=${data7}&dt8=${data8}&dt9=${data9}&dt10=${data10}&dt11=${data11}&dt12=${data12}&dt13=${data13}`;
    console.log("Update - "+queryString);
    if (queryString.length < 2000) {
        fetch(queryString)
            .then(response => response.json())
            .then(data => {
                console.log(data.Data);
            })
    }
    else
        alert("Query String is way too long. - " + queryString.length);
}

function GetPostData(PostCode) {
    fetch(API_URL + `getRowData=true&code=${PostCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.Data.length != 13) {
                PostData = data.Data;
                document.querySelector(".DBButtons").style.display = "flex";
            }
        })
}

function LoadAds() {
    IndexPgHeading.forEach(headTitles => {
        headTitles.insertAdjacentHTML("beforebegin", `<div class="ads long-ads">
        <script type="text/javascript">
        atOptions = {
            'key' : '64e4e1df395212a77b9282d1c95a4cb9',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
        };
        document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.profitabledisplaynetwork.com/64e4e1df395212a77b9282d1c95a4cb9/invoke.js"></scr' + 'ipt>');
    </script>
        </div>`);
    });
}
