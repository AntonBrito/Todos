import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './task.html';

// Adding event handlers for Task buttons
Template.task.events({
    'click .toggle-checked'() {
        // Tasks.update(this_.id, {
        //     $set: { checked: ! this.checked },
        // });
        // set the checked property to the opposite of ita current value
        Meteor.call('tasks.setChecked', this._id, !this.checked);
    },
    'click .delete'() {
        // Tasks.remove(this._id);
        Meteor.call('tasks.remove', this._id);
    },
});