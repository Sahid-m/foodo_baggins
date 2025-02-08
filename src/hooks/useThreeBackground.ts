"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export const useThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // DNA strand
    const dnaGeometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16)
    const dnaMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.5 })
    const dnaMesh = new THREE.Mesh(dnaGeometry, dnaMaterial)
    scene.add(dnaMesh)

    // Food items
    const foodGeometries = [
      new THREE.SphereGeometry(0.5, 32, 32), // burger
      new THREE.ConeGeometry(0.5, 1, 32), // pizza slice
      new THREE.BoxGeometry(0.5, 0.5, 0.5), // salad box
    ]
    const foodMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 })
    const foodItems = foodGeometries.map((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, foodMaterial)
      mesh.position.set(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2)
      scene.add(mesh)
      return mesh
    })

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xff0000, 1, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Camera position
    camera.position.z = 5

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      dnaMesh.rotation.x += 0.005
      dnaMesh.rotation.y += 0.005
      foodItems.forEach((item) => {
        item.rotation.x += 0.01
        item.rotation.y += 0.01
      })
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return mountRef
}

