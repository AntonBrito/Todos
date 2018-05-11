/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
// Prepare the db for each test
import { Random } from 'meteor/random';

import { assert } from 'meteor/pracrticalmeteor:chai';

import { Tasks } from './tasks.js';
 
if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
        const userId = Random.id();
        let taskId;

        beforeEach(() => {
            Tasks.remove({});
            taskId = Tasks.insert({
                text: 'test task',
                createdAt: new Date(),
                owner: userId,
                username: 'tmeasday',
            });
        });

      it('can delete owned task', () => {
          // Find the internal implementation of the task methos so we can
          // test if in isolation
          const deleteTask = Meteor.server.method_handlers['tasks.remove'];

          // set up a fake method invocation that looks like what the method expects
          const invocation = { userId };

          // Run the method with 'this' set to the fake invocation
          deleteTask.apply(invocation, [taskId]);

          // Verify that the method does what we expected
          assert.equal(Tasks.find().count(), 0);
      });
    });
  });
}