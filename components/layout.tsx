import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.less"
import Footer from "./footer"

type Props = {
  title?: string,
  children: any,
}

const Layout: React.FC<Props> = ({ title, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          icpTxt
          copyleft
        }
      }
    }
  `)
  const pageTitle = (data.site.siteMetadata?.title || "Title") + (title ? " | " + title : "")

  return (
    <>
      <Header siteTitle={pageTitle} />
      <div className="layout">
        <main>{children}</main>
      </div>
      <Footer icpTxt={data.site.siteMetadata?.icpTxt || null} copyleft={data.site.siteMetadata?.copyleft || ``} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;