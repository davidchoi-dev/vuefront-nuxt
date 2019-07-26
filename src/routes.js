import _ from 'lodash'
import mainConfig from 'vuefront'
import userConfig from '~/vuefront.config'
<% if (options.theme != 'default') { %>
import themeConfig from '<%= options.theme %>'
<% } %>

const mergeConfig = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue)
  } else if (_.isObject(objValue)) {
    return _.merge(objValue, srcValue)
  } else {
    return srcValue
  }
}

let themeOptions = mainConfig
if (typeof themeConfig !== 'undefined') {
themeOptions = _.mergeWith(themeOptions, themeConfig, mergeConfig)
}
themeOptions = _.mergeWith(themeOptions, userConfig, mergeConfig)

export const getRoutes = () => {
  return [<% for (var i=0; i < options.routes.length; i++){%>
    {
      name: '<%= options.routes[i].name %>',
      path: '<%= options.routes[i].path %>',<% if(typeof options.routes[i].props !== 'undefined') {%>
      props: <%= JSON.stringify(options.routes[i].props) %>,<% } %>
      component: () =>
        <%= 'themeOptions.pages.'+options.routes[i].component %>
    },<% } %>
  ]
}