/**
 * Created by hipsterzipster on 5/18/15.
 */
(function() {
	var list = document.getElementById("list");
	var getTimestamp = function() {
		return window.performance.now();
	}
	var formatDuration = function(ms) {
		return (ms / 1000).toFixed(3) + "s";
	}
	var t0 = getTimestamp();
	var getRuntime = function() {
		return formatDuration(getTimestamp() - t0);
	}

	function print(text, prefix) {
		var li = document.createElement("li");
		prefix = (prefix) ? prefix + ":  " : "";
		li.innerHTML = getRuntime() + ": " + prefix + text;
		list.appendChild(li);
	}


	/*var source1 = Rx.Observable.fromArray([1,2,3,4]).subscribe(function(x){
	 print(x);
	 })*/

	// .take(21) used when i want to limit the actual producer content

	var source = Rx.Observable.interval(250) //generates integer values 0 to infinity
		.map(function(x) {
			return {
				'id': (x % 2 == 0 ? 'even' : 'odd'),
				'val': x
			}
		})
		.doOnCompleted(function() {
			print('Sequence complete so Ill dispose myself.', 'source Observable')
		})
		.publish().refCount();

	var evenSub = source
		.filter(function(x) {
			return x.id === 'even';
		})
		.sample(1000)
		.subscribe(
			function onNext(item) {
				print(JSON.stringify(item.val), 'evenSubscription');
			},
			function onError(err) {
				print('Error: ' + err, 'evenSubscription');
			},
			function onCompleted() {
				print('Completed', 'evenSubscription');
			});

	var oddSub = source
		.filter(function(x) {
			return x.id === 'odd';
		})
		.sample(1000)
		.subscribe(
		function onNext(item) {
			print(JSON.stringify(item.val), 'oddSubscription');
		},
		function onError(err) {
			print('Error: ' + err, 'oddSubscription');
		},
		function onCompleted() {
			print('Completed', 'oddSubscription');
		});

	// When Observers want to unsubscribe b4 sequence completes
	//setTimeout(function() {
	//	print('timeout met, disposing of Observers')
	//	evenSub.dispose();
	//	oddSub.dispose();
	//}, 4000);

})();

// first show infinite sequence
// then show where Observers prematurely dispose themselves and that the source sequence
// automatically counts the references and disposes itself
// use take(21) to limit the Source sequence length so that we can see that you dont
// even need to call dispose for each Observer bc they'll dispose of themselves when the source is completed.