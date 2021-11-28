import { Meteor } from "meteor/meteor";

const Data = new Mongo.Collection("recipe");

if (Meteor.isServer) {
   Meteor.startup(() => {
      if (Data.find().count() === 0) {
         for (let i = 1; i < 5; i++) {
            Data.insert({
               image: 'img_'+[i]+'.jpg',
               // price: `$$${[i]} In cash`,
               // image: `image${[i]}`,
            });
         }
         console.log(Data.find().count());
      }
   });
}