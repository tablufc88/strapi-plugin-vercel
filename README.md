# Strapi Plugin Vercel

- [Strapi Plugin Vercel](#strapi-plugin-vercel)
  - [Installing](#installing)
  - [Configuration](#configuration)
  - [Using this as a component elsewhere in admin](#using-this-as-a-component-elsewhere-in-admin)

## Installing

1. Add following to package.json. The second line creates another module from the first to work with Strapi's autoloading of the plugins by name:

```json
"@tablufc88/strapi-plugin-vercel": "^1.11.1",
"strapi-plugin-vercel": "npm:@tablufc88/strapi-plugin-vercel",
```

2. Create/add to `.npmrc` file in Strapi folder to use the Github registry:

```json
@tablufc88:registry=https://npm.pkg.github.com/
```

3. Run `yarn` or `npm i`

## Configuration

1. Add the following variables into to `/config/plugins.js`

   ```js
   module.exports  = ({ env }) => ({
   	... other plugin configs...
   	vercel: {
   		token:  env("VERCEL_TOKEN"),
   		projectId:  env("VERCEL_PROJECT_ID"),
   		teamId:  env("VERCEL_TEAM_ID"),
   		deployStaging:  env("VERCEL_DEPLOY_STAGING"),
   		deployProduction:  env("VERCEL_DEPLOY_PRODUCTION"),
   		stagingSiteUrl:  env("VERCEL_STAGING_SITE_URL"),
   		productionSiteUrl:  env("VERCEL_PRODUCTION_SITE_URL"),
   	}
   });

   ```

2. Add the following to `/.env`

   - `VERCEL_TOKEN=""` &#8592; Generate token on https://vercel.com/account/tokens.
   - `VERCEL_PROJECT_ID=""` &#8592; Project ID. It should begin with `prj_...`. Can get this by inspecting network requests on vercel.com
   - `VERCEL_TEAM_ID=""` &#8592; Optionally add a team id or leave blank
   - `VERCEL_DEPLOY_PRODUCTION=""` &#8592; Create a webhook in your project to deploy to production & add here
   - `VERCEL_DEPLOY_STAGING=""` &#8592; Create a webhook in your project to deploy to staging & add here
   - `VERCEL_PRODUCTION_SITE_URL=""` &#8592; The URL of the production site
   - `VERCEL_STAGING_SITE_URL=""` &#8592; The URL of the staging site

3. Rebuild strapi with `yarn build`

---

## Using this as a component elsewhere in admin

Import the Deployments component and use where you need. E.g. `/admin/src/containers/HomePage/index.js` ... See [here](https://strapi.io/documentation/developer-docs/latest/guides/custom-admin.html) for help with customising the admin area.

```javascript
import Deployments from "strapi-plugin-vercel/admin/src/containers/HomePage";
<Deployments />;
```

You will need to override webpack config so that Babel can process. Paste the following into `/admin/admin.config.js`

```javascript
const path = require("path");

module.exports = {
  webpack: (config, webpack) => {
    config.module.rules.push({
      test: /\.m?js$/,
      include: [path.resolve("node_modules/strapi-plugin-vercel")],
      exclude: /node_modules\/(?!(strapi-plugin-vercel)\/).*/,
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            require.resolve("@babel/preset-env"),
            require.resolve("@babel/preset-react"),
          ],
          plugins: [
            require.resolve("@babel/plugin-proposal-class-properties"),
            require.resolve("@babel/plugin-syntax-dynamic-import"),
            require.resolve("@babel/plugin-transform-modules-commonjs"),
            require.resolve("@babel/plugin-proposal-async-generator-functions"),
            [
              require.resolve("@babel/plugin-transform-runtime"),
              {
                helpers: true,
                regenerator: true,
              },
            ],
          ],
        },
      },
    });

    return config;
  },
};
```
