import * as Rx from "rxjs/Rx";

let button = document.querySelector("button");

Rx.Observable.fromEvent(button, "click")
    .throttleTime(1000)
    .map((event: MouseEvent) => event.clientX)
    .subscribe(x => console.log(x + 1));