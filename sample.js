/**
 * Created by hipsterzipster
 */
(function () {

	function runInfiniteSequence(){
		var source = Rx.Observable.interval(250) //generates integer values 0 to infinity
			.map(function (x) {
				return {
					'id': (x % 2 == 0 ? 'even' : 'odd'),
					'val': x
				}
			})
			.publish().refCount();

		var evenSub = source
			.filter(function (x) {
				return x.id === 'even';
			})
			.sample(1000)
			.subscribe(createObserver('evenSubscription'));

		var oddSub = source
			.filter(function (x) {
				return x.id === 'odd';
			})
			.sample(1000)
			.subscribe(createObserver('oddSubscription'));
	}

	function runInfiniteSequenceEarlyDispose(){
		var source = Rx.Observable.interval(250) //generates integer values 0 to infinity
			.map(function (x) {     // project each integer value into an Object
				return {
					'id': (x % 2 == 0 ? 'even' : 'odd'),
					'val': x
				}
			})
			.doOnCompleted(function () {    // useful for debugging, calls when complete
				printx('Sequence complete so Ill dispose myself.', 'source Observable')
			})
			.publish()  //publish says to use multicast so that all Observers get each update
			.refCount();    // keep track of the number of Observers and stop pumping values when there's no one listening

		var evenSub = source
			.filter(function (x) {
				return x.id === 'even';
			})
			.sample(1000)
			.subscribe(createObserver('evenSubscription'));

		var oddSub = source
			.filter(function (x) {
				return x.id === 'odd';
			})
			.sample(1000)
			.subscribe(createObserver('oddSubscription'));

		// When Observers want to unsubscribe before sequence completes
		setTimeout(function() {
			printx('timeout met, disposing of Observers');
			evenSub.dispose();
			oddSub.dispose();
		}, 4000);
	}

	function runFiniteSequenceWithCompletion(){
		var source = Rx.Observable.interval(250) //generates integer values 0 to infinity
			.take(21) //produce only 21 values and then send out 'completed' to all observers
			.map(function (x) {     // project each integer value into an Object
				return {
					'id': (x % 2 == 0 ? 'even' : 'odd'),
					'val': x
				}
			})
			.doOnCompleted(function () {    // useful for debugging, calls when complete
				printx('Sequence complete so Ill dispose myself.', 'source Observable')
			})
			.publish()  //publish says to use multicast so that all Observers get each update
			.refCount();    // keep track of the number of Observers and stop pumping values when there's no one listening

		var evenSub = source
			.filter(function (x) {
				return x.id === 'even';
			})
			.sample(1000)
			.subscribe(createObserver('evenSubscription'));

		var oddSub = source
			.filter(function (x) {
				return x.id === 'odd';
			})
			.sample(1000)
			.subscribe(createObserver('oddSubscription'));
	}

	document.getElementById("btnInfinite").addEventListener('click', runInfiniteSequence);
	document.getElementById("btnEarlyDispose").addEventListener('click', runInfiniteSequenceEarlyDispose);
	document.getElementById("btnComplete").addEventListener('click', runFiniteSequenceWithCompletion);


})();

// first show infinite sequence
// then show where Observers prematurely dispose themselves and that the source sequence
// automatically counts the references and disposes itself
// use take(21) to limit the Source sequence length so that we can see that you dont
// even need to call dispose for each Observer bc they'll dispose of themselves when the source is completed.