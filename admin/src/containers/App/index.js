/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "strapi-helper-plugin";
// Containers
import Deployments from "../HomePage";

const App = () => {
  return (
    <div>
      <Switch>
        <Route
          path={`/plugins/strapi-plugin-vercel`}
          component={Deployments}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
