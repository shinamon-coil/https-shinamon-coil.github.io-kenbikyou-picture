ShowText();

function ShowText() {
  $.ajax({
    type: 'GET',
    url: './data/organ-data.json',
    dataType: 'json'
  })
    .then(
      function (json) {
        let textData = null;
        const textId = GetTextId(json);
        textData = PushTextData(json, textId);

        new Vue({
          el: "#text",
          data: {
            textData: textData[0],
            selected: "",
            language: "English",
            about_site: { "日本語": "日々行っている生物関連の個人開発、簡易実験などを公開しています。良ければ参考にしてください。もちろん生物以外の記事もあります。", "English": "Welcome to my personal web site! I talk about personal developments,simple experiments about organisms,organisms photos,and so on." },
            logo: { "日本語": "生物好きによる日々の小話集", "English": "biology lover life" },
            search: { "日本語": "検索", "English": "Search" },
          },
          methods: {
            getReferenceText: function (referenceId) {
              if (referenceId != null) {
                return "(" + referenceId + ")";
              }
              return null
            },
            getReferenceList: function (referenceId) {
              if (referenceId != null) {
                const referenceData = this.textData.references[referenceId];
                if (referenceData.referenceId == referenceId) {
                  return referenceData.referenceId + ". " + referenceData.annotation;
                } else {
                  console.log("error:Not match referenceId.");
                }
              }
              return null;
            }
          },
          computed: {
            sub_titles: function () {
              sub_titles = getSubTitles(json[textId].markdown[this.language].split("\n"));
              return sub_titles
            },
            html: function () {
              const html = purseMaekdown(json[textId].markdown[this.language].split("\n"));
              return html
            }
          }

        })
      }
    );
}

function PushTextData(json, textId) {
  let textData = []
  textData.push({
    good: json[textId].good,
    id: json[textId].id,
    organismsData: json[textId].organismsData,
    environment: json[textId].environment,
    address: json[textId].address,
    update_date: json[textId].update_date,
    posted_date: json[textId].posted_date,
    user_name: json[textId].user_name,
    title: json[textId].title,
    url: "./text.html?=" + json[textId].id,
    microscope_pictures: json[textId].microscope_pictures,
    abstract: json[textId].abstract,
    references: json[textId].references
  });
  return textData;
}

function IsTrueQuery(json, query) {
  if (/\d+/.test(query)) {
    const textId = query;
    if (textId <= json.length) {
      return textId;
    } else {
      return null;
    }
  }
}

function GetTextId(json) {
  if (window.location.search.length > 1) {
    let query = window.location.search.substring(1);

    query = query.replace("?", "");
    query = query.replace("=", "");

    const textId = IsTrueQuery(json, query);

    return textId;
  }
}
