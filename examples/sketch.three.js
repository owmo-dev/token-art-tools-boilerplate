let D = Math.min(window.innerWidth, window.innerHeight);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 4;
scene.add(camera);

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true,
});

renderer.setSize(D, D);
renderer.setClearColor("#c8c8c8");
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshBasicMaterial({ color: "#" + tokenData.hash.substr(2, 6) });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var render = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

render();
