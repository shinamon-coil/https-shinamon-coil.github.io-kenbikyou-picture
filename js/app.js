ShowPage()

function ShowPage() {
  $.ajax({
    type: 'GET',
    url: './data/organ-data.json',
    dataType: 'json'
  })
    .then(
      function (json) {
        let articles_data = [];
        //TODO 以下のjson読み込み部をcommon.jsに統合。
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
            microscope_pictures: json[i].microscope_pictures,
            url: "./text.html?=" + json[i].id,
            picture_data: getPicturePathFromMarkdown(json[i].markdown.split("\n"))
          });

        }

        let i = 0;
        for (let article in articles_data) {
          articles_data[i].update_date = article.update_date < 0 ? "--" : article.update_date
          i++;
        }

        articles_data.sort((a, b) => (a.id < b.id ? -1 : 1))

        new Vue({/*TODO 警告の原因を突き止める。 */
          el: "#app",
          data: {
            articles: articles_data
          },
          methods: {
          },
          computed: {
          },

        })
      }
    );
}
