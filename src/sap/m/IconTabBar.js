import React from 'react'

const IconTabBar = (props) => (
  <div className='sapMITB sapMITBBackgroundDesignSolid sapMITBNoContentPadding'>
    <div className='sapMITBNotScrollable sapMITH'>
      <div className='sapMITBScrollContainer'>
        <div className='sapMITBHead'>
          {props.children}
        </div>
      </div>
    </div>
  </div>
)

export {IconTabBar}
