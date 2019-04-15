
/*

var Product = require('../models/product');

var mongoose =  require('mongoose');

//mongoose.connect('localhost:27017/shopping');
//mongoose.connect('mongodb://localhost:27017/shopping');
//mongoose.connect('mongodb://localhost:27017/shopping');
//mongoose.connect("mongodb://localhost:27017/shopping2", { useNewUrlParser: true });
var products =
[
  new Product({

    imagePath: 'images/game1.jpeg',
    title:'Star wars',
    description: 'Future here!!!',
    price: 30
}),

new Product({

  imagePath: 'images/maxpayne.jpg',
  title:'Max Payne',
  description: 'Max Payne is a third-person shooter video game series developed by Remedy Entertainment and Rockstar Studios. The series is named after its protagonist, Max Payne, a New York City police detective turned vigilante after his family had been murdered by drug dealers.',
  price: 30
}),

new Product({

  imagePath: 'images/medal.jpg',
  title:'Medal of Honor',
  description: 'Medal of Honor is a 1999 first-person shooter video game, developed by DreamWorks Interactive and published by Electronic Arts for PlayStation. It is the first installment in the Medal of Honor video game series. The story was created by film director and producer Steven Spielberg.',
  price: 30
}),

new Product({

  imagePath: 'images/spider.jpg',
  title:'Spider Man',
  description: 'Marvels Spider-Man is a 2018 action-adventure game that was developed by Insomniac Games and published by Sony Interactive Entertainment. Based on the Marvel Comics superhero Spider-Man, it is inspired by the long-running comic book mythology and adaptations in other media.',
  price: 30
}),

new Product({

  imagePath: 'images/formula1.jpeg',
  title:'Formula 1',
  description: 'F1 2018 is a racing video game and the tenth instalment in the Formula One video game franchise developed and published by Codemasters. The game is based on the 2018 Formula One World Championship and includes all twenty-one circuits from the calendar and all twenty drivers and ten teams competing in the season',
  price: 30
})

];
// this function allow to save in the database mongo
var done = 0;

for (var i=0; i< products.length; i++){
  products[i].save(function(err, result){
    done++;
    if(done === products.length){
      exit;
    }
  });
}

function exit(){
  mongoose.disconnect();
}
//mongoose.disconnect();
*/
