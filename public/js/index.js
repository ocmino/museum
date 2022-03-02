// SETTING UP SCENE
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 )
camera.position.x = 225;


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild( renderer.domElement );


const pointLight = new THREE.PointLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight)
pointLight.position.set(45, 25, -45);
scene.add(pointLight)
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(pointLight, ambientLight);


// CONTROLS
const controls = new THREE.OrbitControls( camera, renderer.domElement );


//CREATE THE BOX
let boxGeometry = new THREE.BoxGeometry( 100, 100, 100);


//CREATE THE MOON
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 16),
  new THREE.MeshBasicMaterial({
    map: moonTexture
  })
);
scene.add(moon);
var t = 0;
function render() { 
    requestAnimationFrame(render); 
    t += 0.01;          

    moon.rotation.y += 0.001;

    //MOON ORBIT
    moon.position.x = 25*Math.cos(t) + (0,0,0);
    moon.position.z = 25*Math.sin(t) + (0,0,0);
    moon.position.y = 15*Math.sin(t) + (0,0,0);

    renderer.render(scene, camera); 
} 
render();


// CREATING SKYBOX AND APPLYING PICTURES
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'meadow_ft.jpg');
let texture_bk = new THREE.TextureLoader().load( 'meadow_bk.jpg');
let texture_up = new THREE.TextureLoader().load( 'meadow_up.jpg');
let texture_dn = new THREE.TextureLoader().load( 'meadow_dn.jpg');
let texture_rt = new THREE.TextureLoader().load( 'meadow_rt.jpg');
let texture_lf = new THREE.TextureLoader().load( 'meadow_lf.jpg');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   

let skybox = new THREE.Mesh( boxGeometry, materialArray );
scene.add( skybox );
animate();






const gui = new dat.GUI()
const sphereFolder = gui.addFolder("Moon")
sphereFolder.add(moon.rotation, "x", 0, Math.PI * 2, 0.01).name("X rotation")
sphereFolder.add(moon.rotation, "y", 0, Math.PI * 2, 0.01).name("Y rotation")
sphereFolder.add(moon.rotation, "z", 0, Math.PI * 2, 0.01).name("Z rotation")
sphereFolder.add(moon.scale,'x',0.1,10).name("X size")
sphereFolder.add(moon.scale,'y',0.1,10).name("Y size")
sphereFolder.add(moon.scale,'z',0.1,10).name("Z size")
sphereFolder.add(moon.material, "wireframe").name("Wireframe")

let palette = {color: [0, 255, 255]}
sphereFolder.addColor(palette, 'color').name("Colors").onChange(function(value) {
    moon.material.color.r = value[0]/255;
    moon.material.color.g = value[1]/255;
    moon.material.color.b = value[2]/255;
})
sphereFolder.open()








// ANIMATION LOOP
function animate() {
	requestAnimationFrame( animate );
   
	controls.update();
	renderer.render( scene, camera );

    moon.rotation.y += 0.01;
    //skybox.rotation.y += 0.005;
  
}

animate()


