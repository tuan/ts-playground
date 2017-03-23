import * as Rx from "rxjs/Rx";

class Dispatcher extends Rx.Subject<any> {
    dispatch(value: any) : void {
        this.next(value);
    }
}
class Store extends Rx.BehaviorSubject<any> {
    /**
     *
     */
    constructor(
        private dispatcher: Dispatcher,
        initialState: any
    ) {
        super(initialState);
        this.dispatcher
            .subscribe(state => super.next(state));
    }

    dispatch(value: any) {
        this.dispatcher.dispatch(value);
    }

    next(value: any) {
        this.dispatcher.dispatch(value);
    }
}
const dispatcher = new Dispatcher();
const store = new Store(dispatcher, "initial value");

const actionStream$ = new Rx.Subject();
actionStream$.subscribe(store);