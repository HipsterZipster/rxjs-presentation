/**
 * Created by hipsterzipster on 5/18/15.
 */
(function () {
	var btnStd = document.getElementById('btnStd');
	var btnRx = document.getElementById('btnRx');

	//standard way to add and remove handlers by calling api-specific methods
	// on that object
	var handler = function(e) {
	    printx('clicked', 'btnStd');
		btnStd.removeEventListener('click', handler);
	};
	btnStd.addEventListener('click', handler);

	// Rx-way to add/remove handlers
	// The difference below is that we get an Object that represents the event stream
	// and can then perform operations like map, filter, and more.
	var clicksRx = Rx.Observable.fromEvent(btnRx, 'click');
	var subscription1 = clicksRx.forEach(function (i) {
		printx('clicked', 'btnRx');
		console.log(i);
		subscription1.dispose();
	});

	// SYNCHONOUS CODE
	var syncPref = 'SYNChronous foreach';
	[1,2,3].forEach(function (i) {
		printx(i, syncPref)
	});
	// if you want to printx something that occurs after processing a synchronous array
	// you can just put the statement below the loop
	printx('done', syncPref);
	// or to catch an error, you just need to suround the entire thing in a try/catch
	try {
		var syncPref = 'SYNChronous foreach';
		[1,2,3].forEach(function (i) {
			printx(i, syncPref)
		});
		// if you want to printx something that occurs after processing a synchronous array
		// you can just put the statement below the loop
		printx('done', syncPref);
	}
	catch (e){
		printx('error', syncPref);
	}

	// how do we do the following 2 actions in an asynchronous collection?
	// how do we do something when it has completely exhausted?
	// how do we do something when an error is detected?

	// wont work since its executed on the event loop outside the try catch
	try {
		clicksRx.forEach(function (i) {
			printx('clicked', 'btnRx');
		});
		// wont work
		printx('done', syncPref);
	}
	catch (e){
		// wont work
		printx('error', syncPref)
	}



	//var subscription1 = clicksRx.subscribe(
	//	function onNext(e) {
	//		//printx('clicked', 'btnRx');
	//		//subscription1.dispose();
	//	},
	//	function onError(error) {
	//		printx('ERROR!');
	//	},
	//	function onCompleted() {
	//		printx("done");
	//	});
})();