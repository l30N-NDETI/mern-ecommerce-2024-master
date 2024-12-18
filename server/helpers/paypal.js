const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AUxsVn4vy-Db6CeiUK6V2UoEakq8WYQqahaQPqWYngABsg-dxAIxo8DCK4Q4KlohbGlEpHgz275wqkg1",
  client_secret: "EAAvvXXrYaCuBept6_nkZB06odV4HcGK-KMLR1BMRrwXexhC91Ef7g_JZVcOz-a9f3CBJTMQ6c9q4ZrJ",
});

module.exports = paypal;
