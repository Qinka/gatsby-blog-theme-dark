import "./contentTable.less"
import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"


type Props = {
  allMarkdownRemark: {
    edges: Array<Post>,
  }
}

type Post = {
  node: {
    id: string,
    excerpt: string,
    frontmatter: {
      title: string,
      author: string,
      date: string,
      path: string,
    },
  },
}

const ContentTable = (): React.ReactElement => {
  const data: Props = useStaticQuery(graphql`
      query IndexQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              excerpt(pruneLength: 250)
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
            return (
              <li className="post-item">
                <div className='item-info'>
                  <span className="item-time">
                    {node.frontmatter.date}
                  </span>
                  <span className="item-author">
                    {node.frontmatter.author}
                  </span>
                </div>
                <span className="item-title">
                  <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
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