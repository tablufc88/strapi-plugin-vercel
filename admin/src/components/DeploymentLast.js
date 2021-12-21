import React from "react";
import { format, formatDistance } from "date-fns";
import { Box, Flex, Link, Loader, Typography } from "@strapi/design-system";
import StatusWrapper from "./StatusWrapper";
import { useDeployment } from "../hooks";
import styled, { useTheme } from "styled-components";

const ImageWrapper = styled.div`
  ${() => {
    const theme = useTheme();
    // console.log(theme);
    return `
    width: 400px;
    height: 250px;
    display: block;
    background-color: ${theme.colors.neutral500};
`;
  }}
`;

const ErrorBox = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.5em;
  height: 100%;
  padding: 1.5em;
`;

/**
 * Display the last deployment
 *
 * @param {*} props
 * @returns The last deployment along with a screenshot of it etc.
 */
const DeploymentLast = ({ deployment: deploy }) => {
  if (!deploy) return <Box>No last deployment found</Box>;

  const { error, isLoading, deployment } = useDeployment({ id: deploy.uid });

  if (isLoading) {
    return (
      <Box padded={5}>
        <Loader small>Loading...</Loader>
      </Box>
    );
  }

  if (error) {
    return <Box>Error occured during fetching last deployment</Box>;
  }

  return (
    <Box>
      <Flex alignItems="center">
        <Box paddingBottom={5} paddingRight={5}>
          <ImageWrapper>
            {deployment.readyState === "READY" ? (
              <a href={`https://${deployment.url}`} target="_blank">
                <img
                  height="250"
                  title={deployment.url}
                  alt={deployment.url}
                  src={`https://api.microlink.io?url=https://${deployment.url}&screenshot=true&meta=false&embed=screenshot.url`}
                />
              </a>
            ) : deployment.readyState === "ERROR" ? (
              <ErrorBox>
                Error with deployment. Don't worry, the latest working version
                will always be shown. Try deploying again.
              </ErrorBox>
            ) : (
              <ErrorBox>Waiting for deployment to finish...</ErrorBox>
            )}
          </ImageWrapper>
        </Box>
        <Box paddingBottom={5}>
          <Box paddingBottom={3}>
            <Typography as="p" fontWeight="bold">
              DOMAIN
            </Typography>
            <Link href={`https://${deployment.alias[0]}`}>
              {deployment.alias[0]}
            </Link>
          </Box>
          <Box paddingBottom={3}>
            <Typography as="p" fontWeight="bold">
              STATE
            </Typography>
            <Typography as="p" variant="sigma">
              <StatusWrapper state={deployment.readyState}>
                {deployment.readyState}
              </StatusWrapper>
            </Typography>
            <Typography as="p" variant="sigma">
              {deployment.readyState === "READY" &&
                ` (${formatDistance(new Date(deployment.ready), new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                })})`}
            </Typography>
          </Box>
          <Box paddingBottom={3}>
            <Typography as="p" fontWeight="bold">
              CREATED
            </Typography>
            <Typography as="p" variant="sigma">
              {format(new Date(deployment.createdAt), "dd/MM/yyyy")}
            </Typography>
          </Box>
          <Box paddingBottom={3}>
            <Typography as="p" fontWeight="bold">
              TARGET
            </Typography>
            <Typography as="p" variant="sigma">
              {deployment.target || deployment.gitSource.ref}
            </Typography>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default DeploymentLast;
