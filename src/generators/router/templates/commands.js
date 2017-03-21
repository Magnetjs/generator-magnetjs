export default function ({ caporal }) {
  if (!caporal) return

  caporal
  .command('test')
  .action(function(args, options, logger) {
    logger.info('hi');
  })
}
