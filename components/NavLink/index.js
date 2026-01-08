import { useRouter } from "next/router";
import Link from "next/link";

const NavLink = ({ href, exact, children, ...props }) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " active";
  }

  return (
    <li>
      <Link href={href} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
