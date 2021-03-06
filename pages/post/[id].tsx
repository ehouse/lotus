import type { NextPage } from 'next';
import Head from 'next/head';
import Error from 'next/error';

import { useRouter } from 'next/router';
import JSONContent from '../../dest/content.json';
import JSONSidecar from '../../dest/sidecar.json';
import type { IJSONContent, IJSONSidecar } from '../../types';

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Recast to lose specific JSON type inports
  const blogContent: IJSONContent = JSONContent;
  const blogSidecar: IJSONSidecar = JSONSidecar;

  if (typeof id === 'string') {

    // Return 404 if post does not exist
    if (blogSidecar[id] === undefined) {
      return <Error statusCode={404} />;
    }

    const postTitle = blogSidecar[id].Title;
    const postAuthor = blogSidecar[id].Author;
    const postContent = blogContent[id];

    return <>
      <Head>
        <title>{postTitle}</title>
        <meta name="author" content={postAuthor} />
      </Head>
      <section className="section">
        <div className="content">
          <div className="text-center">
            <h1>👋 Hello world!</h1>
            <h6 className="font-alt font-light">A webpage powered by <b>Cirrus.</b></h6>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
      </section>
    </>;
  } else {
    return <Error statusCode={404} />;
  }
};

export default Post;