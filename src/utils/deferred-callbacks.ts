enum Modules {
  VanillaTilt = 'VanillaTilt',
  Splitting = 'Splitting',
  Plyr = 'Plyr',
  anime = 'anime',
  SmoothFullImage = 'SmoothFullImage',
}

interface IDefferedCallbacks {
  resolved: {
    [Modules.VanillaTilt]: Function
    [Modules.Splitting]: Function
    [Modules.Plyr]: Function
    [Modules.anime]: Function
    [Modules.SmoothFullImage]: Function
  }
}

class DefferedCallbacks implements IDefferedCallbacks {
  resolved = {}

  loadPrimaryDependencies = () => {
    import('splitting').then(mod => {
      this.resolved[Modules.Splitting] = mod.default
    })
    import('animejs').then(mod => {
      this.resolved[Modules.anime] = mod.default
    })
  }

  loadSecondaryDependencies = () => {
    import('vanilla-tilt').then(mod => {
      this.resolved[Modules.VanillaTilt] = mod.default
    })
    import('plyr').then(mod => {
      this.resolved[Modules.Plyr] = mod.default
    })

    import('splitting/dist/splitting.css')
  }

  awaitResolve = (mod: Modules) => {
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (this.resolved[mod]) {
          clearInterval(intervalId)

          resolve(this.resolved[mod])
        }
      }, 40)
    })
  }

  resolve = async mod => {
    let targetedModule = this.resolved[mod]

    if (!targetedModule) {
      targetedModule = await this.awaitResolve(mod)
    }

    return targetedModule
  }

  VanillaTilt = () => this.resolve(Modules.VanillaTilt)
  Splitting = () => this.resolve(Modules.Splitting)
  Plyr = () => {
    import('plyr/dist/plyr.css')
    return this.resolve(Modules.Plyr)
  }
  anime = () => this.resolve(Modules.anime)
  SmoothFullImage = () => this.resolve(Modules.SmoothFullImage)
}

export default new DefferedCallbacks()
