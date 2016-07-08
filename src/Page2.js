import React from 'react'
import Page from './components/Page'

class Page2 extends React.Component {
  render() {
    return (
      <Page
        title='Hello World 2'
        showNavButton={true}
        navButtonPress={() => this.context.router.push('/')}
      />
    )
  }
}

Page2.contextTypes = {
  router: React.PropTypes.object
}

export default Page2
