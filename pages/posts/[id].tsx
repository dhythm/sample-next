import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import path from 'path';
import Date from '../../components/Date';
import Layout from '../../components/Layout';
import utilStyles from '../../styles/utils.module.css';

const postsDirectory = path.join(process.cwd(), 'posts');

export default function Post() {
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
        {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
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

export const getStaticProps: GetStaticProps<{ id: any }> = async ({
  params,
}) => {
  // ...
  console.log({ params });
  return {
    props: {
      id: params.id as string,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ...
// };
