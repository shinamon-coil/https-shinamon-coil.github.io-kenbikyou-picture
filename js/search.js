let searchWord = document.getElementById("search");
searchWord.addEventListener('keypress', inputChange);
console.log(searchWord.value);

function inputChange(e) {
  if (isEnterKey(e)) {
    console.log("search");
  }
}

function isEnterKey(e) {
  if (e.keyCode === 13) {
    return true;
  }
  return false;
}
