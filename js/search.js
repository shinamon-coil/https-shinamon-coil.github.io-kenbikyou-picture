let searchWord = document.getElementById("search");
searchWord.addEventListener('keypress', inputChange);
console.log(searchWord.value);

function inputChange(e) {
  if (isEnterKey(e)) {
    let nextUrl = produceUrlWithKeyWord(searchWord.value);
    goToSearchPage(nextUrl);
  }
}

function goToSearchPage(url) {
  document.location.assign(url)
}

function produceUrlWithKeyWord(keyWord) {
  let url = './search.html?q="' + keyWord + '"';
  return url;
}

function isEnterKey(e) {
  if (e.keyCode === 13) {
    return true;
  }
  return false;
}
