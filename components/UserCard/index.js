import { Container } from "./UserCard.styles";
import Link from "next/link";

const UserCard = ({ user }) => {
  return (
    <Link href={"/users/[id]"} as={`/users/${user.id}`}>
      <Container>
        <h3>{user.name}</h3>
        <p>
          <span>{user.phone}</span>
          <span>{user.email}</span>
        </p>
      </Container>
    </Link>
  );
};

export default UserCard;
