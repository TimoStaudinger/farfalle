import React from 'react'
import {Page, IconTabBar, IconTabSeparator, IconTabFilter} from './sap/m'

class Page2 extends React.Component {
  constructor(props) {
    super(props)

    this.show = this.show.bind(this)

    this.state = {
      show: 'ALL'
    }
  }

  show(id) {
    this.setState({show: id})
  }

  render() {
    return (
      <Page
        title='Hello World 2'
        showNavButton={true}
        navButtonPress={() => this.context.router.push('/')}
      >
        <IconTabBar>
          <IconTabFilter
            onPress={() => this.show('ALL')}
            selected={this.state.show === 'ALL'}
            count={14}
            text='Products'
          />
          <IconTabSeparator />
          <IconTabFilter
            onPress={() => this.show('PLENTY')}
            selected={this.state.show === 'PLENTY'}
            count={8}
            text='Plenty in Stock'
            icon='message-success'
            iconColor='Positive'
          />
          <IconTabFilter
            onPress={() => this.show('CRITICAL')}
            selected={this.state.show === 'CRITICAL'}
            count={3}
            text='Shortage'
            icon='message-warning'
            iconColor='Critical'
          />
          <IconTabFilter
            onPress={() => this.show('OUT_OF_STOCK')}
            selected={this.state.show === 'OUT_OF_STOCK'}
            count={3}
            text='Out of Stock'
            icon='message-error'
            iconColor='Negative'
          />
        </IconTabBar>
      </Page>
    )
  }
}

Page2.contextTypes = {
  router: React.PropTypes.object
}

export default Page2
