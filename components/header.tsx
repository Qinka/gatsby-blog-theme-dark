import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import { StaticImage } from "gatsby-plugin-image"
import "./header.less"

type HeaderProps = {
  siteTitle: string
}

type NavItem = {
  url: string,
  title: string
}

type Nav = {
  site: {
    siteMetadata: {
      nav: Array<NavItem>,
    }
  }
}

const Header = ({ siteTitle }: HeaderProps): React.ReactElement => {
  const data: Nav = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          nav {
            url
            title
          }
        }
      }
    }
  `)

  const nav = data.site.siteMetadata.nav
    .map((v) => (<li>
      <Link to={v.url} > {v.title} </Link>
    </li>))

  return (
    <header className="header">
      <div className="title">
        <h1>
          <Link to="/" > {siteTitle} </Link>
        </h1>
      </div>
      <div className="nav">
        <nav>
          <ul>
            {nav}
          </ul>
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
