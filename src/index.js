const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
	const productCategories = new Set();

	let products = [];
	let totalRegularPrice = 0;
	let totalPrice = 0;

	for (const id of ids) {
		const product = productsList.find(x => x.id === id);
		productCategories.add(product.category);

		totalRegularPrice += product.regularPrice;

		products.push(product);
	}

	const promotion = promotions[productCategories.size-1];

	for (const product of products) {
		const { promotions } = product;
		if (!promotions.find(x => x.looks.includes(promotion))) {
			totalPrice += product.regularPrice
		} else {
			totalPrice += promotions.find(x => x.looks.includes(promotion)).price;
		}
	}

	const discountValue = (totalRegularPrice-totalPrice).toFixed(2);
	const discount = ((1-totalPrice/totalRegularPrice)*100).toFixed(2)+'%';
	totalPrice = totalPrice.toFixed(2);

	products = products.map((product) => {
		return { name: product.name, category: product.category }
	});

	return {
		products,
		promotion,
		totalPrice,
		discountValue,
		discount
	};
}

module.exports = { getShoppingCart };
