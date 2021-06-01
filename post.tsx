import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "./components/layout"
import Seo from "./components/seo"
import FormatHtml from "./components/format-html"
import "./post.less"

type Post = {
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
  },
  pageContext: {
    slug: string,
    next: Post,
    previous: Post,
  },
}

const PostTemplate: React.FC<Props> = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout title={post.frontmatter.title} author={post.frontmatter.author}>
      <div className="post-container">
        <div className="post-head">
          <span className="post-title">
            {post.frontmatter.title}
          </span>
          <div className="post-info">
            <span className="post-auth">
              {post.frontmatter.author}
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
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
      }
    }
  }
`