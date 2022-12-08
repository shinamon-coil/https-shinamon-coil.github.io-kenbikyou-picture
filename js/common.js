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

//TODO 目次の項目を自動生成する関数を作成。

//TODO パーサーをinnerHTMLを使用したものに変更。
function escapeHtml(string) {
  string = string.replace(/&/g, '&amp;');
  string = string.replace(/</g, '&lt;');
  string = string.replace(/>/g, '&gt;');
  string = string.replace(/"/g, '&quot;');
  string = string.replace(/'/g, '&#39;');
  return string;
}

function checkURLScheme(url) {
  if (url.match(/^(http|https):/) === 0) {
    return false;
  } else {
    return true;
  }
}

function getTitleTag(titleNumber) {
  return "h" + String(titleNumber);
}

function purseTitle(lines, line_index, main_element, title_tag_number) {
  const title = lines[line_index].replace(/#/g, "").replace(/\s/g, "");
  let new_title = document.createElement(getTitleTag(title_tag_number));
  new_title.innerHTML = purseAnnotation(title);
  main_element.appendChild(new_title);
}

function getListHtml(listText) {
  return "<li>" + listText + "</li>";
}

function purseList(lines, line_index, main_element) {

  let new_ul = document.createElement("ul");
  main_element.appendChild(new_ul);
  for (let list_counter = 0; list_counter < lines.length; list_counter++) {
    index = line_index + list_counter;
    if (lines[index][0] + lines[index][1] === "- ") {
      const list_text = lines[index].replace(/-\s/g, "");
      new_li = document.createElement("li");
      new_li.innerHTML = purseAnnotation(list_text);
      console.log(list_text);
      new_ul.appendChild(new_li);
    } else {
      break;
    }
  }
  return index - 1;
}

function purseURL(line) {
  return line.replace(/(http(s)?:\/([\w-]+\.)+[\w-]+(\[\w-.\?%&=]*)?)/g, '<p href="$1">link</p>');
}

function purseAnnotation(line) {
  line = escapeHtml(line);
  pursed = line.replace(/\[\^(\d)\]\:/g, '<small id="anonination-$1">$1.</small>');
  if (pursed === line) {
    pursed = line.replace(/\[\^(\d)\]/g, '<a href="#anonination-$1"><small>($1)</small></a>');
  }
  return pursed;
}

function purseImage(line, index, main_element) {
  alt = line[index].match(/\[.*?\]/)[0].replace("[", "").replace("]", "");
  console.log(alt);
  path = line[index].match(/\(.*?\)/)[0].replace("(", "").replace(")", "");
  console.log(path);
  let new_img = document.createElement('img');
  new_img.alt = alt;
  new_img.src = path;
  main_element.appendChild(new_img);
}

function purseNormalText(lines, i, main_element) {
  new_text = document.createElement("p");
  new_text.innerHTML = purseAnnotation(lines[i])
  main_element.appendChild(new_text);
}

function purseMaekdown(markdown, main_element) {
  let lines = markdown
  pursedLines = [];
  for (let i = 0; i < lines.length; i++) {

    if (lines[i][0] === "#") {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === '#' && lines[i][j + 1] === " ") {
          purseTitle(lines, i, main_element, j + 1);
        }
      }
    } else if (lines[i][0] + lines[i][1] === "- ") {
      i = purseList(lines, i, main_element)
    } else if (lines[i][0] === "!") {
      purseImage(lines, i, main_element);
    } else {
      purseNormalText(lines, i, main_element);
    }
  }
}
