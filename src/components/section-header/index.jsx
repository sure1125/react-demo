import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { HeaderWrapper } from './style'
import { useNavigate } from 'react-router-dom'
const SectionHeader = memo((props) => {
  const { title, subtitle } = props
  const navigate = useNavigate()
  function moreClickHandle() {
    navigate("/entire")
  }
  return (
    <HeaderWrapper>
      <h2 className='title' onClick={moreClickHandle}>{title}</h2>
      {subtitle && <div className='subtitle'>{subtitle}</div>}
    </HeaderWrapper>
  )
})

SectionHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default SectionHeader