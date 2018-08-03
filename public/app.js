var app = function(){
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
  articles.forEach(function(article, index){

    const articleImage = document.createElement('img');
    if (articleImage.src === null){
      articleImage.src = './ENewslogo.jpeg'
  } else {
    articleImage.src = article.urlToImage
  }

const articleUrl = document.createElement('a')
articleUrl.href =  article.url;
articleUrl.textContent = 'see more';
// ^use a for a href link

const articleTitle = document.createElement('h1');
articleTitle.innerText = article.title;


const articleName = document.createElement('p');
articleName.innerText = article.source.name;


const articleAuthor = document.createElement('p');
articleAuthor.innerText = article.author;


const articleDescription = document.createElement('p');
const description = _.unescape(article.description)
// ^use lodash to deal with unnecessary html

articleDescription.innerText = description;

// const articleDate = document.createElement('p');
// articleDate.innerText = article.publishedAt;

div.appendChild(articleImage);
div.appendChild(articleUrl);
div.appendChild(articleTitle);
div.appendChild(articleName);
div.appendChild(articleAuthor);
div.appendChild(articleDescription);
// div.appendChild(articleDate);
})

}

// const populateSelect = function(articles) {
//   const select = document.getElementById('article-select')
//   articles.forEach(function(article, index) {
//     let option = document.createElement('option')
//     option.innerText = article.source.name
//     option.value = index
//     select.appendChild(option)
//
//   })
// }
//
// const getArticle = function (countries) {
//   const selectedArticle = document.querySelector('select')
//   selectedArticle.addEventListener('change', function() {
//     let article = articles[this.value]
//     saveArticle(article)
//     // countryDetails(country)
//   })
// }
//
// const saveArticle = function(article){
//   const jsonString = JSON.stringify(article);
//   localStorage.setItem('Article Source', jsonString);
// }
//
//
// const requestComplete = function(){
//   if(this.status != 200) return;
//   const jsonString = this.responseText;
//   const articles = JSON.parse(jsonString);
//   populateList(articles.articles);
//   // ^because articles array is nested within an object
// }



    window.addEventListener('load', app);

// urlImage
// url
// name
// title
// author
// description
// publishedAt
