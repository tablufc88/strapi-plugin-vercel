import React, { useState, useEffect } from "react";
import { request } from "strapi-helper-plugin";
import { Table, Padded, Flex, Button } from "@buffetjs/core";
import { LoadingBar } from "@buffetjs/styles";
import { format, formatDistance } from "date-fns";
import { Block, StatusWrapper, P } from "../../components";

/**
 * Deployments
 *
 * @returns Last deployment then a list of previous deployments
 */
export default function Deployments() {
  const { error, isLoading, deployments: allDeployment } = useDeployments();

  if (isLoading) {
    return (
      <Padded bottom size="md">
        <LoadingBar />
      </Padded>
    );
  }

  if (error) return <Block>Error occured during fetching deployments</Block>;

  const [latestDeploy, ...deployments] = allDeployment;

  return (
    <>
      <Block>
        <h3>Deploying</h3>
        <P>
          Each time you update content, you will need to re-deploy the website.
          This is necessary so that we can optimise it dynamically on the go.
        </P>
        <P>
          There are two links below which always show the latest versions of
          your website:
        </P>
        <div>
          <strong>Staging:</strong>
          <StagingSiteUrl />
        </div>
        <div>
          <strong>Production:</strong>
          <ProductionSiteUrl />
        </div>
        <P>
          Here you can deploy the website to either <strong>Staging</strong> or{" "}
          <strong>Production.</strong> Production is the live website and
          staging is a preview version.
        </P>
        <P>
          Each deploy will take a few minutes to build depending on the size of
          the website. If there is an error on your deploy we will be notified.
        </P>
        <hr />
        <Flex>
          <Refresh />
          <DeployStaging />
          <DeployProduction />
        </Flex>
      </Block>
      <DeploymentLast deployment={latestDeploy} />
      <DeploymentList deployments={deployments} />
    </>
  );
}

/**
 * Display the staging site url
 *
 * @returns The staging site URL in a tag
 */
const StagingSiteUrl = () => {
  const { error, isLoading, stagingSiteUrl } = useStagingSiteUrl();

  if (isLoading) {
    return <LoadingBar />;
  }

  if (error) {
    return <span>Error occured whilst fetching the staging site url</span>;
  }

  return (
    <P>
      <a href={stagingSiteUrl} target="_blank">
        {stagingSiteUrl}
      </a>
    </P>
  );
};

/**
 * Display the staging site url
 *
 * @returns The production site URL in a tag
 */
const ProductionSiteUrl = () => {
  const { error, isLoading, productionSiteUrl } = useProductionSiteUrl();

  if (isLoading) {
    return <LoadingBar />;
  }

  if (error) {
    return <span>Error occured whilst fetching the production site url</span>;
  }

  return (
    <P>
      <a href={productionSiteUrl} target="_blank">
        {productionSiteUrl}
      </a>
    </P>
  );
};

/**
 * Display a list of deployments
 *
 * @param {*} props
 * @returns List of deployment data apart from the last which is handled with DeploymentLast
 */
const DeploymentList = ({ deployments }) => {
  if (!deployments || deployments.length === 0) {
    return (
      <Padded bottom size="md">
        <p>No deployments yet.</p>
      </Padded>
    );
  }

  const headers = [
    {
      name: "Date",
      value: "created",
      cellFormatter(name, row) {
        return formatDistance(new Date(row.created), new Date(), {
          includeSeconds: true,
          addSuffix: true,
        });
      },
    },
    {
      name: "URL",
      value: "url",
      cellAdapter(row) {
        return (
          <a href={`https://${row.url}`} target="_blank">
            {row.url}
          </a>
        );
      },
    },
    {
      name: "State",
      value: "state",
      cellAdapter(row) {
        return <StatusWrapper state={row.state}>{row.state}</StatusWrapper>;
      },
    },
    {
      name: "Target",
      value: "target",
      cellAdapter(row) {
        return row.target ? row.target : "staging";
      },
    },
  ];

  return (
    <>
      <Padded bottom size="md">
        <Table
          headers={headers}
          rows={deployments}
          onClickRow={(e, data) => {
            window.open(`https://${data.url}`, "_blank");
          }}
        />
      </Padded>
    </>
  );
};

/**
 * Display the last deployment
 *
 * @param {*} props
 * @returns The last deployment along with a screenshot of it etc.
 */
