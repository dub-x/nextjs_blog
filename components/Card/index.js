import { Container, Img, Title } from "./Card.styles";
import Link from "next/link";

const Card = ({ id, title }) => {
  return (
    <Link href={"/posts/[id]"} as={`/posts/${id}`}>
      <Container>
        <Img width={230} height={300} src="/assets/noimg.jpg" />
        <Title>{title}</Title>
      </Container>
    </Link>
  );
};

export default Card;
