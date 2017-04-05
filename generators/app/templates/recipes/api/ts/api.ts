import magnet, { fromNode, fromM, fromLocal } from 'magnet-core'
const { env } = require('magnet-config/config').default

const modules = [
<% modules.forEach(function(module) { -%>
  fromM('<%= module %>'),
<% }); -%>
]

magnet(modules)
.catch(function (err) {
  console.error(err)
})
