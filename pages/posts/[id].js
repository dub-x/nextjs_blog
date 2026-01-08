import {
  Comment,
  CommentsBlock,
  Container,
  Description,
  Name,
  Text,
  Title,
} from "../../styles/Post.styles";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import API from "../../API";

export default function Post({ post, user }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
    API.getComments(post.id).then((res) => setComments(res.data));
  }, []);
  return (
    <Layout>
      <Container>
        <Title image="/assets/noimg.jpg">{post.title}</Title>
        <span>
          Created by user:{" "}
          <Link href={"/users/[id]"} as={`/users/${user.id}`}>
            {user.name}
          </Link>
        </span>
        <Description>{post.body}</Description>

        {comments[0] && (
          <CommentsBlock>
            {comments.map((comment) => (
              <Comment key={comment.id}>
                <Link href={"/users/[id]"} as={`/users/${comment.id}`}>
                  <Name>{comment.email}</Name>
                </Link>
                <Text>{comment.body}</Text>
              </Comment>
            ))}
          </CommentsBlock>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const paths = await API.getPaths("posts").then((res) =>
    res.data.map(({ id }) => ({ params: { id: `${id}` } }))
  );
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await API.getCurrentData("posts", params.id).then(
    (res) => res.data
  );
  const user = await API.getCurrentData("users", post.userId).then(
    (res) => res.data
  );

  if (!post.userId)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: { post, user },
    revalidate: 3600,
  };
};
