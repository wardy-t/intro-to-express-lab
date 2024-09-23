const express = require('express');

const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

//1.
app.get('/greetings/:name', (req, res) => {
    res.send(`Hello ${req.params.name}, don't you look handsome today!`);
})

//2.
app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number);
    
    if (isNaN(number) || number <= 0) {
    res.send("Please enter a valid number");
    } else { 
        const diceRoll = Math.floor(Math.random() * req.params.number) +1;
        res.send(`You rolled a ${diceRoll}!`);
    }
});

//3.
app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
    
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
    res.send("This item is not yet in stock. Check back soon!");
    } else { 
        const item = collectibles[index];
        res.send(`So you would like the ${item.name}? For £${item.price} it can be yours!`);
    }
});

//4.
app.get('/shoes', (req, res) => {
    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;
    let searchShoes = shoes;

    if (minPrice) {
        searchShoes = searchShoes.filter(shoe => shoe.price >= Number(minPrice));
    } if (maxPrice) {
        searchShoes = searchShoes.filter(shoe => shoe.price <= Number(maxPrice));
    } if (type) {
        searchShoes = searchShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
    }

    res.json(searchShoes);
});

app.get('/', (req, res) => {
    res.send('<h1>Hello SEB!</h1>');
});

app.listen(3000, () => {
    console.log('express is listening on port 3000')
})