ShowText()

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
        console.log(textData);

        new Vue({
          el: "#text",
          data: {
            textData: textData[0],
          },
          methods: {

          },
          computed: {
          },

        })
      }
    );
}

function PushTextData(json, textId) {
  let textData = []
  textData.push({
    good: json[textId].good,
    id: json[textId].id,
    organisms_data: json[textId].organisms_data,
    environment: json[textId].environment,
    address: json[textId].address,
    update_date: json[textId].update_date,
    posted_date: json[textId].posted_date,
    user_name: json[textId].user_name,
    title: json[textId].title,
    url: "./text.html?=" + json[textId].id,
    microscope_pictures: json[textId].microscope_pictures,
    abstract: json[textId].abstract,
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
