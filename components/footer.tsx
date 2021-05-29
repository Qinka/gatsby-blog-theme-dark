import * as React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import "./footer.less"

type FooterProps = {
  icpTxt?: string,
  copyleft: string,
}
const Footer = ({ icpTxt, copyleft }: FooterProps): React.ReactElement => {
  const icpInfo = icpTxt ? (<Link to="http://www.beian.miit.gov.cn/">{icpTxt}</Link>) : (<></>)
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {` `} {copyleft}</span><br />
      {icpInfo}
    </footer>
  )
}

Footer.prototype = {
  icpTxt: PropTypes.string,
  copyleft: PropTypes.string,
}

Footer.defaultProps = {
  icpTxt: ``,
  copyleft: ``,
}

export default Footer