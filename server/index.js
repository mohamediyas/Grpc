const grpc = require("grpc");
const service = require("../server/protos/greet_grpc_pb");
const greets = require("../server/protos/greet_pb");

const calcService = require("../server/protos/calculator_grpc_pb");
const calc = require("../server/protos/calculator_pb");

// implement rpc mehod
function greet(call, callback) {
  var greeting = new greets.GreetResponse();

  greeting.setResult("hello" + call.request.getGreeting().getFirstName());

  callback(null, greeting);
}

function sum(call, callback) {
  var sumResponse = new calc.SumResponse();

  sumResponse.setSumResult(
    call.request.getFirstNumber() + call.request.getSecondNumber()
  );
  callback(null, sumResponse);
}

function greetManyTimes(call, callback) {
  var firstName = call.request.getGreeting().getFirstName();

  let count = 0,
    intervalID = setInterval(() => {
      var greetManyTimesResponse = new greets.GreetManyTimesResponse();

      greetManyTimesResponse.setResult(firstName);

      // setup streaming

      call.write(greetManyTimesResponse);

      if (++count > 9) {
        clearInterval(intervalID);

        // we have send all messages
        call.end();
      }
    }, 1000);
}

function primeNumberDecomposition(call, callback) {
  var number = call.request.getNumber();

  var divisor = 2;

  while (number > 1) {
    if (number % divisor === 0) {
      var primeNumberDecompositionResponse =
        new calc.primeNumberDecompositionResponse();

      primeNumberDecompositionResponse.setPrimeFactor(divisor);

      number = number / divisor;

      //
      call.write(primeNumberDecompositionResponse);
    } else {
      divisor++;
      console.log("divisor increase ", divisor);
    }
  }

  call.end();
}

function longGreet(call, callback) {
  call.on("data", (request) => {
    var fullName =
      request.getGreet().getFirstName() +
      " " +
      request.getGreet().getLastName();

    console.log("hello " + fullName);
  });

  call.on("error", (error) => {
    console.log(error);
  });

  call.on("end", () => {
    var response = new greets.LongGreetResponse();
    response.setResult("Long streaming");

    callback(null, response);
  });
}

function computeAverage(call, callback) {
  var sum = 0;
  var count = 0;

  call.on("data", (request) => {
    sum += request.getNumber();

    console.log(request.getNumber());

    // increment
    count += 1;
  });

  call.on("error", (error) => {
    console.log(error);
  });

  call.on("end", () => {
    var average = sum / count;

    var response = new calc.ComputeAverageResponse();

    response.setAverage(average);

    callback(null, response);
  });
}

// bi

async function sleep(intervel) {
  return new Promise((res, rej) => {
    setTimeout(() => res(), intervel);
  });
}

async function greetEveryOne(call, callback) {
  call.on("data", (response) => {
    var fullName =
      response.getGreet().getFirstName() +
      "  " +
      response.getGreet().getLastName();

    console.log("hello" + fullName);
  });

  call.on("error", (error) => {
    console.log(error);
  });

  call.on("end", () => {
    console.log("the end");
  });

  for (let i = 0; i < 10; i++) {
    // var greeting = new greets.Greeting();

    // greeting.setFirstName("imthiyas");
    // greeting.setLastName("mohamed");

    var request = new greets.GreetEveryoneRequest();

    request.setResult("imthiyas");
    // request.setGreet(greeting);

    call.write(request);

    await sleep(1000);
  }

  call.end();
}

function main() {
  let server = new grpc.Server();

  server.addService(service.GreetServiceService, {
    greet: greet,
    greetManyTimes: greetManyTimes,
    longGreet: longGreet,
    greetEveryOne: greetEveryOne,
  });

  // server.addService(calcService.CalculatorServiceService, {
  //   sum: sum,
  //   primeNumberDecomposition: primeNumberDecomposition,
  //   computeAverage: computeAverage,
  // });

  server.bind("127.0.0.1:3001", grpc.ServerCredentials.createInsecure());

  server.start();

  console.log("server runnning 3001");
}

main();
