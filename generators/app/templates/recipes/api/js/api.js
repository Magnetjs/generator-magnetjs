import magnet, { fromNode, fromM, fromLocal } from 'magnet-core'
import config from 'magnet-config/config'

const { env } = config

const modules = [
<% modules.forEach(function(module) { -%>
<% if (Array.isArray(module)) { -%>
  [
<% module.forEach(function(mod) { -%>
    <% if (mod.env) { -%>env.<%= mod.env %> && <% } -%>fromM('<%= mod.module %>'),
<% }); -%>
  ],
<% } else { -%>
<% if (module.env) { -%>env.<%= module.env %> && <% } -%>
<% if (module.options) { -%>
  fromM(
    '<%= module.module -%>',
    <%- module.options -%>,
  ),
<% } else { -%>
  fromM('<%= module.module %>'),
<% } -%>
<% } -%>
<% }); -%>
]

magnet(modules)
.catch(function (err) {
  console.error(err)
})
