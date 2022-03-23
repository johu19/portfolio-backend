"use strict";

module.exports.health = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Pong",
        input: event,
      },
      null,
      2
    ),
  };
};
