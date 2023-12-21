import Head from "next/head";

interface PageHeadProps {
  title: string;
  description: string;
}

export default function PageHead(props: PageHeadProps): JSX.Element {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
