const CircuitBreaker = require('./CircuitBreaker-fallback.js')


// Our unstable request simulation
const unstableRequest=() => {
  return new Promise((resolve, reject) => {
      if (Math.random() > .6) {
        resolve({data: "Success"})
      } else {
        reject({data: "Failed"})
      }
  })
}

function expensiveResource() {
  return new Promise((resolve, reject) => {
    resolve({ data: "Expensive Fallback Successful" })
  })
}
const breaker = new CircuitBreaker(unstableRequest, expensiveResource)



setInterval(() => {
    breaker
      .fire()
      .then(console.log)
      .catch(console.error)
  }, 1000)

