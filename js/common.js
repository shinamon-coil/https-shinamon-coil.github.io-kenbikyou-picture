function getQuery() {
  let searchQuery = document.location.search;

  searchQuery = decodeURIComponent(searchQuery.replace('?q=', '').replace(/%22/g, ''));
  return {
    searchQuery: searchQuery
  }
}

function searchFullText(keyword, json) {

  let matchArticleId = [];

  for (let item of json) {
    if (item.abstract.indexOf(keyword) !== -1) {
      matchArticleId.push(item.id);
    }
  }
  return json;
}
