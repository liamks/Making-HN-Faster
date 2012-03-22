jsdom   = require('jsdom')
fs      = require('fs')
jquery  = fs.readFileSync("./jquery-1.7.1.min.js").toString()
rawFrontPage = fs.readFileSync('./HackerNews.html').toString()



jsdom.env({
  html: rawFrontPage,
  src: [jquery],
  done: function (errors, window){
    $ = window.$

    var rows = $($('table table')[1]).find('tr');

    var stories = []
    var story = {}
    var c = 0

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i]

      if(c == 0){
        var info = $(row).find('.title').last()
        story.title = info.find('a').text()
        story.href = info.find('a').attr('href')
        story.domain = info.find('.comhead').text().replace(/[ \(\)]/g,'')
      }else if (c == 1){
        var info = $(row).find('.subtext')
        var links = info.find('a')
        var ago = info.text().match(/(\d+ \w+) ago/)
        if(ago){
 
          story.ago = ago[1]
        }
        story.user = links.first().text()
        var flag = $(links[1]).attr('href')
        story.flag =  flag ? flag.split("=")[1] : ''
        var score = info.find('span').text()
        story.score = score ? score.replace(/[^0-9]/g,'') : ''

        var commentText = links.last().text()
        story.commentText = commentText ? commentText.match(/\d+/)[0] : ''
        var commentLink = links.last().attr('href')
        story.id = commentLink ? commentLink.split("=")[1] : ''

        if(story.title !== ''){

          stories.push(story)
        }
        
        story = {}
      }

      c++;
      if(c == 3){
        c = 0;
      }
    };

    console.log(JSON.stringify(stories))

  }
})


