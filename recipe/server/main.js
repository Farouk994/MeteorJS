import { Meteor } from "meteor/meteor";

const Data = new Mongo.Collection("recipe");
console.log(Data.find().count());

if (Meteor.isServer) {
   Meteor.startup(() => {
      if (Data.find().count() === 0) {
         Data.insert({
            name: "Veggies",
            price: 56,
            image: "veggies",
         });
         Data.insert({
            name: "fish",
            price: 900,
            image: "fish.jpg",
         });
         Data.insert({
            name: "meat",
            price: 890,
            image: "meat.jpg",
         });
         Data.insert({
            name: "beas",
            price: 350,
            image: "beans.jpg",
         });
      }
   });
}

