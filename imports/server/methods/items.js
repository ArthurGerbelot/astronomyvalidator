import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Item } from '../../lib/collections/items.js'

Future = Npm.require('fibers/future');

Meteor.methods({

  'items.insert'(item) {

    let future = new Future();

    item.validate({stopOnFirstError: false}, err => {
      if (err) {
        future.throw(err)
        return
      }
      item.save()
      future.return({
        success: true,
        item_id: item._id
      });
    })

    return future.wait()
  },
});