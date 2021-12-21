import React, { memo } from "react";
import {
  Box,
  Flex,
  Typography,
  Main,
  Layout,
  HeaderLayout,
  ContentLayout,
  EmptyStateLayout,
} from "@strapi/design-system";
import { Helmet } from "react-helmet";
import pluginPkg from "../../../../package.json";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import PluginIcon from "../../components/PluginIcon";
import { useDeployments } from "../../hooks";
import {
  DeploymentLast,
  DeploymentList,
  StagingSiteUrl,
  ProductionSiteUrl,
  DeployButton,
} from "../../components";

const HomePage = () => {
  const { error, isLoading, deployments: allDeployments } = useDeployments();
  const [latestDeploy, ...deployments] = allDeployments;
  const title = pluginPkg.strapi.displayName;
  const description = pluginPkg.strapi.description;

  return (
    <Layout>
      <Helmet title={title} />
      <Main aria-busy={isLoading}>
        <HeaderLayout
          title={title}
          subtitle={description}
          primaryAction={
            <Flex justifyContent="flex-end">
              {/* TODO - Improve by adding permissions like:
              <CheckPermissions permissions={permissions.open}>
              SEE /cms/node_modules/@strapi/plugin-documentation/admin/src/pages/PluginPage/index.js */}
              <DeployButton
                variant="secondary"
                to="staging"
                startIcon={<PluginIcon />}
                style={{ marginRight: "1rem" }}
              />
              <DeployButton to="production" startIcon={<PluginIcon />} />
            </Flex>
          }
        />
        <ContentLayout>
          {isLoading ? (
            <LoadingIndicatorPage>Plugin is loading</LoadingIndicatorPage>
          ) : deployments?.length !== 0 && !isLoading && !error ? (
            <>
              <Box paddingBottom={5}>
                <Typography>
                  Each time you update content, you will need to re-deploy the
                  website. This is necessary so that we can optimise it
                  dynamically on the go.
                </Typography>
              </Box>
              <Box paddingBottom={3}>
                <Typography>
                  There are two links below that always show the latest versions
                  of your website. You can also view previous deployments on the
                  list below. Production is the live website and staging is a
                  preview version.
                </Typography>
              </Box>
              <Box paddingBottom={3}>
                <Typography>
                  Each deploy will take a few minutes to build depending on the
                  size of the website. If there is an error on your deploy we
                  will be notified.
                </Typography>
              </Box>
              <Box paddingBottom={3}>
                <Typography
                  as="p"
                  variant="sigma"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Staging: <StagingSiteUrl />
                </Typography>
                <Typography
                  as="p"
                  variant="sigma"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Production: <ProductionSiteUrl />
                </Typography>
              </Box>

              <DeploymentLast deployment={latestDeploy} />
              <DeploymentList deployments={deployments} />
            </>
          ) : (
            <EmptyStateLayout content="There was an error fetching your latest deploys" />
          )}
        </ContentLayout>
      </Main>
    </Layout>
  );
};

export default memo(HomePage);
