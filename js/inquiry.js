window.onload = () => {
    console.log("연결")
    handleinquiries()
}
function to_article_detail(id) {
    location.href = "detail_post.html"
    localStorage.setItem("article_id", id);
}
function to_write_article() {
    location.href = "upload_post.html"
}

async function handleinquiries(){
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const user_id = payload_parse.user_id
    console.log("함수연결")
   
    const response = await fetch ('http://127.0.0.1:8000/inquiries/',{
        headers : {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })

    response_json = await response.json()
    console.log(response_json)

    

    for(let i = response_json.length -1; i >= 0; i--){
        const create_at=response_json[i].created_at.slice(0,10)
        const inquiry = document.createElement("tr")

        inquiry.innerHTML=
        `<td>${response_json[i].id}</td>
        <td>${response_json[i].title}</td>
        <td>${response_json[i].nickname}</td>
        <td>${create_at}</td>
        <th><button onclick="to_article_detail(${response_json[i].id});">클릭</button></th>`;

        document.querySelector(".body").append(inquiry)
        console.log(response_json[i]);
        console.log(response_json[i].title);
        console.log(response_json[i].content);

    }
}

