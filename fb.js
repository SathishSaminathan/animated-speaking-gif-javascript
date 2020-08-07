function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  let ip = decodeURIComponent(results[2].replace(/\+/g, " "));
  return ip.replace(/[.]/g, "");
}

const dbRef = firebase.database().ref();
// const usersRef = dbRef.child("bot");
const usersRef = dbRef.child("bot");
// const usersRef = dbRef.child(getParameterByName("key"));
// console.log("print ip", getParameterByName("key"));
usersRef.on("child_changed", (snap) => {
  let user = snap.val();
  console.log(user);
  alertOne(user);
});
