let grpc = require("grpc");
const service = require("../server/protos/greet_grpc_pb");
const greets = require("../server/protos/greet_pb");
const calcService = require("../server/protos/calculator_grpc_pb");
const calc = require("../server/protos/calculator_pb");

function callGreeting() {
  let client = new service.GreetServiceClient(
    "localhost:3001",
    grpc.credentials.createInsecure()
  );
  console.log("hello form client");

  var request = new greets.GreetRequest();

  var greeting = new greets.Greeting();
  greeting.setFirstName("imthiyas");
  greeting.setLastName("mohamed");

  request.setGreeting(greeting);

  client.greet(request, (error, response) => {
    if (!error) {
      console.log("greeting ", response.getResult());
    } else {
      console.log(error);
    }
  });
}

function calSum() {
  var client = new calcService.CalculatorServiceClient(
    "localhost:3001",
    grpc.credentials.createInsecure()
  );

  var sumRequest = new calc.SumRequest();

  sumRequest.setFirstNumber(10);
  sumRequest.setSecondNumber(15);

  client.sum(sumRequest, (error, response) => {
    if (!error) {
      console.log(
        sumRequest.getFirstNumber() +
          "+" +
          sumRequest.getSecondNumber() +
          "=" +
          response.getSumResult()
      );
    } else {
      console.log(error);
    }
  });
}

function callGreetManyTimes() {
  var client = new service.GreetServiceClient(
    "localhost:3001",
    grpc.credentials.createInsecure()
  );

  // create request

  var request = new greets.GreetManyTimesRequest();

  var greeting = new greets.Greeting();

  greeting.setFirstName("imthiyas");

  greeting.setLastName("mohamed");

  request.setGreeting(greeting);

  var call = client.greetManyTimes(request, () => {});

  call.on("data", (response) => {
    console.log("client streaming rsponse data", response.getResult());
  });

  call.on("status", (status) => {
    console.log("client streaming rsponse status", status);
  });

  call.on("error", (error) => {
    console.log("client streaming rsponse error", error);
  });
}

function callPrimeNumberDecomposition() {
  var client = new calcService.CalculatorServiceClient(
    "localhost:3001",
    grpc.credentials.createInsecure()
  );

  var request = new calc.primeNumberDecompositionRequest();

  var number = 567890;

  request.setNumber(number);

  var call = client.primeNumberDecomposition(request, () => {});

  call.on("data", (response) => {
    console.log("prime factor found ", response.getPrimeFactor());
  });

  call.on("error", (error) => {
    console.log(error);
  });

  call.on("status", (status) => {
    console.log(status);
  });

  call.on("end", () => {
    console.log("streaming end");
  });
}

function callLongGreeting() {
  var client = new service.GreetServiceClient(
    "localhost:3001",
    grpc.credentials.createInsecure()
  );

  var request = new greets.LongGreetRequest();

  var call = client.longGreet(request, (error, response) => {
    if (!error) {
      console.log(response.getResult());
    } else {
      console.log(error);
    }
  });

  let count = 0,
    intervalID = setInterval(() => {
      console.log("sending message" + count);
      var request = new greets.LongGreetRequest();

      var greeting = new greets.Greeting();

      greeting.setFirstName("imthiyas");
      greeting.setLastName("mohamed");

      request.setGreet(greeting);

      call.write(request);

      if (++count > 3) {
        clearInterval(intervalID);
        call.end();
      }
    }, 1000);
}

function callComputeAverage() {
  var client = new calcService.CalculatorServiceClient(
    "localhost:3001",
    grpc.credentials.createInsecure()
  );

  var request = new calc.ComputeAverageRequest();

  var call = client.computeAverage(request, (error, response) => {
    if (!error) {
      console.log("received" + response.getAverage());
    } else {
      console.log(error);
    }
  });

  var request = new calc.ComputeAverageRequest();

  request.setNumber(1);

  var requestTwo = new calc.ComputeAverageRequest();

  request.setNumber(2);

  call.write(request);
  call.write(requestTwo);

  call.end();
}

function main() {
  // calSum();

  // callGreetManyTimes();
  // callPrimeNumberDecomposition();
  // callLongGreeting();
  callComputeAverage();
}

main();
