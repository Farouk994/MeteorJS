import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import "./main.html";

const Data = new Mongo.Collection("recipe");

Template.hello.onCreated(function helloOnCreated() {
   // counter starts at 0
   this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
   counter() {
      return Template.instance().counter.get();
   },
});

Template.hello.events({
   "click button"(event, instance) {
      instance.counter.set(instance.counter.get() + 1);
   },
});

if (Meteor.isClient) {
   Template.collection.helpers({ meal: Data.find() });

   //  Find all images in the collection DB and sort them from the lowest
   Template.collection.helpers({
      meal: Data.find({}, {sort:{rating:-1}}),
   });

   Template.collection.events({
      "click .js-image": function (event) {
         $(event.target).css("width", "125px");
      },
      "click .js-del-image": function (event) {
         var image_id = this._id;
         console.log(image_id);
         $("#" + image_id).hide("slow", function () {
            Data.remove({ _id: image_id });
         });
      },
      "click .js-rate-image": function (event) {
         // Get value for rating when event is clicked
         var rating = $(event.currentTarget).data("userrating");
         console.log(rating);

         //  Check to see if image_id can be accessed from the collection
         var image_id = this.id;
         console.log(image_id);

         //  update the collection by assigning the image _id to
         // the _id viewed on the clientSide and $set it to rating
         Data.update({ _id: image_id }, { $set: { rating: rating } });
      },
   });
}
