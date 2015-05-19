(function () {
	var btnAlert = document.getElementById("btnAlert");
	btnAlert.addEventListener('click', function (e) {
		printx(new Error('this is what an error looks like'));
	});

	var nonRxClicksPerInterval = 0, nonRxThrottle = 1000, nonRxMaxRate = 1;
	function countClickRate(event) {
		nonRxClicksPerInterval++;
		printx('nonRxClicksPerInterval = '+nonRxClicksPerInterval);
		setTimeout(function () {
			if (nonRxClicksPerInterval > nonRxMaxRate){
				printx('In an error state, this thrown error should be caught be the caller', 'nonRxClicksPerInterval throttled');
				throw new Error('nonRxMouseRate you clicked faster than '+nonRxMaxRate+ ' per second!');
			} else {
				printx(nonRxClicksPerInterval, 'nonRxClicksPerInterval throttled');
				nonRxClicksPerInterval = 0;
			}
		}, nonRxThrottle);
	}

	var btnStd = document.getElementById("btnStd");
	btnStd.addEventListener('click', function countClicksTryCatch(event) {
		try {
			countClickRate(event);
		} catch (error) {
			printx(error, 'CAUGHT ERROR');
		}
	});

	// RX WAY

	var rxThrottle = 1000, rxMaxRate = 1;
	var btnRx = document.getElementById('btnRx');
	var clicksRx = Rx.Observable.fromEvent(btnRx, 'click')
		.bufferWithTime(rxThrottle)     // returns a array of click events in the time period
		.map(function (clicksArr) {     // returns the number of buffered click events
			return clicksArr.length;
		})
		.filter(function (clicksCount) { // returning the number of click events meeting the condition
			if( clicksCount > rxMaxRate) {
				throw new Error('RxClicksPerInterval you clicked '+clicksCount+' times, which is faster than ' + rxMaxRate + ' per second!')
			}
			return clicksCount;
		});

	clicksRx.subscribe(
		function onNext(data) {
			printx('RxClicksPerInterval = '+data);
		},
		function onError(error) {
			printx(error, 'CAUGHT ERROR');
		});

})();