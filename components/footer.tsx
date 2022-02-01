import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import "./footer.less"
import { StaticImage } from "gatsby-plugin-image"

type SponsorInfo = {
  url: string,
  pre?: string,
}

const Sponsor = ({ url, pre }: SponsorInfo): React.ReactElement => {

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: {eq: "sponsor-logo.png"}) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  return (
    <div className="sponsor">
      {pre !== undefined ? (<span className="prefix"> {pre} </span>) : (<></>)}
      <a href={url}><img alt="" src={data.file.childImageSharp.gatsbyImageData.images.fallback.src} /> </a>
    </div>
  )
}

type FooterProps = {
  icpTxt?: string,
  copyleft: string,
  sponsor?: SponsorInfo,
}

const Footer = ({ icpTxt, copyleft, sponsor }: FooterProps): React.ReactElement => {
  const icpInfo = icpTxt ? (<a className="icp-info" href="http://www.beian.miit.gov.cn/">{icpTxt}</a>) : (<></>)

  const sponsorPart = sponsor !== undefined ?
    (<Sponsor pre={sponsor.pre} url={sponsor.url} img={sponsor.img} />
    ) : (<></>)

  return (
    <footer className="footer">
      <div className="content">
        <span>© {new Date().getFullYear()} {` `} {copyleft}</span><br />
        {icpInfo}
        {sponsorPart}
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