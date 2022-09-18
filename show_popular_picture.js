$(function () {
  var data = [];
  $.ajax({
    tyoe: 'GET',
    url: './data/organ-data.json',
    dataType: 'json'
  })
    .then(
      function (json) {
        console.log('成功')
        for (var i = 0; i < json.length; i++) {
          data.push({
            good: json[i].good,
            id: json[i].id,
          });
          console.log(data);
        }
      }

    );
});
