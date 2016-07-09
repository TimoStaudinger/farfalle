import React from 'react'
import {Page, IconTabBar, IconTabSeparator, IconTabFilter} from './sap/m'

class Page2 extends React.Component {
  constructor(props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)

    this.state = {
      show: 'ALL'
    }
  }

  handleSelect(id) {
    this.setState({show: id})
  }

  render() {
    return (
      <Page
        title='Hello World 2'
        showNavButton={true}
        navButtonPress={() => this.context.router.push('/')}
      >
        <IconTabBar
          selectedKey={this.state.show}
          select={this.handleSelect}
        >
          <IconTabFilter
            key='ALL'
            count={14}
            text='Products'
          />
          <IconTabSeparator />
          <IconTabFilter
            key='PLENTY'
            count={8}
            text='Plenty in Stock'
            icon='message-success'
            iconColor='Positive'
          />
          <IconTabFilter
            key='CRITICAL'
            count={3}
            text='Shortage'
            icon='message-warning'
            iconColor='Critical'
          />
          <IconTabFilter
            key='OUT_OF_STOCK'
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
