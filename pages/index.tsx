import { client } from "apollo/client";
import {
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
  useGetUserQuery,
} from "@generated";
import { GetStaticProps } from "next";

type Props = {
  user: GetUserQuery["user"];
};

export default function Home({ user }: Props) {
  const { data, loading } = useGetUserQuery({ variables: { userId: "123" } });

  return (
    <div className="text-xl text-red-500">
      Data from hook : {!loading && JSON.stringify(data.user)}
      <br />
      Data from nextjs props : {JSON.stringify(user)}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await client.query<GetUserQuery, GetUserQueryVariables>({
    query: GetUserDocument,
    variables: { userId: "123" },
  });

  return { props: { user: data.user } };
};
