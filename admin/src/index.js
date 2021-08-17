import pluginPkg from "../../package.json";
import App from "./containers/App";
import Initializer from "./containers/Initializer";

export default (strapi) => {
  const pluginDescription =
    pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon,
    id: "strapi-plugin-vercel",
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles: () => {},
    mainComponent: App,
    name,
    preventComponentRendering: false,
    trads: {},
    menu: {
      pluginsSectionLinks: [
        {
          destination: `/plugins/strapi-plugin-vercel`,
          icon,
          label: {
            id: `strapi-plugin-vercel.plugin.name`,
            defaultMessage: name,
          },
          name,
          permissions: [
            // Uncomment to set the permissions of the plugin here
            // {
            //   action: '', // the action name should be plugins::plugin-name.actionType
            //   subject: null,
            // },
          ],
        },
      ],
    },
  };

  return strapi.registerPlugin(plugin);
};