import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  postData: string;
};

export default function Post({ postData }: Props) {
  return <div>{JSON.stringify(postData)}</div>;
}

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  return {
    props: {
      postData: params.id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
