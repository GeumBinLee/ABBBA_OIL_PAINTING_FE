async function handleSignup() {
    const nickname = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password_check = document.getElementById("password_check").value

    if (password == password_check) {
        const response = await fetch('http://127.0.0.1:8000/users/', {
            headers: {
                'content-type' : 'application/json',
            },
            method: 'POST',
            body: JSON.stringify( {
                "nickname": nickname,
                "password": password,
                "password_check": password_check
            })
        })
        console.log(response)
    }
}