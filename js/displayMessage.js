// display message
function displayMessage(event) {
  event.preventDefault();
  const name = event.target.elements.name.value;
  const second = event.target.elements.second.value;
  const email = event.target.elements.email.value;
  const phone = event.target.elements.phone.value;
  let formBox = document.getElementById("formBox");
  let form = document.getElementById("formInfor");
  formBox.removeChild(form);
  let titleBox = document.getElementById("titleBox");
  let title = document.getElementById("title");
  titleBox.removeChild(title);
  titleBox.innerHTML = getPersonalDetailHTML(name);
}

// return html template
function getPersonalDetailHTML(personal_detail) {
  return `
        <div class="personal-box">
            <h2 class="personal-message">Thank you for submitting form,${personal_detail} !!</h2>
            <h2> Our team will contact you soon.</h2>
        </div>
        `;
}
