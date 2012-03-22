var fs = require('fs');
var articles = require('./frontpage');
output = '';
for (var i = 0; i < articles.length; i++) {
  var a = articles[i];

  output += "<li>\n"

  if(a.score !== ''){
    
    output += "<a href='#' data-id='" + a.id + "' class='up'></a>"
  }

  output +=" <div class='title'>\n";
  output += "  <a href='" + a.href + "'>" + a.title + "</a>";
  output += "<span class='comhead'> (" + a.domain + ")</span>\n";
  output += " </div>\n";
  output += " <div class='subtext'>\n";

  if(a.score !== ''){
    output += a.score + " points by ";
    output += "<a href='user?id=" + a.user + "'>" + a.user +"</a> ";
    output += a.ago + " ago | ";
    output += "<a href='/r?fnid=" + a.flag + "'>flag</a> | ";
    output += "<a href='item?id=" + a.id + "'>" + a.commentText +" comments</a>";
  }else{
    output += a.ago + " ago";
  }

  output += " </div>\n";
  output += "</li>\n";
};

fs.writeFileSync("articles.html", output);