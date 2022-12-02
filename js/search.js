readJson()

function readJson() {
  $.ajax({
    type: 'GET',
    url: './data/organ-data.json',
    dataType: 'json'
  })
    .then(
      function showApp(json) {
        searchKeyWord = getQuery()["searchQuery"]
        const rootComponent = {
          el: "#app",
          data: {
            searchKeyWord: searchKeyWord,
            matchArticle: searchFullText(searchKeyWord, json)
          }
        }
        new Vue(rootComponent);
      }
    );
}
