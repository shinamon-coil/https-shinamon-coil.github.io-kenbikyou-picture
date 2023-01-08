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
            title: { "English": getTitle(json[i].markdown["English"].split("\n")), "日本語": getTitle(json[i].markdown["日本語"].split("\n")), },
            microscope_pictures: json[i].microscope_pictures,
            url: "./text.html?=" + json[i].id,
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
            articles: articles_data,
            selected: "",
            language: "English",
            about_site: { "日本語": "日々行っている生物関連の個人開発、簡易実験などを公開しています。良ければ参考にしてください。もちろん生物以外の記事もあります。", "English": "Welcome to my personal web site! I talk about my production,simple experiments about organisms,organisms photos,and so on." },
            logo: { "日本語": "生物好きによる日々の小話集", "English": "biology lover life" },
            blog: {
              "日本語": "作ってみた", "English": "Try to"
            },
            posted_date: { "日本語": "投稿日", "English": "Posted Date" },
            updated_date: { "日本語": "更新日", "English": "Updated Date" },
            search: { "日本語": "検索", "English": "Search" }
          },
          methods: {
          },
          computed: {
          },

        })
      }
    );
}
