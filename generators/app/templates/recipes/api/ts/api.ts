import magnet, { fromNode, fromM, fromLocal } from 'magnet-core'
import config from 'magnet-config/config'

const { env } = config

const modules = [
<% modules.forEach(function(module) { -%>
  fromM('<%= module %>'),
<% }); -%>
]

magnet(modules)
.catch(function (err) {
  console.error(err)
})
