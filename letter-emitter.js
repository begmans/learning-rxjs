import { Observable } from "rxjs";
import { DateTime } from "luxon";
import { sleep } from "./utils.js";

const randomCharCode = () => Math.floor(((91-65) * Math.random()) + 65); 


async function main() {
  const in2days = DateTime.now().plus({ days: 2 });
  const maxIntervalBeforeNextEmit = 5000;

  const letterEmitter = buildEmitter(in2days, maxIntervalBeforeNextEmit);

  letterEmitter.subscribe( (v) => {console.log(`s1 receives: ${v}`)} );

  const secondObserver = {
    next: (value) => { console.log(`observer 2 receives: ${value}`)},
    complete: (value) => {console.log(`observable excecution is complete: ${value}`) }
  };

  await sleep(5000);
  letterEmitter.subscribe(secondObserver);
  
}

function buildEmitter(deadline, maxInterval) {

  const delayEmit = buildDelayEmit(deadline, maxInterval);

  return new Observable((subscriber) => {
    
    subscriber.next(String.fromCharCode(randomCharCode()));
    delayEmit(subscriber, deadline, maxInterval);
  });
}

function buildDelayEmit (deadline, maxInterval) {
  return function rec(subscriber) {
    const myDelay = Math.floor(Math.random() * maxInterval);
    console.log(myDelay);
    setTimeout(() => {
      subscriber.next(String.fromCharCode(randomCharCode()));
      if (DateTime.now() < deadline) { 
        rec(subscriber); }
      else {
        subscriber.complete();
      } 
    }, myDelay);
  }
}

main();