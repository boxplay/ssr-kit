import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MallDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            href="https://img.kaikeba.com/kkb_portal_icon.ico"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MallDocument;
