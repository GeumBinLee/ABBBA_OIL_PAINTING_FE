window.onload = () => {
    const realUpload = document.querySelector('#input_image');
    const fakeUpload = document.querySelector('#upload_image');

    fakeUpload.addEventListener('click', () => realUpload.click());

    function readImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader()

            reader.onload = e => {
                const previewImage = document.getElementById("slide")
                previewImage.src = e.target.result
            }
            reader.readAsDataURL(input.files[0])
        }
    }
    const inputImage = document.getElementById("input_image")
    inputImage.addEventListener("change", e => {
        readImage(e.target)
    })
    
}




const exampleImage = ["https://media.istockphoto.com/id/487474326/vector/low-polygon-llion-geometric-pattern-explode-vector-illustratio.jpg?s=612x612&w=0&k=20&c=RgB7yFaqxS1Rp7_vV0_4QGpyQbJ5TqXvoTvjAo--9Vw=","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDqTgeaO4-nl32GMEPrZ5k4XJXR2YugnX6jw&usqp=CAU","https://mblogthumb-phinf.pstatic.net/MjAxOTEyMTBfMTI5/MDAxNTc1OTQ2Nzc1OTIy.ItplAsigh5YToRGRCStcVIDqYKYSHncaWFUYu58BIr0g.tGzqWl-PWpmGkqCuMBAUgEBc2oh_-v1udYhDEx9DjP4g.JPEG.enaeng1/F17-1.JPG?type=w800"]
const slide = document.querySelector("#slide");
const second_slide = document.querySelector("#second_slide");
const imgList = ["https://c4.wallpaperflare.com/wallpaper/924/800/901/spider-man-artwork-ps4-red-wallpaper-preview.jpg",
    "https://wallpapercave.com/wp/wp9669554.jpg", "http://ojsfile.ohmynews.com/BIG_IMG_FILE/2016/1101/IE002043078_BIG.jpg"];
let i = 0;
const spider = document.querySelector("#spider")
const witch = document.querySelector("#witch")
const doctor = document.querySelector("#doctor")

spider.onclick = function () {
    slide.src = imgList[0];
    slide.classList.remove("2","3");
    slide.classList.add("1");
    second_slide.src = exampleImage[0];
}
witch.onclick = function () {
    slide.src = imgList[1];
    second_slide.src = exampleImage[1];
    slide.classList.remove("1","3");
    slide.classList.add("2");
}
doctor.onclick = function () {
    slide.src = imgList[2];
    second_slide.src = exampleImage[2];
    slide.classList.remove("1","2");
    slide.classList.add("3");
}

function prev() {
    i--;
    slide.src = imgList[i];
    second_slide.src = exampleImage[i];
    if (i < 0) {
        i = imgList.length - 1;
        slide.src = imgList[i];
        second_slide.src = exampleImage[i];
    }
}

function next() {
    i++;
    slide.src = imgList[i];
    second_slide.src = exampleImage[i];
    if (i >= imgList.length) {
        i = 0;
        slide.src = imgList[i]
        second_slide.src = exampleImage[i]
    }
}



function download() {

}

download = document.getElementById("download")
download.onclick = function () {
    // fetch(`http://127.0.0.1:8000/painters/download/${painting.id}`,{
    response = fetch("http://127.0.0.1:8000/painters/download/2", {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET'
    })
        .then(response => response.json())
    console.log(response)
    alert("다운 완료!")
}

convert = document.querySelector(".convert")
convert.onclick = async function(){
    let cls = slide.getAttribute("class");
    cls = cls.toString();
    const picture = document.querySelector("#input_image");
    var formData = new FormData()
    formData.append("picture", picture.files[0])
        formData.append("painter", cls)
        response = await fetch("http://127.0.0.1:8000/painters/convert/",{
            headers: {
                "authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'POST',
            cache:'no-cache',
            body : formData
        })
        .then(response => response.json())

        const converted_image = await fetch(`http://127.0.0.1:8000/painters/painting/${response.id}/`,{
            headers : {
                "authorization": "Bearer " + localStorage.getItem("access")
            },
            method : 'GET'
        })
        .then(converted_image => converted_image.json())

        
        console.log(converted_image[0].painting)
        second_slide.src = "http://127.0.0.1:8000" + converted_image[0].painting
        
        alert("변환 성공!")
    
}