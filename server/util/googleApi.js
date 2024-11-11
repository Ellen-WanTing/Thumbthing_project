var schedule = require('node-schedule');
var bookModel = require('../models/book');
var errorFactory = require('../util/errorFactory');
var request = require('request');

module.exports={
  getDataBySchedule:function() {
    var j = schedule.scheduleJob('0 4 15 * *', function(fireDate){
      // we will get 40 book for each of these categories
      var category = ["Mystery", "Fantasy", "Horror", "Romance", "Fiction",
        "Thriller", "Science", "History", "Literature", "Cooking", "Comics", "Business", "Art"];
      for (var item of category) {
        googleRequest(item);
      }
    });
  },
  getDataDirect:function() {
    var category = ["Mystery", "Fantasy", "Horror", "Romance", "Fiction",
      "Thriller", "Science", "History", "Literature", "Cooking", "Comics", "Business", "Art"];
    for (var item of category) {
      googleRequest(item);
    }
  }
}

function googleRequest(category) {
  var query = "";
  request.get("https://www.googleapis.com/books/v1/volumes?q=" + query
    + "+subject:" + category + "&maxResults=40", (error, response, body) => {
      if (error) {
        console.log(error);
        return;
      }
      if (JSON.parse(body).items != null) {
        for (var item of JSON.parse(body).items) {
          try {
            var publisher = "Unknown";
            var author = "Unknown";
            if (item.volumeInfo.publisher) {
              publisher = item.volumeInfo.publisher;
            }
            if (item.volumeInfo.authors) {
              author = item.volumeInfo.authors[0];
            }
            if (publisher && author) {
              const inputData = [category, author, item.volumeInfo.title,
              item.volumeInfo.publishedDate, 2.5, item.volumeInfo.language,
              item.volumeInfo.imageLinks.thumbnail, publisher];
              addToDB(inputData);
            }
            else {
              console.log("Can't find required data " + item.volumeInfo.publisher + " " + item.volumeInfo.authors[0]);
            }
          } catch (e) {
            console.log("error in parsing the api response: " + e);
          } finally {

          }
        }
    }
  });
}

function addToDB(inputData) {
  bookModel.bookAddByName(inputData, function(err, data){
    if (err) {
      //console.log(err);
      addToDB(inputData);
    }
  });
}
