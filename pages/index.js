import Layout from "../components/Layout";

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/posts",
      permanent: false,
    },
  };
}

export default function Home() {
  return <Layout>Content</Layout>;
}
