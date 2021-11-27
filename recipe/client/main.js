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
  const bags = [
    {
      name: "louis Vuitton",
      price: 900,
    },
    {
      name: "Gucci",
      price: 890,
    },
    {
      name: "Prada",
      price: 350,
    }
  ];
  Template.collection.helpers({designer: bags});
}

if(Meteor.isServer){
  console.log("i am server")
}