readJson()

function readJson() {
  $.ajax({
    type: 'GET',
    url: './data/organ-data.json',
    dataType: 'json'
  })
    .then(


      function showApp(json) {
        const rootComponent = {
          el: "#app",
          data: {
            searchKeyWord: getQuery()["searchQuery"],
          }
        }
        new Vue(rootComponent);
      }
    );
}
