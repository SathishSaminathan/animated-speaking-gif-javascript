
const dbRef = firebase.database().ref();
const usersRef = dbRef.child("bot");

usersRef.on("child_changed", (snap) => {
  let user = snap.val();
  console.log(user);
  alertOne(user)
});
