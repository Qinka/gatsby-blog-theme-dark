import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Seo from './seo'
import { Helmet } from "react-helmet"
import "./layout.less"
import Footer from "./footer"

type Props = {
  title?: string,
  author?: string,
  children: any,
}

const Layout: React.FC<Props & React.HTMLProps<HTMLDivElement>> = ({ title, author, children, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          icpTxt
          copyleft
        }
      }
    }
  `)

  const pageTitle = title || ""
  return (
    <div className="frame">
      <Seo
        title={pageTitle}
        author={author}
      />
      <Header siteTitle={pageTitle} />
      <div className="layout">
        <main {...props}>{children}</main>
      </div>
      <Footer icpTxt={data.site.siteMetadata?.icpTxt || ``} copyleft={data.site.siteMetadata?.copyleft || ``} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout