import { client } from "apollo/client";
import {
  GetUserQuery,
  GetUserQueryVariables,
  GetUsersDocument,
  useGetUserQuery,
} from "@generated";
import { GetStaticProps } from "next";

type Props = {
  user: GetUserQuery["user"];
};

export default function Home({ user }: Props) {
  const { data } = useGetUserQuery();

  return (
    <div className="text-xl text-red-500">
      Data from hook : {JSON.stringify(data.user)}
      Data from nextjs props : {JSON.stringify(user)}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await client.query<GetUserQuery, GetUserQueryVariables>({
    query: GetUsersDocument,
    variables: { userId: "123" },
  });
  return { props: { user: data.user } };
};
