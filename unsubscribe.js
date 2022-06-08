import { sleep } from "./utils.js";
import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
  // Keep track of the interval resource
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});

const subscription = observable.subscribe(console.log);
await sleep(8000);
subscription.unsubscribe();