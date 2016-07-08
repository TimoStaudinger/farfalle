import React from 'react'
import classnames from 'classnames'

class Button extends React.Component {
  constructor(props) {
    super(props)

    this.setActive = this.setActive.bind(this)

    this.state={
      active: false
    }
  }

  setActive(active = true) {
    this.setState({active})
  }

  render() {
    const buttonClass = classnames('sapMBtnDefault sapMBtnHoverable sapMBtnInner sapMBtnText sapMFocusable', {
      sapMBtnActive: this.state.active
    })

    return (
      <button className='sapMBtn sapMBtnBase' onClick={this.props.onPress} onMouseDown={() => this.setActive()} onMouseUp={() => this.setActive(false)} onMouseOut={() => this.setActive(false)}>
        <div className={buttonClass}>
          <span className='sapMBtnContent'>{this.props.children}</span>
        </div>
      </button>
    )
  }
}

export default Button
