import { buildEmitterRecursive } from "./letter-emitter.js";
import { Subject } from "rxjs";
import { DateTime } from "luxon";

const subject = new Subject();

subject.subscribe({
  next: (value) =>  console.log('sub 1 ' + value),
});

subject.subscribe({
  next: (value) =>  console.log('sub 2 ' + value),
});

const letterEmitter = buildEmitterRecursive(DateTime.now().plus({seconds: 45}), 5000);

letterEmitter.subscribe(subject);