import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import BackgroundImage from '@/assets/images/Background.svg'
import Progress from '@/components/common/greetings/progress'
import { Text } from '@/components/common/Text'

interface ClassName {
  className: string
}

const Greetings = ({ className }: ClassName) => {
  const mount = useRef<HTMLDivElement | null>(null)
  const [progressLoading, setProgressLoading] = useState(true)

  let loading = true

  useEffect(() => {
    if (!mount.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1 / 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    renderer.setClearColor(0x000000, 0)

    if (window.innerWidth > 480) {
      renderer.setSize(480, 480)
    } else {
      renderer.setSize(window.innerWidth, window.innerWidth)
    }
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
        setProgressLoading(false)
      }, 3200)

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

  return (
    <Container className={className} ref={mount}>
      <Text typo={'LogoFont_30'} style={{ position: 'absolute', fontSize: '70px' }}>
        {'Pet Talk'}
      </Text>
      <Progress loading={progressLoading} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100%;
  background-image: url(${BackgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default Greetings
