const startEndPlugin = {
  name: 'start-end-plugin',
  setup(build) {
    build.onStart(() => {
      console.log('build started....')
    })

    build.onEnd((buildResult) => {
      if (buildResult.errors.length) {
        return
      }

      console.log('onEnd::', JSON.stringify(buildResult))
    })
  },
}

export default startEndPlugin
