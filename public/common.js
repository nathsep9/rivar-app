const storageKey = "users";
const storageSessionKey = "user";
const friendsKey = "friends";

const findUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem(storageKey)) || [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      return users[i];
    }
  }
  return null;
};
const findUserByEmail = (email) => {
  const users = JSON.parse(localStorage.getItem(storageKey)) || [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return users[i];
    }
  }
  return null;
};

const saveUser = (user) => {
  const users = JSON.parse(localStorage.getItem(storageKey)) || [];
  users.push(user);
  localStorage.setItem(storageKey, JSON.stringify(users));
};

const closeSession = () => {
  sessionStorage.removeItem(storageSessionKey);
  location.href = "./index.html";
};

const addFriend = (user, emailFriend) => {
  const friends = JSON.parse(localStorage.getItem(friendsKey)) || [];
  friends.push({
    user: user.email,
    friend: emailFriend,
  });
  localStorage.setItem(friendsKey, JSON.stringify(friends));
  return friends;
};

const deleteFriend = (user, emailFriend) => {
  const friends = JSON.parse(localStorage.getItem(friendsKey)) || [];
  const friendsEmail = friends.filter((friend) => friend.user === user.email);
  const friendsList = [];
  for (let i = 0; i < friendsEmail.length; i++) {
    if (
      friendsEmail[i].friend === emailFriend &&
      friendsEmail[i].user === user.email
    ) {
      friends.splice(i, 1);
    }
  }
  localStorage.setItem(friendsKey, JSON.stringify(friends));
  return friendsList;
};

const getFriends = (user) => {
  const friends = JSON.parse(localStorage.getItem(friendsKey)) || [];
  const friendsEmail = friends.filter((friend) => friend.user === user.email);
  const users = JSON.parse(localStorage.getItem(storageKey)) || [];
  const friendsList = [];
  for (let i = 0; i < friendsEmail.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (friendsEmail[i].friend === users[j].email) {
        friendsList.push(users[j]);
      }
    }
  }
  return friendsList;
};

const getAvailableFriends = (userSession) => {
  const friendsEmail = getFriends(userSession).map((friend) => friend.email);
  const users = JSON.parse(localStorage.getItem(storageKey)) || [];
  return users.filter(
    (user) =>
      !friendsEmail.includes(user.email) && user.email !== userSession.email
  );
};
