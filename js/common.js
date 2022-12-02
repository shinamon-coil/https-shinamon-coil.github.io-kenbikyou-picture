function getQuery() {
  let searchQuery = document.location.search;

  searchQuery = decodeURIComponent(searchQuery.replace('?q=', '').replace(/%22/g, ''));
  return {
    searchQuery: searchQuery
  }
}

function searchFullText(keyword, json) {

  let matchArticle = {
    id: [],
    matchText: []
  };

  for (let i = 0; i < json.length; i++) {
    isKeywordInAbstract = (json[i].abstract.indexOf(keyword) !== -1) ? true : false;
    isKeywordInTitle = (json[i].title.indexOf(keyword) !== -1) ? true : false;

    if (isKeywordInAbstract || isKeywordInTitle) {
      matchArticle.id.push(json[i].id);
    }
  }
  return matchArticle;
}
