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
      <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
    </>;
  } else {
    return <Error statusCode={404} />;
  }
};

export default Post;