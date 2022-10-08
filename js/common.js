function getQuery() {
  let searchQuery = document.location.search;

  searchQuery = searchQuery.replace('?q=', '').replace(/%22/g, '');
  return {
    searchQuery: searchQuery
  }
}

function isTrueData() {

}
