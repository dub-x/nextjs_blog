import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import Grid from "../../components/Grid";
import Card from "../../components/Card";
import Search from "../../components/Search";
import Loader from "../../components/Loader";

import { Container, Wrapper } from "../../styles/Posts.styles";
import API from "../../API";
import useFetch from "../../hooks/useFetch";

export default function Index(props) {
  const {
    scrollHandler,
    data: posts,
    fetching,
    setSearchTerm,
  } = useFetch(props.page, props.posts, props.totalCount, "posts");

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, [scrollHandler]);

  return (
    <Layout>
      <Container>
        <Search setSearchTerm={setSearchTerm} />
        <Grid>
          {posts?.map((post) => (
            <Card key={post.id} id={post.id} title={post.title} />
          ))}
        </Grid>
        <Wrapper>{fetching && <Loader />}</Wrapper>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  let data = [],
    totalCount = 0,
    page = 1;
  await API.getData("posts", page).then((res) => {
    page += 1;
    totalCount = +res.headers["x-total-count"];
    data = res.data;
  });
  return {
    props: {
      posts: data,
      totalCount,
      page,
    },
  };
};
