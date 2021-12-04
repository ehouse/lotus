
import type { NextPage } from 'next';
import Head from 'next/head';
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
    return <>
      <Head>
        <title>{BlogSideCar[id as PostTitle].Title}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: BlogContent[id as PostTitle] }}></div>
    </>;
  }

  return <div />;
};

export default Post;