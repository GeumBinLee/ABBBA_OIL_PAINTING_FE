window.onload = () => {};

async function handleSignup() {
  const email = document.getElementById("signup_email").value;
  const password = document.getElementById("signup_password").value;
  const password_check = document.getElementById("signup_password_check").value;
  const nickname = document.getElementById("nickname").value;
  const sign_up_Alert = document.getElementById("sign_up_Alert");

  const response = await fetch("http://127.0.0.1:8000/users/", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      password_check: password_check,
      nickname: nickname,
    }),
  });

  const Response = await response.json();

  if (response.status === 201) {
    alert("회원가입 성공!");
    window.location.reload();
  } else if (response.status === 400) {
    if ("email" in Response) {
      sign_up_Alert.innerText = Response.email[0];
    } else if ("password" in Response) {
      sign_up_Alert.innerText = Response.password[0];
    } else if ("password_check" in Response) {
      sign_up_Alert.innerText = Response.password_check[0];
    } else if ("nickname" in Response) {
      sign_up_Alert.innerText = Response.nickname[0];
    }
  }
}
async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const Alert = document.getElementById("alert");
  const response = await fetch("http://127.0.0.1:8000/users/api/token/", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  localStorage.setItem("payload", jsonPayload);
}

function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  alert("로그아웃이 완료되었습니다!");
  location.href = "signup.html";
}
