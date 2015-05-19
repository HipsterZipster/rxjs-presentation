/**
 * Created by hipsterzipster on 5/18/15.
 */
(function () {
	var btnStd = document.getElementById('btnStd');
	var btnRx = document.getElementById('btnRx');

	//standard way to add and remove handlers by calling api-specific methods
	// on that object
	var handler = function(e) {
	    print('clicked', 'btnStd');
		btnStd.removeEventListener('click', handler);
	};
	btnStd.addEventListener('click', handler);

	// Rx-way to add/remove handlers
	// The difference below is that we get an Object that represents the event stream
	// and can then perform operations like map, filter, and more.
	var clicksRx = Rx.Observable.fromEvent(btnRx, 'click');
	var subscription1 = clicksRx.forEach(function (i) {
		print('clicked', 'btnRx');
		console.log(i);
		subscription1.dispose();
	});

	// SYNCHONOUS CODE
	var syncPref = 'SYNChronous foreach';
	[1,2,3].forEach(function (i) {
		print(i, syncPref)
	});
	// if you want to print something that occurs after processing a synchronous array
	// you can just put the statement below the loop
	print('done', syncPref);
	// or to catch an error, you just need to suround the entire thing in a try/catch
	try {
		var syncPref = 'SYNChronous foreach';
		[1,2,3].forEach(function (i) {
			print(i, syncPref)
		});
		// if you want to print something that occurs after processing a synchronous array
		// you can just put the statement below the loop
		print('done', syncPref);
	}
	catch (e){
		print('error', syncPref);
	}

	// how do we do the following 2 actions in an asynchronous collection?
	// how do we do something when it has completely exhausted?
	// how do we do something when an error is detected?

	// wont work since its executed on the event loop outside the try catch
	try {
		clicksRx.forEach(function (i) {
			print('clicked', 'btnRx');
		});
		// wont work
		print('done', syncPref);
	}
	catch (e){
		// wont work
		print('error', syncPref)
	}



	//var subscription1 = clicksRx.subscribe(
	//	function onNext(e) {
	//		//print('clicked', 'btnRx');
	//		//subscription1.dispose();
	//	},
	//	function onError(error) {
	//		print('ERROR!');
	//	},
	//	function onCompleted() {
	//		print("done");
	//	});
})();