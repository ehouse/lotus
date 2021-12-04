
import type { NextPage } from 'next';
import Head from 'next/head';
import Error from 'next/error';

import { useRouter } from 'next/router';
import BlogContent from '../../dest/content.json';
import BlogSideCar from '../../dest/sidecar.json';

type PostTitle = keyof typeof BlogContent;

type PostContent = Record<PostTitle, string>;

interface PostMetadata {
  Title: string;
  Author: string;
  Date: string;
}

type Sidecar = Record<PostTitle, PostMetadata>;

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === 'string') {

    // TODO Resolve this awful type casting 
    if (BlogSideCar[id as PostTitle] === undefined) {
      return <Error statusCode={404} />;
    }

    const postTitleQuery = id as PostTitle;

    const postTitle = BlogSideCar[postTitleQuery].Title;
    const postContent = BlogContent[postTitleQuery];

    return <>
      <Head>
        <title>{postTitle}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
    </>;
  }

  return <div />;
};

export default Post;