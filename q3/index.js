const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'salt for cookie signing',
}));
app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, "css")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

const products = [
	{
		name: "Rose",
		price: "19",
		description: "With more than 100 species, the Rose is most commonly categorized for its trailing stems with sharp prickles.",
		id: "0",
		quantity: "15",
	},
	{
		name: "Lily",
		price: "18",
		description: "The Lily is know for its large, prominent flowers and long filaments. These fragrant flowers come in a range of colors including white, yellow, orange, pink, red and purple and some include markings such as spots or brush strokes",
		id: "1",
		quantity: "10",
	},
	{
		name: "Tulip",
		price: "17",
		description: "The Tulip is known for its bright, bulbous flowers and elegant stems.",
		id: "2",
		quantity: "8",
	},
	{
		name: "Orchid",
		price: "16",
		description: "As one of the top two largest flower plant families, the Orchid consists of about 27,800 accepted species. The most common genus, Phalaenopsis, is what is typically seen in home gardens and containers.",
		id: "3",
		quantity: "9",
	},
	{
		name: "Carnation",
		price: "15",
		description: "The bright cluster of petals make the Carnation a playful choice for any garden or bouquet. Depending on the color you pick, a Carnation can be used as a symbol of friendship, love or fascination.",
		id: "4",
		quantity: "5",
	},
	{
		name: "Hyacinth",
		price: "14",
		description: "This popular bulb plant produces bulbous-like flowers in vibrant shades of blue, indigo and violet. An easy to grow plant, Hyacinths can be grown for for a variety of uses, such as outdoor containers, rock gardens or indoors.",
		id: "5",
		quantity: "11",
	},
	{
		name: "Chrysanthemum",
		price: "11",
		description: "The name Chrysanthemum comes from the Greek words for gold and flower, but come in a variety of colors besides yellow.",
		id: "6",
		quantity: "12",
	},
];

//const cartProducts = [];

app.get("/", (req, res, next) => {
	res.render("product.ejs", { products: products });
});

app.get("/shoppingCart", (req, res, next) => {
	res.render("shoppingcart.ejs", {
		products: req.session.cart ? req.session.cart : [],
	});
});

app.post("/addtoCart", (req, res, next) => {
	
	if(req.session.cart === undefined) {
		req.session.cart = [
			{
				name: req.body.name,
				price: req.body.price,
				id: req.body.id,
				quantity: 1,
				totalprice: 0,
			},
		];
	}
	else {
		var idx = -1;
		var element = req.session.cart.find((item) => item.id.toString() === req.body.id)
		
		idx = req.session.cart.findIndex((obj => obj.id == req.body.id));
			
		if(element === undefined) {		
			req.session.cart.push({
				name: req.body.name,
				price: req.body.price,
				id: req.body.id,
				quantity: 1,
				totalprice: req.body.price,
			});
		}
		else {
			req.session.cart[idx].quantity += 1;
			req.session.cart[idx].totalprice = Number(req.session.cart[idx].totalprice) + Number(element.price);;
		}
	}
	
	res.redirect(303, "/shoppingCart");
});

app.listen(3000);