import debounce from 'lodash/debounce'
import * as ogl from 'ogl'
import desktop from './Etablera_desktop.svg'

const imgSize = [2000, 2000]
const imageAspect = imgSize[1] / imgSize[0]

// Got this from https://tympanus.net/codrops/2019/09/25/mouse-flowmap-deformation-with-ogl/

const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
}
`
const fragment = `
precision highp float;
precision highp int;
uniform sampler2D tWater;
uniform sampler2D tFlow;
uniform float uTime;
varying vec2 vUv;
uniform vec4 res;

void main() {

        // R and G values are velocity in the x and y direction
        // B value is the velocity length
        vec3 flow = texture2D(tFlow, vUv).rgb;

vec2 uv = .5 * gl_FragCoord.xy / res.xy ;

vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);
myUV -= flow.xy * (0.15 * 0.5);
vec3 tex = texture2D(tWater, myUV).rgb;

gl_FragColor.rgb = vec3(tex.r, tex.g, tex.b);
gl_FragColor.a = tex.r;
}
`

export interface IOGLCanvas {
  el: HTMLCanvasElement
  bounds: ClientRect
  aspect: number
  mouse: ogl.Vec2
  velocity: ogl.Vec2
  mesh: ogl.Mesh
  shouldRender: boolean
  resize: () => void
  destroy: () => void
  updateMouse: (e: any) => void
}

type Options = {
  onReady: Function
}

class OGLCanvas implements IOGLCanvas {
  el = null
  bounds = null
  aspect
  mouse
  velocity
  mesh
  gl
  renderer: ogl.Renderer
  flowmap: ogl.Flowmap
  program: ogl.Program
  lastMouse: ogl.Vec2
  shouldRender = true

  constructor(canvas: HTMLCanvasElement, { onReady }: Options) {
    this.el = canvas
    this.bounds = this.el.getBoundingClientRect()

    this.renderer = new ogl.Renderer({
      dpr: 2,
      alpha: true,
      premultipliedAlpha: true,
      canvas: this.el,
    })

    this.gl = this.renderer.gl

    // Variable inputs to control flowmap
    this.aspect = 1
    this.mouse = new ogl.Vec2(-1)
    this.velocity = new ogl.Vec2()

    this.flowmap = new ogl.Flowmap(this.gl, { falloff: 0.2, dissipation: 0.9 })
    // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
    const geometry = new ogl.Geometry(this.gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3]),
      },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    })
    const texture = new ogl.Texture(this.gl, {
      minFilter: this.gl.LINEAR,
      magFilter: this.gl.LINEAR,
      premultiplyAlpha: true,
    })
    const img = new Image()

    img.onload = () => {
      texture.image = img
      onReady()
    }
    img.crossOrigin = 'Anonymous'
    img.src = desktop

    let a1, a2
    if (this.bounds.height / this.bounds.width < imageAspect) {
      a1 = 1
      a2 = this.bounds.height / this.bounds.width / imageAspect
    } else {
      a1 = (this.bounds.width / this.bounds.height) * imageAspect
      a2 = 1
    }

    this.program = new ogl.Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        tWater: { value: texture },
        res: {
          value: new ogl.Vec4(this.bounds.width, this.bounds.height, a1, a2),
        },
        img: { value: new ogl.Vec2(imgSize[0], imgSize[1]) },
        // Note that the uniform is applied without using an object and value property
        // This is because the class alternates this texture between two render targets
        // and updates the value property after each render.
        tFlow: this.flowmap.uniform,
      },
    })
    this.mesh = new ogl.Mesh(this.gl, { geometry, program: this.program })

    window.addEventListener('resize', this.resize, false)
    this.resize()

    this.el.addEventListener('mousemove', this.updateMouse, false)
    this.lastMouse = new ogl.Vec2()

    requestAnimationFrame(this.render)
  }

  resize = debounce(() => {
    // bounds = target.getBoundingClientRect()
    let a1, a2

    if (this.bounds.height / this.bounds.width < imageAspect) {
      a1 = 1
      a2 = this.bounds.height / this.bounds.width / imageAspect
    } else {
      a1 = (this.bounds.width / this.bounds.height) * imageAspect
      a2 = 1
    }

    this.mesh.program.uniforms.res.value = new ogl.Vec4(
      this.bounds.width,
      this.bounds.height,
      a1,
      a2
    )

    this.renderer.setSize(this.bounds.width, this.bounds.height)
    this.aspect = this.bounds.width / this.bounds.height
  }, 50)

  play = () => {
    this.shouldRender = true
    requestAnimationFrame(this.render)
  }

  pause = () => {
    this.shouldRender = false
  }

  render = (t: number) => {
    if (!this.shouldRender) return
    requestAnimationFrame(this.render)
    // Reset velocity when mouse not moving
    if (!this.velocity.needsUpdate) {
      this.mouse.set(-1)
      this.velocity.set(0)
    }
    this.velocity.needsUpdate = false
    // Update flowmap inputs
    this.flowmap.aspect = this.aspect
    this.flowmap.mouse.copy(this.mouse)
    // Ease velocity input, slower when fading out
    this.flowmap.velocity.lerp(this.velocity, this.velocity.len ? 0.15 : 0.1)
    this.flowmap.update()
    this.program.uniforms.uTime.value = t * 0.01
    this.renderer.render({ scene: this.mesh })
  }

  lastTime: any

  updateMouse = (e: any) => {
    e.preventDefault()

    let pos = {
      x: 0,
      y: 0,
    }

    if (e.changedTouches && e.changedTouches.length) {
      pos.x = e.changedTouches[0].pageX - this.bounds.left
      pos.y = e.changedTouches[0].pageY - this.bounds.top
    } else {
      pos.y = e.offsetY
      pos.x = e.offsetX
    }

    // Get mouse value in 0 to 1 range, with y flipped
    this.mouse.set(
      pos.x / this.gl.renderer.width,
      1.0 - pos.y / this.gl.renderer.height
    )
    // Calculate velocity
    if (!this.lastTime) {
      // First frame
      this.lastTime = performance.now()
      this.lastMouse.set(pos.x, pos.y)
    }

    const deltaX = pos.x - this.lastMouse.x
    const deltaY = pos.y - this.lastMouse.y

    this.lastMouse.set(pos.x, pos.y)

    let time = performance.now()

    // Avoid dividing by 0
    let delta = Math.max(10.4, time - this.lastTime)
    this.lastTime = time
    this.velocity.x = deltaX / delta
    this.velocity.y = deltaY / delta
    // Flag update to prevent hanging velocity values when not moving
    this.velocity.needsUpdate = true
  }

  destroy = () => {
    this.el.removeEventListener('mousemove', this.updateMouse, false)
  }
}

export default OGLCanvas
