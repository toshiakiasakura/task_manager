# Task Manager
Construct simple task manger using NodeJS. 
The reference is,  
https://qiita.com/S_Yuuki/items/c9b49b893b5030be8915

I do not like ejs, so that I use pug instead. 

## Versions
sqlite3 : 3.32.1
nodejs : v14.14.0

# Type history 

## Sqlite 
sqlite3 kadai.db
create table kadaitable(
    id integer PRIMARY KEY AUTOINCREMENT,
    kadai text,
    risou text,
    gyappu text,
    kaiketsu text
);

## Nodejs settings. 
```
nodebrew ls-remote
nodebrew install v14.14.0
nodebrew use v14.14.0 
```

## npm package management.
```
npm i express-generator
npm i sqlite3
npm i pug
npm i -g gulp
npm i gulp
npm i gulp-pug
npm i express -g
npm i express-generator -g
```

## sample code 

activate by
```
DEBUG=task-manager:* npm start
```
This content is in the views/index.pub
```
doctype html
html
    // Bootstrap CSS
    - var boot_css = "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
    link(rel='stylesheet', href=boot_css, crossorigin="anonymous")

    head
        title 課題管理表
        link(rel='stylesheet', href='/stylesheets/style.css')

    body
        div(class="container")
            div(class="row")
                div(class="col")
                    h1 課題管理表
                div(class="col-md-12")
                    a(href="/write") 新規追加
                br
                table(class="table table-bordered")
                    thread(class="thread-dark")
                    - const array = ["NO", "課題", "理想の姿", "理想の姿とのギャップ","解決策"]
                    tr
                        each v in array
                            th(scpre="col") #{v}

                tbody
                    - for(var i = 0; i< posts.lengeth; i++)
                        tr
                            td.value = #{posts[i].id}
                            td.value = #{posts[i].kadai}
                            td.value = #{posts[i].risou}
                            td.value = #{posts[i].gyappu}
                            td.value = #{posts[i].kaiketsu}

        script(src="https://code.jquery.com/jquery-3.3.1.slim.min.js",
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo",
            crossorigin="anonymous")
        script(src= "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.bundle.min.js",
            integrity="sha384-zDnhMsjVZfS3hiP7oCBRmfjkQC4fzxVxFhBx8Hkz2aZX8gEvA/jsP3eXRCvzTofP",
            crossorigin="anonymous")

```