const DeploymentLast = ({ deployment: deploy }) => {
  if (!deploy) return <Block>No last deployment found</Block>;

  const { error, isLoading, deployment } = useDeployment({ id: deploy.uid });

  if (isLoading) {
    return (
      <Padded bottom size="md">
        <LoadingBar />
      </Padded>
    );
  }

  if (error) {
    return <Block>Error occured during fetching last deployment</Block>;
  }

  return (
    <Block>
      <Flex alignItems="center">
        <div className="mr-4">
          {deployment.readyState === "READY" ? (
            <a
              href={`https://${deployment.url}`}
              target="_blank"
              style={{ width: "400px", height: "250px", display: "block" }}
            >
              <img
                height="250"
                title={deployment.url}
                alt={deployment.url}
                src={`https://api.microlink.io?url=https://${deployment.url}&screenshot=true&meta=false&embed=screenshot.url`}
              />
            </a>
          ) : (
            <div className="waiting">Waiting for deployment to finish...</div>
          )}
        </div>
        <div>
          <div className="mb-4">
            <div className="label">DOMAIN</div>
            <a href={deployment.alias[0]} target="_blank">
              {deployment.alias[0]}
            </a>
          </div>
          {/* <div className="mb-4">
            <div className="label">ALIASES</div>
            <div>
              {deployment.alias.map((alias) => (
                <div key={alias}>
                  <a href={`https://${alias}`} target="_blank">
                    {alias}
                  </a>
                </div>
              ))}
            </div>
          </div> */}
          <div className="mb-4">
            <div className="label">STATE</div>
            <div>
              <StatusWrapper state={deployment.readyState}>
                {deployment.readyState}
              </StatusWrapper>
              {deployment.readyState === "READY" &&
                ` (${formatDistance(new Date(deployment.ready), new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                })})`}
            </div>
          </div>
          <div className="mb-4">
            <div className="label">CREATED</div>
            {format(new Date(deployment.createdAt), "dd/MM/yyyy")}
          </div>
          <div>
            <div className="label">TARGET</div>
            <div>{deployment.target || deployment.gitSource.ref}</div>
          </div>
        </div>
      </Flex>
    </Block>
  );
};

/**
 * Deploy to staging
 */
const DeployStaging = () => {
  const [state, setState] = useState({
    loading: false,
  });

  const onClick = async () => {
    setState({ loading: true });
    try {
      const data = await request(`/vercel/deploy-staging`, {
        method: "POST",
      });
      return data;
    } catch (e) {
      strapi.notification.error("notification.error");
    }
    setImmediate(() => window.location.reload());
  };

  return (
    <Button
      color="success"
      type="submit"
      isLoading={state.loading}
      onClick={onClick}
      style={{ marginRight: "10px" }}
    >
      Deploy to staging
    </Button>
  );
};

/**
 * Deploy to production
 */
const DeployProduction = () => {
  const [state, setState] = useState({
    loading: false,
  });

  const onClick = async () => {
    setState({ loading: true });
    try {
      const data = await request(`/vercel/deploy-production`, {
        method: "POST",
      });
      return data;
    } catch (e) {
      strapi.notification.error("notification.error");
    }
    setImmediate(() => window.location.reload());
  };

  return (
    <Button
      color="success"
      type="submit"
      isLoading={state.loading}
      onClick={onClick}
      style={{ marginRight: "10px" }}
    >
      Deploy to production
    </Button>
  );
};

/**
 * Refresh the page
 */
const Refresh = () => {
  const [state, setState] = useState({
    loading: false,
  });

  const onClick = async () => {
    setState({ loading: true });
    setImmediate(() => window.location.reload());
  };

  return (
    <Button
      color="success"
      type="submit"
      isLoading={state.loading}
      onClick={onClick}
      style={{ marginRight: "10px" }}
    >
      Refresh
    </Button>
  );
};

/**
 * Get the staging site URL
 *
 * @returns the staging site url
 */
const useStagingSiteUrl = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    stagingSiteUrl: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request("/vercel/staging-site-url", {
          method: "GET",
        });
        const stagingSiteUrl = data.url;
        setState({ isLoading: false, stagingSiteUrl, error: null });
      } catch (e) {
        strapi.notification.error("notification.error");
        setState({ isLoading: false, error: e, stagingSiteUrl: null });
      }
    };
    fetchData();
  }, []);

  return state;
};

/**
 * Get the production site URL
 *
 * @returns the production site url
 */
const useProductionSiteUrl = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    productionSiteUrl: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request("/vercel/production-site-url", {
          method: "GET",
        });
        const productionSiteUrl = data.url;
        setState({ isLoading: false, productionSiteUrl, error: null });
      } catch (e) {
        strapi.notification.error("notification.error");
        setState({ isLoading: false, error: e, productionSiteUrl: null });
      }
    };
    fetchData();
  }, []);

  return state;
};

/**
 * Get the deployments
 *
 * @returns A list of deployment objects
 */
const useDeployments = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    deployments: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deployments = await request("/vercel/deployments", {
          method: "GET",
        });
        setState({ isLoading: false, deployments, error: null });
      } catch (e) {
        strapi.notification.error("notification.error");
        setState({ isLoading: false, error: e, deployments: [] });
      }
    };

    fetchData();
  }, []);

  return state;
};

/**
 * Get a single deployment
 *
 * @param {int} id The ID of the deployment
 * @returns The single deployment object
 */
const useDeployment = ({ id }) => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    deployment: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request(`/vercel/deployments/${id}`, {
          method: "GET",
        });
        setState({ isLoading: false, deployment: data, error: null });
      } catch (e) {
        strapi.notification.error("notification.error");
        setState({ isLoading: false, error: e, deployment: null });
      }
    };

    fetchData();
  }, []);

  return state;
};
