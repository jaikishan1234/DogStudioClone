import * as THREE from "three"

/* 
  SCENE
  The scene is the container that holds EVERYTHING:
  - meshes (objects)
  - lights
  - cameras
*/
const scene = new THREE.Scene()
console.log("Scene:", scene)

/* 
  CAMERA
  PerspectiveCamera mimics how the human eye sees depth.

  75  → field of view (how wide the camera sees)
  aspect → width / height of the screen
  0.1 → near clipping plane (too close = not rendered)
  1000 → far clipping plane (too far = not rendered)
*/
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
)

// Move the camera backwards so we can see objects at (0,0,0)
camera.position.z = 5

// Add camera to the scene graph
scene.add(camera)
console.log("Camera position:", camera.position)

/* 
  GEOMETRY
  Geometry defines the SHAPE of an object.
  BoxGeometry creates a cube (width, height, depth).
*/
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

/* 
  MATERIAL
  Material defines HOW the surface looks.
  MeshStandardMaterial reacts to lights (recommended).
*/
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00
})

/* 
  MESH
  A Mesh = Geometry + Material
  This is the visible object in the scene.
*/
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

// Add cube to the scene so it gets rendered
scene.add(cube)
console.log("Cube position:", cube.position)

/* 
  LIGHT
  DirectionalLight acts like the sun:
  - light comes from a direction
  - position affects shading direction
*/
const light = new THREE.DirectionalLight(0xffffff, 1)

// Move the light up and forward
light.position.y = 4
light.position.z = 4

// Add light to the scene
scene.add(light)
console.log("Light position:", light.position)

/* 
  RENDERER
  The renderer draws the scene using WebGL.
  It converts your 3D scene into pixels on a <canvas>.
*/
const renderer = new THREE.WebGLRenderer()

// Set canvas size to match the browser window
renderer.setSize(innerWidth, innerHeight)

// Add the renderer's canvas to the page
document.body.appendChild(renderer.domElement)
console.log("Renderer:", renderer)

/* 
  ANIMATION LOOP
  This function runs every frame (~60 times per second).
  Any changes here will animate smoothly.
*/
function animate() {
  // Rotate the cube on all axes
  cube.rotation.x += 0.05
  cube.rotation.y += 0.05
  cube.rotation.z += 0.05

  // Draw the scene from the camera's point of view
  renderer.render(scene, camera)
}

/* 
  Start the animation loop
  setAnimationLoop is optimized for:
  - normal screens
  - high refresh rate
  - VR / XR
*/
renderer.setAnimationLoop(animate)
