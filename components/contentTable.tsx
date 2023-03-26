import "./contentTable.less"
import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"


type Props = {
  allMarkdownRemark: {
    edges: Array<Post>,
  },
  site: {
    siteMetadata: {
      author: string
    }
  }
}

type Post = {
  node: {
    id: string,
    frontmatter: {
      title: string,
      author: string,
      date: string,
      path: string,
    },
    parent: {
      relativePath: string
    }
  },
}

const ContentTable = (): React.ReactElement => {
  const data: Props = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          author
        }
      }
      allMarkdownRemark(
        filter: { fields: { draft: { eq: false } } }
        sort: { frontmatter: {date: DESC }}
      ) {
        edges {
          node {
            parent {
              ... on File {
                relativePath
              }
            }
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              path
              author
            }
          }
        }
      }
    }
  `
)

  const posts = data.allMarkdownRemark.edges

  return (
    <section className="blog-posts">
      <span className="post-title">Posts</span>
      <ul className="post-list">
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node }) => {
            const author = node.frontmatter.author || data.site.siteMetadata.author
            const path = node.frontmatter.path || `/post/${node.parent.relativePath.replace(/\.md$/, "")}`
            return (
              <li key={node.id} className="post-item">
                <div className='item-info'>
                  <span className="item-time">
                    {node.frontmatter.date}
                  </span>
                  <span className="item-author">
                    {author}
                  </span>
                </div>
                <span className="item-title">
                  <Link to={path}>{node.frontmatter.title}</Link>
                </span>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}


export default ContentTable;