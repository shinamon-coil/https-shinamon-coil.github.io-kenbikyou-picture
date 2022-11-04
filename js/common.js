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
    for (let abstract of item.abstract) {
      if (keyword in abstract) {
        matchArticleId.push(item.id);
      }
    }
  }
  return json;
}
