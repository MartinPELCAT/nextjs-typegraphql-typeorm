import { client } from "apollo/client";
import {
  GetUserQuery,
  GetUserQueryVariables,
  GetUsersDocument,
  useGetUserQuery,
} from "apollo/__generated__";
import { GetStaticProps } from "next";

type Props = {
  user: GetUserQuery["user"];
};

export default function Home({ user }: Props) {
  const { data } = useGetUserQuery();
  console.log(data);
  console.log(user.firstName);

  return <div className="text-xl text-red-500">Hello</div>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await client.query<GetUserQuery, GetUserQueryVariables>({
    query: GetUsersDocument,
    variables: { userId: "123" },
  });
  return { props: { user: data.user } };
};
