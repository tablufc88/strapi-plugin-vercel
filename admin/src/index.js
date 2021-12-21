import pluginPkg from "../../package.json"
import pluginId from "./pluginId"
import Initializer from "./components/Initializer"
import PluginIcon from "./components/PluginIcon"

const name = pluginPkg.strapi.displayName

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.displayName`,
        defaultMessage: name
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "[request]" */ "./pages/App"
        )

        return component
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ]
    })
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name
    })
  },

  bootstrap(app) {}
}
