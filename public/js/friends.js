const userSession = sessionStorage.getItem("user");

function buildTables(user) {
  const friends = getFriends(user);
  $("#friends").empty();
  if (friends.length) {
    for (const friend of friends) {
      $("#friends").append(`
      <tr>
          <th scope="row">${friend.alias}</th>
          <th scope="row">
            <a href="./user.html?email=${friend.email}">
              <button type="button" class="btn btn-primary">
                View Profile
              </button>
            </a>
            <button class="btn btn-danger delete-friend" data-email="${friend.email}">
              Delete Friend
            </button>
          </th>
      </tr>
    `);
    }
  } else {
    $("#friends").append(`
      <tr>
          <th scope="row" colspan="2">No friends yet</th>
      </tr>
    `);
  }
  const availableFriends = getAvailableFriends(user);
  $("#available-friends").empty();

  if (availableFriends.length) {
    for (const friend of availableFriends) {
      $("#available-friends").append(`
      <tr>
          <th scope="row">
          <a href="./user.html?email=${friend.email}">
            ${friend.alias}
          </a>
          </th>
          <td>
            <button class="btn btn-primary add-friend" data-email="${friend.email}">Add Friend</button>
          </td>
      </tr>
    `);
    }
  } else {
    $("#available-friends").append(`
      <tr>
          <th scope="row" colspan="2">No available friends yet</th>
      </tr>
    `);
  }
  $(".delete-friend").on("click", function () {
    const email = $(this).data("email");
    deleteFriend(user, email);
    buildTables(user);
  });
  $(".add-friend").on("click", function () {
    const email = $(this).data("email");
    addFriend(user, email);
    buildTables(user);
  });
}

if (userSession) {
  const user = JSON.parse(window.atob(userSession));
  $("#name").text(user.name);
  buildTables(user);
} else {
  location.href = "/";
}

$("#logout").on("click", function () {
  closeSession();
});
