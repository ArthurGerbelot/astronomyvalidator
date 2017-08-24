import { Class } from 'meteor/jagi:astronomy'

const Items = new Mongo.Collection('items')
const Item = Class.create({
  name: 'Item',
  collection: Items,
  fields: {
    // Name
    name: {
      type: String,
    },

    // Size
    width: {
      type: Number,
      validator: [
        {type: 'gt', param: 0}
      ],
      optional: true
    },
  }
})

export { Item }