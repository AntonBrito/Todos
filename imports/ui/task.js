import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';
// Adding event handlers for Task buttons
Template.task.events({
    'click .toggle-checked'() {
        //set the checked property to the opposite of ita current value
        Tasks.update(this_.id, {
            $set: { checked: ! this.checked },
        });
    },
    'click .delete'() {
        Tasks.remove(this._id);
    },
});