import React, { ReactNode } from 'react';

type Props = {
  content: any;
}

const FormatHtml: React.FC<Props> = ({ content }) => (
  <span
    className="format-html"
    dangerouslySetInnerHTML={{
      __html: content
    }}
  />
);

export default FormatHtml