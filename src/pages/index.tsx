/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Helmet } from 'react-helmet';
import { Layout } from '../components/Layout';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

const HomePage = () => {
  const { title } = useSiteMetadata();

  return (
    <Layout>
      <Helmet title={title} />
      Home page
    </Layout>
  );
};

export default HomePage;
