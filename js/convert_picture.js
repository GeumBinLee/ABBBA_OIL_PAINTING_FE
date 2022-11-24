window.onload = () => {
const realUpload = document.querySelector('#input_image');
const fakeUpload = document.querySelector('#upload_image');

fakeUpload.addEventListener('click', () => realUpload.click());
}