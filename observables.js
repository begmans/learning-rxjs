import { DateTime } from "luxon";
import { buildEmitterRecursive } from "./letter-emitter.js";
import { sleep } from "./utils.js";


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

main();