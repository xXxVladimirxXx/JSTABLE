(window.onload) = function() {

    var showModal = document.getElementById("showModal")

    // При нажатии кнопки добавить новый пост
    document.getElementById("create").onclick = function() {
      showModal.className += ` active`;
    };

    // При нажатии кнопки назад в popup window
    document.getElementById("close").onclick = function() {
      showModal.className -= " active";
    };
    
    // При нажатии кнопки опубликовать
    document.getElementById("success").onclick = function() {
        // Получаем значения из форм
        var title = document.getElementById("title").value;
        var author = document.getElementById("author").value;
        var content = document.getElementById("content").value;
        //localStorage.clear();

        if((title && author && content) != "") {
          // Узнаём дату
          var currentDate = new Date()
          var day = currentDate.getDate()
          var month = currentDate.getMonth() + 1
            if (month < 10 ) {
              month = "0" + month
            } 
          var year = currentDate.getFullYear()
          var date = (day + "." + month + "." + year)

          var posts = []; //Пустой массив

          var getLocal = JSON.parse(localStorage.getItem('posts'));
          
          if (getLocal != undefined && getLocal != null && getLocal != '') { // Количество элементов в массиве

            var i = 0
            while (i < getLocal.length) {

              var post = getLocal[i];
              id = post["id"] + 1
              i++;

            }

          } else {

            var id = 1

          }

          var post = {
              "id": id,
              "title": title,
              "content": content,
              "author": author,
              "date": date
          }
          
          var localPosts = JSON.parse(localStorage.getItem('posts'));
            
            if (localPosts != null) {   
              localPosts.push(post)
              var posts = localPosts
            } else {
              posts.push(post)
            }
            
            localStorage.setItem('posts', JSON.stringify(posts));

            addPosts()

        } else {

          console.log("Not found")
        }
    }

    // Как только создался новый пост, добавляем его в таблицу
    function addPosts() {
      
      var allposts = JSON.parse(localStorage.getItem('posts'));
      var postLast = allposts[allposts.length - 1];
      
      document.getElementById("table").innerHTML += 
      `<tbody>
        <tr>
          <td>` + postLast["id"] + `</td>
          <td>` + postLast["title"] + `</td>
          <td>` + postLast["content"] + `</td>
          <td>` + postLast["author"] + `</td>
          <td>` + postLast["date"] + `</td>
          <td><a class="fa fa-times" id="deleteId` + postLast["id"] + `"></a></td>
        </tr>
      </tbody>`
      document.getElementById("result").innerHTML =  postLast["title"] + ` успешно добавлен!`
    }

    function allPosts() {

      document.getElementById('table').innerHTML = '';

      document.getElementById("table").innerHTML += 
      `<tbody>
        <tr>
          <td style="width: 2%;">ID</td>
          <td style="width: 18%;">Заголовок</td>
          <td style="width: 40%;">Содержание</td>
          <td style="width: 20%;">Автор</td>
          <td style="width: 18%;">Дата</td>
          <td style="width: 2%;">Удалить</td>
        </tr>
      </tbody>`

      var posts = JSON.parse(localStorage.getItem('posts'));
      
      // Если есть localStorage в таблице будут посты 
      if (posts != undefined && posts != null) {
        
          var i = 0;
          while (i < posts.length) {
          var post = posts[i];

            document.getElementById("table").innerHTML +=
            `<tbody>
                <tr>
                  <td>` + post["id"] + `</td>
                  <td>` + post["title"] + `</td>
                  <td>` + post["content"] + `</td>
                  <td>` + post["author"] + `</td>
                  <td>` + post["date"] + `</td>
                  <td><a class="fa fa-times" id="deleteId` + post["id"] + `"></a></td>
                </tr>
            </tbody>`
          i++;
        }
      }
    }
    
    allPosts()

    // Удаление записей из localstorage 
    document.querySelector('#table').onclick = function(e){

      var id = e.target.id; // Получили ID, т.к. в e.target содержится элемент по которому кликнули
      if (id != '' && id != 'table') {

        id = id.substring(8);

        var posts = JSON.parse(localStorage.getItem('posts'));

        var i = 0
        var count = 0

        lengthPosts = posts.length

        while (i < lengthPosts) {
          var post = posts[i];

          if (post["id"] == id) {
            // Завершаем цикл 
            i = lengthPosts

            posts.splice(count, 1);

            // Перезаписываем localstorage
            localStorage.setItem('posts', JSON.stringify(posts));

            // Обновляем таблицу
            allPosts()
          }
          count++;
          i++;
        }
      }
    }
}
