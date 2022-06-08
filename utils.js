
export function sleep(durationMs) { return new Promise(resolve => setTimeout(resolve,durationMs))}

export const randomCharCode = () => Math.floor(((91-65) * Math.random()) + 65); 

export const randomString = () => String.fromCharCode(randomCharCode());