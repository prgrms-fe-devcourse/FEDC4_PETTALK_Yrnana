import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Progress from './Progress'

const Greetings: React.FC<Props> = () => {
  const mount = useRef<HTMLDivElement | null>(null)
  const [textMovement, setTextMovement] = useState(false)

  let loading = true

  useEffect(() => {
    if (!mount.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1 / 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    renderer.setClearColor(0x000000, 0)
    renderer.setSize(480, 480)
    mount.current.appendChild(renderer.domElement)

    camera.position.x = 2
    camera.position.y = 1
    camera.position.z = 3

    camera.lookAt(0, 0, 0)

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0033cc, 5)
    scene.add(hemisphereLight)

    const loader = new GLTFLoader()
    loader.load('snoopy/scene.gltf', (gltf: GLTF) => {
      const model = gltf.scene
      const mixer = new THREE.AnimationMixer(model)

      const animations = gltf.animations
      animations.forEach((clip: THREE.AnimationClip) => {
        mixer.clipAction(clip).play()
      })

      scene.add(model)

      setTimeout(() => {
        loading = false
      }, 6200)

      const animate = () => {
        requestAnimationFrame(animate)
        mixer.update(0.025)
        if (!loading) {
          model.position.z += 0.007
        }
        renderer.render(scene, camera)
      }

      animate()
    })
  }, [])

  setTimeout(() => {
    setTextMovement(true)
  }, 9000)

  return (
    <Container ref={mount}>
      <Progress />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  position: relative;
`

export default Greetings
