import React from "react";
import { Loader, Link, Typography } from "@strapi/design-system";
import { useProductionSiteUrl } from "../hooks";

const ProductionSiteUrl = () => {
  const { error, isLoading, productionSiteUrl } = useProductionSiteUrl();

  if (isLoading) {
    return <Loader small>Loading...</Loader>;
  }

  if (error) {
    return <span>Error occured whilst fetching the production site url</span>;
  }

  return (
    <Typography>
      <Link href={productionSiteUrl}>{productionSiteUrl}</Link>
    </Typography>
  );
};

export default ProductionSiteUrl;
