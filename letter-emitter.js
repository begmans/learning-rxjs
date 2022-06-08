import { Observable } from "rxjs";
import { DateTime } from "luxon";
import { sleep } from "./utils.js";

const randomCharCode = () => Math.floor(((91-65) * Math.random()) + 65); 


async function main() {
  const in2days = DateTime.now().plus({ days: 2 });
  const inOneMinute = DateTime.now().plus({ minutes: 1 });

  const maxIntervalBeforeNextEmit = 5000;

  const letterEmitter = buildEmitterRecursive(inOneMinute, maxIntervalBeforeNextEmit);
  //const letterEmitter = buildEmitterWhile(inOneMinute, maxIntervalBeforeNextEmit);

  letterEmitter.subscribe( (v) => {console.log(`s1 receives: ${v}`)} );

  const secondObserver = {
    next: (value) => { console.log(`observer 2 receives: ${value}`)},
    complete: (value) => {console.log(`observable excecution is complete: ${value}`) }
  };

  await sleep(5000);
  letterEmitter.subscribe(secondObserver);
  
}

function buildEmitterRecursive(deadline, maxInterval) {

  const delayEmit = buildDelayEmit(deadline, maxInterval);

  return new Observable((subscriber) => {
    
    subscriber.next(String.fromCharCode(randomCharCode()));
    delayEmit(subscriber);
    
  });
}

function buildEmitterWhile(deadline, maxInterval) {
  const lazyExec = async (subscriber) => {
    while(DateTime.now() <  deadline) {
      subscriber.next(String.fromCharCode(randomCharCode()));
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
      subscriber.next(String.fromCharCode(randomCharCode()));
      if (DateTime.now() < deadline) { 
        recursiveExec(subscriber); }
      else {
        subscriber.complete();
      } 
    }, myDelay);
  }
}

main();