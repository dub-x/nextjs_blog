import {
  AddressContainer,
  CommonInfo,
  Container,
  Name,
  Photo,
} from "../../styles/User.styles";
import Layout from "../../components/Layout";
import Image from "next/image";
import API from "../../API";

export default function User({ user }) {
  return (
    <Layout>
      <Container>
        <Photo>
          {/*<Image src={user.img.url.replace('https://via.placeholder.com', '')} width={300} height={300}/>*/}
        </Photo>
        <Name>
          {user?.name} <span>{user.username}</span>
        </Name>
        <CommonInfo>
          <p>
            Email: <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
          <p>
            Site:{" "}
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
          </p>
          <p>
            Phone: <a href={`tel:${user.phone}`}>{user.phone}</a>
          </p>
        </CommonInfo>
        <AddressContainer>
          <li>Street: {user.address.street}</li>
          <li>Suite: {user.address.suite}</li>
          <li>City: {user.address.city}</li>
          <li>Zipcode: {user.address.zipcode}</li>
        </AddressContainer>
      </Container>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const paths = await API.getPaths("users").then((res) =>
    res.data.map(({ id }) => ({ params: { id: `${id}` } }))
  );
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { img, data } = await API.getCurrentData("users", params.id);
  return {
    props: { user: { ...data, img: { ...img } } },
  };
};
