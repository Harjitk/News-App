var app = function() {
    const url =
        "https://newsapi.org/v2/top-headlines?country=gb&category=entertainment&apiKey=c94ead78503f432ab71fee4684f11855";

    makeRequest(url, requestComplete);
};

const makeRequest = function(url, callback) {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", callback);
    request.send();
};

// populateList  strts here
const populateList = function(articles) {
    const div = document.getElementById("article-list");

    var unique_array = [];

    articles.forEach(function(article, index) {

        console.log(unique_array);


//this pushes the article name to the unique array if it is not already there
//eliminating duplicates
        if (unique_array.indexOf(article.source.name) == -1) {
            unique_array.push(article.source.name);
        }

        const articleImage = document.createElement("img");
        if (articleImage.src === null) {
            articleImage.src = "./ENewslogo.jpeg";
        } else {
            articleImage.src = article.urlToImage;
        }

        const articleUrl = document.createElement("a");
        articleUrl.href = article.url;
        articleUrl.textContent = "see more";
        // ^use a for a href link

        const articleTitle = document.createElement("h2");
        articleTitle.innerText = article.title;

        const articleName = document.createElement("p");
        articleName.innerText = article.source.name;

        const articleAuthor = document.createElement("p");
        articleAuthor.innerText = article.author;

        const articleDescription = document.createElement("p");
        const description = _.unescape(article.description);
        // ^use lodash to deal with unnecessary html
        articleDescription.innerText = description;

        div.appendChild(articleImage);
        div.appendChild(articleTitle);
        div.appendChild(articleName);
        div.appendChild(articleAuthor);
        div.appendChild(articleDescription);
        div.appendChild(articleUrl);
    });

    var selectList = document.createElement("select");
    selectList.setAttribute("id", "mySelect");
    myDiv.appendChild(selectList);
    for (var i = 0; i < unique_array.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", unique_array[i]);
        option.text = unique_array[i];
        selectList.appendChild(option);
    }

    selectList.addEventListener("change", populateSelect);
};

// *** Populate DropDown in order to select articles based on
// 'name'property from API ***

const populateSelect = function() {

  var e = document.getElementById("mySelect");
  var opVal = e.options[e.selectedIndex].value;
  console.log(opVal);



  //
  // const newArray = [articleImage, articleUrl, articleTitle, articleName, articleAuthor, articleDescription];

  // const new = fruits.indexOf("Apple");
  // const result = articleName.filter(articleName => articleName.length > 6);
  //
  // console.log(result);




};




const requestComplete = function() {
    if (this.status != 200) return;
    const jsonString = this.responseText;
    const articles = JSON.parse(jsonString);
    populateList(articles.articles);
    // ^because articles array is nested within an object
};

window.addEventListener("load", app);
