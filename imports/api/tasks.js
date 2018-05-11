import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');

// Add publication for tasks
if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({
          $or: [
              { private: { $ne: true } },
              { owner: this.user_id },
          ],
        });
    });
}

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);
        // Some extra security to methods
        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Task.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        // Extra security to methods
        const task = Task.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // if the task  is private, make sure only the owner can check it off
            throw new Meteor.Error('not-autoried')
        }

        Tasks.update(taskId, { $set: { checked: setChecked } });
    },
    // Define method to set tasks to private
    'tasks.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setTOPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        // Make sure only the owner make a task private
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { private: setPrivate } });
    },
});