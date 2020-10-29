import { gql, useQuery } from "@apollo/client";
import { client } from "apollo/client";
import {
  GetUsersDocument,
  GetUsersQuery,
  useGetUsersQuery,
} from "apollo/__generated__";
import { GetStaticProps } from "next";

type Props = {
  users: any[];
};

export default function Home({ users }: Props) {
  const { data } = useGetUsersQuery();
  console.log(data);
  console.log(users);

  return <div className="text-xl text-red-500">Hello</div>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await client.query<GetUsersQuery>({
    query: GetUsersDocument,
  });
  return { props: { users: [...data.users, { userName: "Martin" }] } };
};
