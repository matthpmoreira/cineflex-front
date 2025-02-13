// Monkey patch so that pushing a state dispatches an event

window.history.pushState = new Proxy(window.history.pushState, {
    apply: function(target, thisArg, args) {
        target.apply(thisArg, args);
        window.dispatchEvent(new CustomEvent("onpushstate", args));
    },
});
