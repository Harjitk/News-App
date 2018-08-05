const app = function(){
  const url = 'https://newsapi.org/v2/top-headlines?country=gb&category=entertainment&apiKey=c94ead78503f432ab71fee4684f11855';

  makeRequest(url, requestComplete);

}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

const populateList = function(articles){

  const div = document.getElementById('article-list');

  const selectList = document.createElement("select");
  selectList.setAttribute("id", "mySelect");


  articles.forEach(function(article, index){

    const articleImage = document.createElement('img');
    if (articleImage.src === null){
      articleImage.src = './ENewslogo.jpeg'
  } else {
    articleImage.src = article.urlToImage
  }


const articleUrl = document.createElement('a')
articleUrl.href =  article.url;
articleUrl.textContent = '     see more';
// ^use a for a href link

const articleTitle = document.createElement('h2');
articleTitle.innerText = article.title;


const articleName = document.createElement('p');
articleName.innerText = article.source.name;


const articleAuthor = document.createElement('p');
articleAuthor.innerText = article.author;


const articleDescription = document.createElement('p');
const description = _.unescape(article.description);

// ^use lodash to deal with unnecessary html

articleDescription.innerText = description;

// const articleDate = document.createElement('p');
// articleDate.innerText = article.publishedAt;

myDiv.appendChild(selectList);
const option = document.createElement("option");
option.setAttribute("value", article.source.id);
option.text = article.source.id;
selectList.appendChild(option);



div.appendChild(articleImage);
div.appendChild(articleUrl);
div.appendChild(articleTitle);
div.appendChild(articleName);
div.appendChild(articleAuthor);
div.appendChild(articleDescription);
// div.appendChild(articleDate);
})

}

//*** Populate DropDown in order to select articles based on
// 'name'property from API ***



// function sayHello(){
//   alert('I am working ')
//   const articleSelect = document.getElementById('article-select');
//   // alert(object.toSource(articleSelect));
// }

const populateSelector = function(articles){
  const articleSelect = document.getElementById('article-select');

  for(const i = 0; i < articles.length; i++){
    const article = articles[i];
    const option = document.createElement('option');
    option.innerText = article.name;
    option.value = i;
    articleSelect.appendChild(option)
  }
  articleSelect.addEventListener('change', function(){
    const selectedName = articles[this.value];
    const articleName = document.getElementById('article-list');
    articleName.innerText = selectedName.source.name;

  })
}
// //



const requestComplete = function(){
  if(this.status != 200) return;
  const jsonString = this.responseText;
  const articles = JSON.parse(jsonString);
  populateList(articles.articles);
  // ^because articles array is nested within an object
}



window.addEventListener('load', app);
