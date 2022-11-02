readJson();

function showApp() {
  const rootComponent = {
    el: "#app",
    data: {
      searchKeyWord: getQuery()["searchQuery"]
    }
  }
  new Vue(rootComponent);
}

function readJson() {
  $.ajax({
    type: 'GET',
    url: './data/organ-data.json',
    dataType: 'json'
  })
    .then(
      showApp()
    );
}
