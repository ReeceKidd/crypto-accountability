import type { NextPage } from "next";
import Layout from "../components/Layout/Layout";

const Home: NextPage = () => {
  return (
    <div>
      <title>Crypto accountability</title>
      <meta
        name="description"
        content="Stay accountability by betting crypto"
      />
      <Layout>
        <h1>Crypto accountability</h1>
        <h2>
          Stay accountable by betting crypto on the things you need to do.
        </h2>
      </Layout>
    </div>
  );
};

export default Home;
