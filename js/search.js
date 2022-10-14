Show()

function Show() {
  $.ajax({
    type: 'GET',
    url: './data/organ-data.json',
    dataType: 'json'
  })
    .then(
      function (json) {
        const rootComponent = {
          data() {
            return { searchKeyWord: getQuery()["searchQuery"] }
          },
          methods() {
          },
          computed() {
          }
        }
        const app = Vue.createApp(rootComponent);
        const vm = app.mount('#app');
      }
    );
}
