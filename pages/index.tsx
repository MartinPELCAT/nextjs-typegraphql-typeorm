import { gql, useQuery } from "@apollo/client";
import { client } from "apollo/client";
import { GetStaticProps } from "next";

type Props = {
  users: any[];
};

const QUERY = gql`
  query getUsers {
    users {
      firstName
    }
  }
`;

export default function Home({ users }: Props) {
  const { data } = useQuery(QUERY);
  console.log(data);
  console.log(users);

  return <div className="text-xl text-red-500">Hello</div>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await client.query({
    query: QUERY,
  });
  return { props: { users: [...data.users, { userName: "Martin" }] } };
};
