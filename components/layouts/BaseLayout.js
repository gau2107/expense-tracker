import Header from "components/shared/Header";
import Head from "next/head";
import React from "react";

export default function BaseLayout(props) {
  const { title, cannonical, children, user } = props;
  return (
    <>
      <Head>
        <title>{title || "Expense Tracker"}</title>
        <meta
          name="description"
          content="Web application to track and manage your expenses."
        />
        <meta name="keywords" content="track, expenses, monthly expenses" />
        <meta property="og:title" content="Expense Tracker" />
        <meta property="og:locale" content="en_EU" />
        {/* <meta property="og:url" content={`${process.env.BASE_URL}`} /> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Web application to track and manage your expenses."
        />
        {cannonical && (
          <link
            rel="cannonical"
            href={`${process.env.BASE_URL}${cannonical}`}
          />
        )}
        <link rel="icon" type="image/ico" href="/favicon/favicon-32x32.png" />
      </Head>
      <Header user={user} />
      <main>
        <div className="lg:container lg:mx-auto mx-2">{children}</div>
      </main>
    </>
  );
}
