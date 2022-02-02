import * as React from "react"
import PropTypes from "prop-types"
import "./footer.less"

import UpyunLogo from "../../images/upyun-logo.png"


type FooterProps = {
  icpTxt: string,
  copyleft: string,
}

const Footer = ({ icpTxt, copyleft }: FooterProps): React.ReactElement => {
  const icpInfo = icpTxt !== "" ? (<a className="icp-info" href="http://www.beian.miit.gov.cn/">{icpTxt}</a>) : (<></>)

  return (
    <footer className="footer">
      <div className="content">
        <span>© {new Date().getFullYear()} {` `} {copyleft}</span><br />
        {icpInfo}
        <div className="sponsor">
          <span className="prefix"> CDN via </span>
          <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral">
            <img src={UpyunLogo} alt="Up Yun" />
          </a>
        </div>
      </div>
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