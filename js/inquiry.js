window.onload = () => {
    handleinquiries()
}
function to_inquiry_detail(id) {
    location.href = "inquiry_detail.html"
    localStorage.setItem("article_id", id);
}


async function handleinquiries(){
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
   
    const response = await fetch ('http://127.0.0.1:8000/inquiries/',{
        headers : {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })

    response_json = await response.json()

    

    for(let i = response_json.length -1; i >= 0; i--){
        const create_at=response_json[i].created_at.slice(0,10)
        const inquiry = document.createElement("tr")

        inquiry.innerHTML=
        `<td>${response_json[i].id}</td>
        <td>${response_json[i].title}</td>
        <td>${response_json[i].nickname}</td>
        <td>${create_at}</td>
        <th><button  onclick="to_inquiry_detail(${response_json[i].id});" class="bbtn_btn-dark">클릭</button></th>`;

        document.querySelector(".body").append(inquiry)

    }
}

const modal = document.querySelector('.modal');
const modal_open = document.querySelector('.btn_btn-dark');
const modal_close = document.querySelector('.modal_close');

modal_open.addEventListener('click', () => {
modal.style.display = 'block';
});

modal_close.addEventListener('click', () => {
    modal.style.display = 'none';
    });



async function inquirypost() {
    const content = document.getElementById("content").value
    const title = document.getElementById("title").value

    await fetch('http://127.0.0.1:8000/inquiries/',{
        headers:{
            'content-type':'application/json',
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        
        method:'post',

        body: JSON.stringify({
            "title":title,
            "content":content,
        })
    })
}