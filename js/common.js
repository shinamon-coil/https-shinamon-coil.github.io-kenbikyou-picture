function getQuery() {
  let searchQuery = document.location.search;

  searchQuery = decodeURIComponent(searchQuery.replace('?q=', '').replace(/%22/g, ''));
  return {
    searchQuery: searchQuery
  }
}

function isEnterKey(e) {
  if (e.keyCode === 13) {
    return true;
  }
  return false;
}
function inputChange(e) {
  if (isEnterKey(e)) {
    let nextUrl = produceUrlWithKeyWord(searchWord.value);
    goToSearchPage(nextUrl);
  }
}
function goToSearchPage(url) {
  document.location.assign(url)
}

function produceUrlWithKeyWord(keyWord) {
  let url = './search.html?q="' + keyWord + '"';
  return url;
}

function getPicturePathFromMarkdown(markdown) {
  let pictures_data = []
  let picture_path = null;
  for (line of markdown) {
    if (line[0] == "!") {
      picture_path = String(line.match(/\(.*?\)/)).replace(/\(/g, '').replace(/\)/g, '');

      const picture_data = { "picture_path": picture_path }
      pictures_data.push(picture_data)
    }
  }
  console.log(pictures_data);
  return pictures_data
}

function searchFullText(keyword, json) {
  let matchArticle = {
    id: [],
    matchText: []
  };

  for (let i = 0; i < json.length; i++) {
    isKeywordInAbstract = (json[i].markdown.indexOf(keyword) !== -1) ? true : false;

    if (isKeywordInAbstract) {
      matchArticle.id.push(json[i].id);
    }
  }
  return matchArticle;
}

function getTitle(markdown) {
  for (line of markdown) {
    if (line.slice(0, 2) === "# ") {
      const title = line.slice(2)
      return title
    }
  }
}

function getSubTitles(markdown) {
  let sub_titles = []
  for (line of markdown) {
    if (line.slice(0, 2) === "##") {
      sub_titles.push(line.slice(3));
    }
  }
  return sub_titles;
}

function isSafeUrlScheme(url) {
  /*if (url.match(/^(http|https):/) === null) {
    return false;
  } else {
    return true;
  }*/
  return false;
}

function escapeHtml(string) {
  string = string.replace(/&/g, '&amp;');
  string = string.replace(/</g, '&lt;');
  string = string.replace(/>/g, '&gt;');
  string = string.replace(/"/g, '&quot;');
  string = string.replace(/'/g, '&#39;');
  return string;
}

function changeToSafeString(lines) {
  let safe_lines = [];
  for (let line of lines) {
    if (isSafeUrlScheme(line)) {
      return null;
    }
    safe_lines.push(escapeHtml(line));
  }
  return safe_lines;
}

function purseAnnotation(line) {
  let pursed = line.replace(/\[\^(\d)\]\:/g, '<small id="anonination-$1">$1.<a href="#anonination-before-$1">^</a></small>');
  if (pursed === line) {
    pursed = line.replace(/\[\^(\d)\]/g, '<a href="#anonination-$1"><small id="anonination-before-$1">($1)</small></a>');
  }
  return pursed;
}

function purseImage(line) {
  alt = line.match(/\[.*?\]/)[0].replace("[", "").replace("]", "");
  src = line.match(/\(.*?\)/)[0].replace("(", "").replace(")", "");
  html = '<div><img src="' + src + '" alt="' + alt + '">' + '<p>' + alt + '</p></div>';
  return html;
}

function purseTitle(line) {
  const title = line.replace(/#/g, "").replace(/\s/g, "");
  let sharpe_counter = 0
  for (; line[sharpe_counter] === "#" && sharpe_counter < line.length; sharpe_counter++);
  let tag = String(sharpe_counter);

  const html = "<h" + tag + ' id="' + title + '"' + ">" + title + "</h" + tag + ">"
  console.log(html);
  return html;
}


function purseList(line, is_li_tag_before) {
  const content = line.replace("-", "");
  html = '<li class="article-list">' + content + "</li>";
  return html;
}

//TODO ??????????????????????????????
function purseTable(line) {

}

//TODO ????????????????????????????????????
function purseURL(line) {
  return line.replace(/(http(s)?:\/([\w-]+\.)+[\w-]+(\[\w-.\?%&=]*)?)/g, '<a href="$1">link</a>');
}

function purseMaekdown(markdown, main_element) {
  let pursed_lines = "";
  const safe_lines = changeToSafeString(markdown);

  if (safe_lines === null) {
    console.log("include unsafe url!");
    return false;
  }

  let is_li_tag_berfore = false;
  let is_img_tag_berfore = false;


  for (let line of safe_lines) {
    line = purseAnnotation(line);
    line = purseURL(line);

    if (is_li_tag_berfore && line[0] !== "-") {
      pursed_lines += "</ul>"
      is_li_tag_berfore = false;
    }
    if (is_img_tag_berfore && line[0] !== "!") {
      pursed_lines += "</div>"
      is_img_tag_berfore = false;
    }

    switch (line[0]) {
      case "!":
        if (!is_img_tag_berfore) {
          pursed_lines += '<div class="garary">';
        }
        pursed_lines += purseImage(line);
        is_img_tag_berfore = true;
        break;
      case "-":
        if (!is_li_tag_berfore) {
          pursed_lines += "<ul>"
        }
        pursed_lines += purseList(line);
        is_li_tag_berfore = true;
        break;
      case "|":
        pursed_lines += purseTable(line);
        break;
      case "#":
        pursed_lines += purseTitle(line);
        break;
      default:
        pursed_lines += ("<p>" + line + "</p>");
        break;
    }
  }
  console.log(pursed_lines);
  main_element.innerHTML = pursed_lines;
}
