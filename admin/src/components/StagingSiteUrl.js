import React from "react";
import { Loader, Link, Typography } from "@strapi/design-system";
import { useStagingSiteUrl } from "../hooks";

const StagingSiteUrl = () => {
  const { error, isLoading, stagingSiteUrl } = useStagingSiteUrl();

  if (isLoading) {
    return <Loader small>Loading...</Loader>;
  }

  if (error) {
    return (
      <Typography>
        Error occured whilst fetching the staging site url
      </Typography>
    );
  }

  return (
    <Typography>
      <Link href={stagingSiteUrl}>{stagingSiteUrl}</Link>
    </Typography>
  );
};

export default StagingSiteUrl;
