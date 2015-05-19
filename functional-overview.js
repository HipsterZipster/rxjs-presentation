/**
 * Created by hipsterzipster on 5/18/15.
 */
(function () {
	var STOCKS = [{
		symbol: "XFX",
		price: 240.22,
		volume: 23432
	}, {
		symbol: "TNZ",
		price: 332.19,
		volume: 234
	}, {
		symbol: "JXJ",
		price: 120.22,
		volume: 5323
	}];

	var EXCHANGES = [
		[
			{ symbol: "XFX", price: 240.22, volume: 23432 },
			{ symbol: "TNZ", price: 332.19, volume: 234 }
		],
		[
			{ symbol: "JXJ", price: 120.22, volume: 5323 },
			{ symbol: "NYN", price: 88.47, volume: 98275 }
		]
	];

	var list = document.getElementById("list");
	function printy(text, prefix) {
		var li = document.createElement("li");
		prefix = (prefix) ? prefix + ":  " : "";
		li.innerHTML = prefix + text;
		list.appendChild(li);
	}

	// regular for loop
	function getStocksFor(stocks) {
		var symbols = [], ctr, stock;
		for (ctr = 0; ctr < stocks.length; ctr++) {
			stock = stocks[ctr];
			symbols.push(stock.symbol);
		}
		return symbols;
	}

	printy(JSON.stringify(getStocksFor(STOCKS)), 'for');

	// forEach
	function getStocksForEach(stocks) {
		var symbols = [];
		stocks.forEach(function (stock) {
			symbols.push(stock.symbol);
		});
		return symbols;
	}

	printy(JSON.stringify(getStocksForEach(STOCKS)), 'forEach');


	Array.prototype.map = function(projectionFn){
		var results = [];
		this.forEach(function (item) {
			results.push(projectionFn(item));
		});
		return results;
	};

	function getStocksMap(stocks) {
		return stocks.map(function (stock) {
			return stock.symbol;
		})
	}

	printy(JSON.stringify(getStocksMap(STOCKS)), 'map');

	Array.prototype.filter = function(predicateFn){
		var results = [];
		this.forEach(function (item) {
			if(predicateFn(item)){
				results.push(item);
			}
		});
		return results;
	};

	function getStocksFilter(stocks, minPrice) {
		return stocks.filter(function(stock) {
			return stock.price >= minPrice;
		})
	}

	printy(JSON.stringify(getStocksFilter(STOCKS, 300)), 'filter');

	function getStocksMapFilter(stocks) {
		// we can only use
		return stocks
			.filter(function (stock) {
				return stock.price >= 150.00;
			})
			.map(function (stock) {
				return stock.symbol;
			});
	}

	printy(JSON.stringify(getStocksMapFilter(STOCKS)), 'map and filter');

	Array.prototype.concatAll = function() {
		var results = [];
		this.forEach(function(subArray) {
			subArray.forEach(function(item) {
				results.push(item);
			});
		});
		return results;
	};

	printy(JSON.stringify(EXCHANGES.concatAll()), 'exchanges concatAll');

})();