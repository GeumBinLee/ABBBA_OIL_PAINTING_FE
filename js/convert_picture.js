window.onload = () => {
    const realUpload = document.querySelector('#input_image');
    const fakeUpload = document.querySelector('#upload_image');

    fakeUpload.addEventListener('click', () => realUpload.click());

}

const slide = document.querySelector("#slide");
const imgList = ["https://c4.wallpaperflare.com/wallpaper/924/800/901/spider-man-artwork-ps4-red-wallpaper-preview.jpg",
"https://wallpapercave.com/wp/wp9669554.jpg", "http://ojsfile.ohmynews.com/BIG_IMG_FILE/2016/1101/IE002043078_BIG.jpg"];
let i = 0;
const spider = document.querySelector("#spider")
const witch = document.querySelector("#witch")
const doctor = document.querySelector("#doctor")

spider.onclick = function(){
    slide.src = imgList[0]
}
witch.onclick = function(){
    slide.src = imgList[1]
}
doctor.onclick = function(){
    slide.src = imgList[2]
}

function prev(){
    i--;
    slide.src = imgList[i];
    if(i<0){
        i = imgList.length-1;
        slide.src = imgList[i];
    }
}

function next(){
    i++;
    slide.src = imgList[i];
    if(i>= imgList.length){
        i=0;
        slide.src = imgList[i]
    }
}

function download(){

}

download = document.getElementById("download")
download.onclick = function(){
    // fetch(`http://127.0.0.1:8000/painters/download/${painting.id}`,{
    response = fetch("http://127.0.0.1:8000/painters/download/2",{
        headers:{
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })
    .then(response => response.json())
    console.log(response)
    alert("다운 완료!")
}