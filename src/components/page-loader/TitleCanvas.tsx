import React, { useEffect } from 'react'
import styled from 'styled-components'
import desktop from './etablera-desktop.svg'

import * as ogl from 'ogl'
import { useUiContext } from '../../contexts/UiContext'

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;

  canvas {
    width: 1000px;
    height: 174.71px;
    position: absolute;
    z-index: 100;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

const TitleCanvas = () => {
  const { animateContent } = useUiContext()
  useEffect(() => {
    if (!animateContent) return

    let imgSize = [258, 45]

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
    {
      const target = document.getElementById('et-canv')
      const bounds = target.getBoundingClientRect()
      const renderer = new ogl.Renderer({
        dpr: 2,
        alpha: true,
        premultipliedAlpha: true,
        canvas: target,
      })
      const gl = renderer.gl

      const isTouchCapable = 'ontouchstart' in window

      // Variable inputs to control flowmap
      let aspect = 1
      const mouse = new ogl.Vec2(-1)
      const velocity = new ogl.Vec2()
      function resize() {
        let a1, a2
        var imageAspect = imgSize[1] / imgSize[0]
        if (bounds.height / bounds.width < imageAspect) {
          a1 = 1
          a2 = bounds.height / bounds.width / imageAspect
        } else {
          a1 = (bounds.width / bounds.height) * imageAspect
          a2 = 1
        }

        mesh.program.uniforms.res.value = new ogl.Vec4(
          bounds.width,
          bounds.height,
          a1,
          a2
        )

        renderer.setSize(bounds.width, bounds.height)
        aspect = bounds.width / bounds.height
      }
      const flowmap = new ogl.Flowmap(gl, { falloff: 0.2, dissipation: 0.9 })
      // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
      const geometry = new ogl.Geometry(gl, {
        position: {
          size: 2,
          data: new Float32Array([-1, -1, 3, -1, -1, 3]),
        },
        uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
      })
      const texture = new ogl.Texture(gl, {
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        premultiplyAlpha: true,
      })
      const img = new Image()
      img.onload = () => {
        texture.image = img
        document.getElementById('page-title').style.opacity = '0'
      }
      img.crossOrigin = 'Anonymous'

      if (isTouchCapable) {
        img.src = 'img/Alienation_mobile.svg'

        imgSize = [800, 1000]
      } else {
        img.src = desktop
      }

      let a1, a2
      var imageAspect = imgSize[1] / imgSize[0]
      if (bounds.height / bounds.width < imageAspect) {
        a1 = 1
        a2 = bounds.height / bounds.width / imageAspect
      } else {
        a1 = (bounds.width / bounds.height) * imageAspect
        a2 = 1
      }

      const program = new ogl.Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          tWater: { value: texture },
          res: {
            value: new ogl.Vec4(bounds.width, bounds.height, a1, a2),
          },
          img: { value: new ogl.Vec2(imgSize[0], imgSize[1]) },
          // Note that the uniform is applied without using an object and value property
          // This is because the class alternates this texture between two render targets
          // and updates the value property after each render.
          tFlow: flowmap.uniform,
        },
      })
      const mesh = new ogl.Mesh(gl, { geometry, program })

      window.addEventListener('resize', resize, false)
      resize()

      // Create handlers to get mouse position and velocity
      // const isTouchCapable = "ontouchstart" in window;
      if (isTouchCapable) {
        target.addEventListener('touchstart', updateMouse, false)
        target.addEventListener('touchmove', updateMouse, { passive: false })
      } else {
        target.addEventListener('mousemove', updateMouse, false)
      }
      let lastTime
      const lastMouse = new ogl.Vec2()
      function updateMouse(e) {
        e.preventDefault()

        let pos = {
          x: 0,
          y: 0,
        }

        if (e.changedTouches && e.changedTouches.length) {
          pos.x = e.changedTouches[0].pageX
          pos.y = e.changedTouches[0].pageY
        } else {
          pos.y = e.offsetY
          pos.x = e.offsetX
        }

        console.log(pos)
        // console.log(pos.x / gl.renderer.width, 1.0 - pos.y / gl.renderer.height)
        // Get mouse value in 0 to 1 range, with y flipped
        mouse.set(pos.x / gl.renderer.width, 1.0 - pos.y / gl.renderer.height)
        // Calculate velocity
        if (!lastTime) {
          // First frame
          lastTime = performance.now()
          lastMouse.set(pos.x, pos.y)
        }

        const deltaX = pos.x - lastMouse.x
        const deltaY = pos.y - lastMouse.y

        lastMouse.set(pos.x, pos.y)

        let time = performance.now()

        // Avoid dividing by 0
        let delta = Math.max(10.4, time - lastTime)
        lastTime = time
        velocity.x = deltaX / delta
        velocity.y = deltaY / delta
        // Flag update to prevent hanging velocity values when not moving
        velocity.needsUpdate = true
      }
      requestAnimationFrame(update)
      function update(t) {
        requestAnimationFrame(update)
        // Reset velocity when mouse not moving
        if (!velocity.needsUpdate) {
          mouse.set(-1)
          velocity.set(0)
        }
        velocity.needsUpdate = false
        // Update flowmap inputs
        flowmap.aspect = aspect
        flowmap.mouse.copy(mouse)
        // Ease velocity input, slower when fading out
        flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1)
        flowmap.update()
        program.uniforms.uTime.value = t * 0.01
        renderer.render({ scene: mesh })
      }
    }
  }, [animateContent])

  return (
    <Container>
      <canvas id="et-canv"></canvas>
    </Container>
  )
}

export default TitleCanvas
