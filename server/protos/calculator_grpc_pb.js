// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_calculator_pb = require('../protos/calculator_pb.js');

function serialize_calculator_ComputeAverageRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.ComputeAverageRequest)) {
    throw new Error('Expected argument of type calculator.ComputeAverageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAverageRequest(buffer_arg) {
  return protos_calculator_pb.ComputeAverageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_ComputeAverageResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.ComputeAverageResponse)) {
    throw new Error('Expected argument of type calculator.ComputeAverageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAverageResponse(buffer_arg) {
  return protos_calculator_pb.ComputeAverageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.SumRequest)) {
    throw new Error('Expected argument of type calculator.SumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumRequest(buffer_arg) {
  return protos_calculator_pb.SumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.SumResponse)) {
    throw new Error('Expected argument of type calculator.SumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumResponse(buffer_arg) {
  return protos_calculator_pb.SumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_primeNumberDecompositionRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.primeNumberDecompositionRequest)) {
    throw new Error('Expected argument of type calculator.primeNumberDecompositionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_primeNumberDecompositionRequest(buffer_arg) {
  return protos_calculator_pb.primeNumberDecompositionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_primeNumberDecompositionResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.primeNumberDecompositionResponse)) {
    throw new Error('Expected argument of type calculator.primeNumberDecompositionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_primeNumberDecompositionResponse(buffer_arg) {
  return protos_calculator_pb.primeNumberDecompositionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  // unary API
sum: {
    path: '/calculator.CalculatorService/Sum',
    requestStream: false,
    responseStream: false,
    requestType: protos_calculator_pb.SumRequest,
    responseType: protos_calculator_pb.SumResponse,
    requestSerialize: serialize_calculator_SumRequest,
    requestDeserialize: deserialize_calculator_SumRequest,
    responseSerialize: serialize_calculator_SumResponse,
    responseDeserialize: deserialize_calculator_SumResponse,
  },
  // server streaming api
//
primeNumberDecomposition: {
    path: '/calculator.CalculatorService/primeNumberDecomposition',
    requestStream: false,
    responseStream: true,
    requestType: protos_calculator_pb.primeNumberDecompositionRequest,
    responseType: protos_calculator_pb.primeNumberDecompositionResponse,
    requestSerialize: serialize_calculator_primeNumberDecompositionRequest,
    requestDeserialize: deserialize_calculator_primeNumberDecompositionRequest,
    responseSerialize: serialize_calculator_primeNumberDecompositionResponse,
    responseDeserialize: deserialize_calculator_primeNumberDecompositionResponse,
  },
  // client streaming api
//
computeAverage: {
    path: '/calculator.CalculatorService/ComputeAverage',
    requestStream: true,
    responseStream: false,
    requestType: protos_calculator_pb.ComputeAverageRequest,
    responseType: protos_calculator_pb.ComputeAverageResponse,
    requestSerialize: serialize_calculator_ComputeAverageRequest,
    requestDeserialize: deserialize_calculator_ComputeAverageRequest,
    responseSerialize: serialize_calculator_ComputeAverageResponse,
    responseDeserialize: deserialize_calculator_ComputeAverageResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);
