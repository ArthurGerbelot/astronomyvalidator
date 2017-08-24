import { Item } from '../../lib/collections/items.js'

Meteor.publish('items', function() {
  return Item.find({})
});