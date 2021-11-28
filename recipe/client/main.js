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
   });
}
