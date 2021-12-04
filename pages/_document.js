import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,300,400,600,700&display=optional" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=optional" rel="stylesheet"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossOrigin="anonymous"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;