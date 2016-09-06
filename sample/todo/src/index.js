import React, {Component} from 'react'
import {render} from 'react-dom'
import {App, Shell, Page, IconTabBar, IconTabSeparator, IconTabFilter, List, ListItem} from '../../../src/sap/m'

const isDone = (todo) => todo.done
const isOpen = (todo) => !todo.done
const getTitle = (tab) => {
  switch (tab) {
    case 'OPEN': return 'Open'
    case 'DONE': return 'Done'
    default: return 'All Items'
  }
}
const byTab = (item, tab) => {
  if(tab === 'ALL') return true
  if(tab === 'DONE' && item.done) return true
  if(tab === 'OPEN' && !item.done) return true
  return false
}

class ToDo extends Component {
  constructor(props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
    this.handleDone = this.handleDone.bind(this)

    this.state = {
      tab: 'ALL',
      todos: [{
        id: 0,
        text: 'Test',
        done: true
      }]
    }
  }

  handleSelect(id) {
    this.setState({tab: id})
  }

  handleDone(id, done) {
    console.log('handler', done)
    this.state.todos.forEach((item) => {
      if(item.id === id) {
        item.done = done
        return
      }
    })
  }

  render() {
    const items = this.state.todos.filter(item => byTab(item, this.state.tab)).map(item => (
      <ListItem
        text={item.text}
        checked={item.done}
        key={item.id}
        onCheck={done => this.handleDone(item.id, done)}
      />
    ))

    return (
      <Shell>
        <Page title='To Do' >
          <IconTabBar
            selectedKey={this.state.tab}
            select={this.handleSelect}
          >
            <IconTabFilter
              key='ALL'
              count={this.state.todos.length}
              text='ToDos'
            />
            <IconTabSeparator />
            <IconTabFilter
              key='DONE'
              count={this.state.todos.filter(isDone).length}
              text='Done'
              icon='message-success'
              iconColor='Positive'
            />
            <IconTabFilter
              key='OPEN'
              count={this.state.todos.filter(isOpen).length}
              text='Open'
              icon='message-error'
              iconColor='Negative'
            />
          </IconTabBar>
          <List title={getTitle(this.state.tab)}>
            {items}
          </List>
        </Page>
      </Shell>
    )
  }
}

render(<ToDo />, document.getElementById('app-root'))
