import { Meteor } from 'meteor/meteor';
// Create tasks collection
import { Mongo } from 'meteor/mongo';
 
export const Tasks = new Mongo.Collection('tasks');