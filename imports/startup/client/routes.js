import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import '../../ui/layout/layout-main'

FlowRouter.route('/', {
  name: 'App.Home',
  action() {
    BlazeLayout.render('LayoutMain', {main: 'HomePage'})
  }
})