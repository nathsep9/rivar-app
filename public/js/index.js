const login = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const email = $("#login-email").first().val();
  const password = $("#login-password").first().val();
  const hash = sha512(password);

  const user = findUser(email, hash);
  console.log(user);
  if (user) {
    const base64 = window.btoa(JSON.stringify(user));
    sessionStorage.setItem(storageSessionKey, base64);
    location.href = "./friends.html";
  } else {
    alert("login failed");
  }
};

const register = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const name = $("#name").first();
  const email = $("#email").first();
  const alias = $("#alias").first();
  const password = $("#password").first();
  const password_confirmation = $("#password_confirmation").first();
  const date_birth = $("#date_birth").first();
  if (password.val() !== password_confirmation.val()) {
    password_confirmation.addClass("is-invalid");
    password_confirmation
      .parent()
      .append("<div class='invalid-feedback'>Passwords do not match</div>");
    return;
  } else {
    password_confirmation.removeClass("is-invalid");
    password_confirmation.parent().find(".invalid-feedback").remove();
  }

  const hash = sha512(password.val());
  const exist = !!findUserByEmail(email.val(), hash);

  if (exist) {
    email.addClass("is-invalid");
    email
      .parent()
      .append(
        "<div class='invalid-feedback'>User with this email already exists</div>"
      );
    return;
  } else {
    email.removeClass("is-invalid");
    email.parent().find(".invalid-feedback").remove();
  }
  const user = {
    name: name.val(),
    email: email.val(),
    alias: alias.val(),
    password: hash,
    date_birth: date_birth.val(),
  };
  saveUser(user);
  alert("User created successfully");
  location.reload();
};

document.getElementById("login").addEventListener("submit", login);
document.getElementById("register").addEventListener("submit", register);
