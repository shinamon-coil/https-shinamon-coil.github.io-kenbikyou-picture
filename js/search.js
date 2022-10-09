Show()

function Show() {
  $.ajax({
    type: 'GET',
    url: './data/organ-data.json',
    dataType: 'json'
  })
    .then(
      function (json) {
        const query = getQuery();

        app = new Vue({
          el: "#app",
          data() {
            return { searchKeyWord: query.searchQuery }
          },
          methods: {
          },
          computed: {
          }

        })
      }
    );
}
