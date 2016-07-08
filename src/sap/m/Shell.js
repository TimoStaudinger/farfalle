import React, {PropTypes} from 'react'

const Shell = (props) => (
  <div className='sapMShell sapMShellAppWidthLimited sapMShellGlobalOuterBackground'>
    <div className='sapMShellBG sapUiGlobalBackgroundImage sapUiGlobalBackgroundImageForce' />
    <div className='sapMShellBrandingBar' />

    <div className='sapMShellCentralBox'>
      <section className='sapMShellContent sapMShellGlobalInnerBackground'>
        {props.children}
      </section>
    </div>
  </div>
)

Shell.propTypes = {
  children: PropTypes.node
}
Shell.initialProps = {
  children: null
}

export {Shell}
