import React from "react";
import { formatDistance } from "date-fns";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Typography,
  Link,
} from "@strapi/design-system";
import StatusWrapper from "./StatusWrapper";

/**
 * Display a list of deployments
 *
 * @param {*} props
 * @returns List of deployment data apart from the last which is handled with DeploymentLast
 */
const DeploymentList = ({ deployments }) => {
  if (!deployments || deployments.length === 0) {
    return (
      <Box padded={5}>
        <Typography>No deployments yet.</Typography>
      </Box>
    );
  }

  const headerItems = ["Date", "URL", "State", "Target"];
  return (
    <Box padded={5}>
      <Table rowCount={deployments.length} colCount={4}>
        <Thead>
          <Tr>
            {headerItems.map((item) => (
              <Th key={item}>
                <Typography variant="sigma">{item}</Typography>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {deployments.map((deployment) => {
            const { uid, created, url, state, target } = deployment;
            return (
              <Tr key={uid}>
                <Td>
                  <Typography variant="pi">
                    {formatDistance(new Date(created), new Date(), {
                      includeSeconds: true,
                      addSuffix: true,
                    })}
                  </Typography>
                </Td>
                <Td>
                  <Link href={`https://${url}`}>{url}</Link>
                </Td>
                <Td>
                  <Typography variant="pi">
                    <StatusWrapper state={state}>{state}</StatusWrapper>
                  </Typography>
                </Td>
                <Td>
                  <Typography variant="pi">
                    {target ? target : "staging"}
                  </Typography>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DeploymentList;
