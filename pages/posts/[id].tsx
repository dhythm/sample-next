import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import remark from 'remark';
import html from 'remark-html';
import Date from '../../components/Date';
import Layout from '../../components/Layout';
import utilStyles from '../../styles/utils.module.css';

const postsDirectory = path.join(process.cwd(), 'posts');

interface Props {
  postData: any;
}

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <Head>
        <title>Awesome Next with TypeScript</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>Awesome Next with TypeScript</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={'2020-06-27'} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const paths = fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as ParsedUrlQuery;
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      postData: {
        id: id as string,
        contentHtml,
        ...matterResult.data,
      },
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ...
// };
