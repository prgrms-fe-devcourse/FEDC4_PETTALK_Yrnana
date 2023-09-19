import styled from '@emotion/styled'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Loading = () => {
  const mount = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(150, 1 / 1, 0.1, 1000)

    camera.position.y = 3
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0x000000, 0)
    if (window.innerWidth > 480) {
      renderer.setSize(480, 480)
    } else {
      renderer.setSize(window.innerWidth, window.innerWidth)
    }
    mount.current?.appendChild(renderer.domElement)

    const pointLight = new THREE.PointLight(0xffffff, 1, 0)
    pointLight.position.set(0, 0, 0)
    scene.add(pointLight)

    const loader = new GLTFLoader()
    loader.load('/paw_print/scene.gltf', (gltf: GLTF) => {
      const model = gltf.scene
      model.scale.set(0.1, 0.1, 0.1)

      scene.add(model)

      const animate = () => {
        requestAnimationFrame(animate)
        model.rotation.y += 0.05
        renderer.render(scene, camera)
      }

      animate()
    })
  }, [])

  return <LoadingContainer ref={mount}></LoadingContainer>
}

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Loading
