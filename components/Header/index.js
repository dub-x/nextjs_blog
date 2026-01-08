import { Container, Links, Wrapper } from "./Header.styles";
import Image from "next/image";
import NavLink from "../NavLink";
import Link from "next/link";

export default function Header() {
  return (
    <Container>
      <Wrapper>
        <Link href="/">
          <Image src="/assets/logo.png" width={50} height={50} />
        </Link>
        <Links>
          <NavLink href="/" exact>
            Home
          </NavLink>
          <NavLink href="/posts">Posts</NavLink>
          <NavLink href="/users">Users</NavLink>
        </Links>
      </Wrapper>
    </Container>
  );
}
