const userSession = sessionStorage.getItem("user");

if (!userSession) {
  location.href = "/";
}

$("#logout").on("click", function () {
  closeSession();
});

// ?email
const profile = document.location.search;
console.log(profile);
const email = new URLSearchParams(profile).get("email");
const data = findUserByEmail(email);

$("#user-data").html(`
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${data.name}</h5>
      <h6 class="card-subtitle mb-2">${data.email}</h6>
      <p class="card-text">${data.alias}</p>
      <p class="card-text">${data.date_birth}</p>
    </div>
  </div>
`);
