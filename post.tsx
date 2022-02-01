import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "./components/layout"
import Seo from "./components/seo"
import FormatHtml from "./components/format-html"

import "./post.less"

type Post = {
  id: string,
  html: React.ReactNode,
  fields: {
    slug: string,
  },
  frontmatter: {
    title: string,
    author: string,
    date: string,
  },
}

type Props = {
  data: {
    markdownRemark: Post,
    site: {
      siteMetadata: {
        author: string
      }
    }
  },
  pageContext: {
    slug: string,
    next: Post,
    previous: Post,
  },
}

const PostTemplate: React.FC<Props> = ({ data }) => {
  // console.log({data})
  const post = data.markdownRemark
  const author = post.frontmatter.author || data.site.siteMetadata.author
  return (
    <Layout title={post.frontmatter.title} author={author}>
      <div className="post-container">
        <div className="post-head">
          <span className="post-title">
            {post.frontmatter.title}
          </span>
          <div className="post-info">
            <span className="post-auth">
              {author}
            </span>
            <span> | </span>
            <span>
              {post.frontmatter.date}
            </span>
          </div>
        </div>
        <FormatHtml content={post.html} />
      </div>
    </Layout>
  )
}


export default PostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($id: String!) {
    site {
      siteMetadata {
        author
      }
    }
    markdownRemark(id: {eq: $id }) {
      html
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
      }
    }
  }
`