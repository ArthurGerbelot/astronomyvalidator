import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Item } from '../../../lib/collections/items.js'

import './home-page.html';


Template.HomePage.onCreated(function() {
  let instance = this

  instance.item = new ReactiveVar(new Item({}))
  instance.errors = new ReactiveVar({})
})
Template.HomePage.helpers({
  hasError(key) {
    let errors = Template.instance().errors.get()
    return !!_.findWhere(errors, {name: key})
  },
  getError(key) {
    let errors = Template.instance().errors.get()
    return _.findWhere(errors, {name: key}).message
  },
})
Template.HomePage.events({
  'change .item-field'(e, instance) {
    let item = instance.item.get()

    let name = e.currentTarget.name
    let value = e.currentTarget.value

    item.set(name, (name === 'width') ? parseInt(value) : value)

    instance.item.set(item)
  },
  'submit form'(e, instance) {
    e.preventDefault()

    let item = instance.item.get()
    instance.errors.set([])

    console.log("Insert", item)

    item.validate({stopOnFirstError: false}, err => {
      if (err) {
        console.log("ERROR", err.details)
        instance.errors.set(err.details)
        return
      }
      Meteor.call('items.insert', item, function(err, result) {
        if (err) {
          return console.warn(err)
        }
        console.log("Result: ", result)
      })
    })


  }
})