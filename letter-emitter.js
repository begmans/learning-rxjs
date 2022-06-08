import { Observable } from "rxjs";
import { DateTime } from "luxon";
import { sleep, randomString } from "./utils.js";


export function buildEmitterRecursive(deadline, maxInterval) {

  const delayEmit = buildDelayEmit(deadline, maxInterval);

  return new Observable((subscriber) => {
    
    subscriber.next(randomString());
    delayEmit(subscriber);
    
  });
}

export function buildEmitterWhile(deadline, maxInterval) {
  const lazyExec = async (subscriber) => {
    while(DateTime.now() <  deadline) {
      subscriber.next(randomString());
      const myDelay = Math.floor(Math.random() * maxInterval);
      console.log(myDelay);
      await sleep(myDelay);
    }

    subscriber.complete();
  }
  return new Observable(lazyExec);
}

function buildDelayEmit (deadline, maxInterval) {
  return function recursiveExec(subscriber) {
    const myDelay = Math.floor(Math.random() * maxInterval);
    console.log(myDelay);
    setTimeout(() => {
      subscriber.next(randomString());
      if (DateTime.now() < deadline) { 
        recursiveExec(subscriber); }
      else {
        subscriber.complete();
      } 
    }, myDelay);
  }
}

