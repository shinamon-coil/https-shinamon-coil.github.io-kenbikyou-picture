new Vue({
  el: "#app",
  data: {
    articles: get_article_data(),
  },
  methods: {
  },
  computed: {
  },

})

function get_article_data() {
  let articles_data = [];
  $.ajax({
    type: 'GET',
    url: './data/organ-data.json',
    dataType: 'json'
  })
    .then(
      function (json) {
        for (let i = 0; (i < json.length) && (i < 5); i++) {
          articles_data.push({
            good: json[i].good,
            id: json[i].id,
            environment: json[i].environment,
            address: json[i].address,
            update_date: json[i].update_date,
            posted_date: json[i].posted_date,
            user_name: json[i].user_name,
            title: json[i].title,
            pictures: json[i].pictures.slice(0, 4),
            url: "./text.html?=" + json[i].id,
          });
        }

        let i = 0;
        for (article in articles_data) {
          articles_data[i].update_date = article.update_date < 0 ? "--" : article.update_date
          i++;
        }

        articles_data.sort((a, b) => (a.id < b.id ? -1 : 1))


      }
    );
  return articles_data
}
