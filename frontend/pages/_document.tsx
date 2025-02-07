import { Html, Head, Main, NextScript } from "next/document";
import { DocumentContext } from "next/document";
import Document, { DocumentInitialProps } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
