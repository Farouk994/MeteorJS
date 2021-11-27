import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

if(Meteor.isClient){
  console.log("this is client")
  const foodProgramme = [
    {
      name: "fish",
      price: 900,
      image: "fish.jpg"
    },
    {
      name: "meat",
      price: 890,
      image: "meat.jpg"
    },
    {
      name: "beas",
      price: 350,
      image:"beans.jpg"
    }
  ];
  Template.collection.helpers({meal: foodProgramme});
  Template.collection.events({
    'click .js-image': function(event){
      $(event.target).css("width","125px")
    }
  })
}

if(Meteor.isServer){
  console.log("i am server")
}
