import React from 'react'
import Page from './components/Page'
import Button from './components/Button'

class Page1 extends React.Component {
  render() {
    return (
      <Page title='Hello World 1'>
        <Button onPress={() => this.context.router.push('/page2')}>
          To page 2
        </Button>
      </Page>
    )
  }
}

Page1.contextTypes = {
  router: React.PropTypes.object
}

export default Page1
