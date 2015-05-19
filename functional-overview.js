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

	// regular for loop
	function getStocksFor(stocks) {
		var symbols = [], ctr, stock;
		for (ctr = 0; ctr < stocks.length; ctr++) {
			stock = stocks[ctr];
			symbols.push(stock.symbol);
		}
		return symbols;
	}

	window.print(JSON.stringify(getStocksFor(STOCKS)), 'for', false);

	// forEach
	function getStocksForEach(stocks) {
		var symbols = [];
		stocks.forEach(function (stock) {
			symbols.push(stock.symbol);
		});
		return symbols;
	}

	window.print(JSON.stringify(getStocksForEach(STOCKS)), 'forEach', false);


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

	window.print(JSON.stringify(getStocksMap(STOCKS)), 'map', false);

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

	window.print(JSON.stringify(getStocksFilter(STOCKS, 300)), 'filter', false);

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

	window.print(JSON.stringify(getStocksMapFilter(STOCKS)), 'map and filter', false);

	Array.prototype.concatAll = function() {
		var results = [];
		this.forEach(function(subArray) {
			subArray.forEach(function(item) {
				results.push(item);
			});
		});
		return results;
	};

	window.print(JSON.stringify(EXCHANGES.concatAll()), 'exchanges concatAll', false);

})();