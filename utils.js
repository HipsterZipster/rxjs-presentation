/**
 * Created by hipsterzipster on 5/18/15.
 */
(function () {
	var list = document.getElementById("list");
	var getTimestamp = function () {
		return window.performance.now();
	};
	var formatDuration = function (ms) {
		return (ms / 1000).toFixed(3) + "s";
	};
	var t0 = getTimestamp();
	var getRuntime = function () {
		return formatDuration(getTimestamp() - t0);
	};

	window.printx = function(text, prefix) {
		var li = document.createElement("li");
		prefix = (prefix) ? prefix + ":  " : "";
		var duration = getRuntime() + ": ";
		li.innerHTML = duration + prefix + text;
		list.appendChild(li);
	};

	window.createObserver = function(prefix) {
		return Rx.Observer.create(
			function onNext(item) {
				printx(JSON.stringify(item.val), prefix);
			},
			function onError(err) {
				printx('Error: ' + err, prefix);
			},
			function onCompleted() {
				printx('Completed', prefix);
			}
		);
	}

})();