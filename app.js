new Vue({
  el: "#app",
  data: {
    articles: get_article_data(),
    main_image_src: "./data/pictures/000000000001.jpg"
  },
  methods: {
  },
  computed: {
  },

})

function get_article_data() {
  var articles_data = [];
  $.ajax({
    tyoe: 'GET',
    url: './data/organ-data.json',
    dataType: 'json'
  })
    .then(
      function (json) {
        for (var i = 0; (i < json.length) && (i < 5); i++) {
          articles_data.push({
            good: json[i].good,
            id: json[i].id,
            japanese_name: json[i].japanese_name,
            update_date: json[i].update_date,
            posted_date: json[i].posted_date,
            user_name: json[i].user_name,
            title: json[i].title,
          });
        }
        articles_data.sort((a, b) => (a.id < b.id ? -1 : 1))
        console.log(articles_data);

      }
    );
  return articles_data
}
