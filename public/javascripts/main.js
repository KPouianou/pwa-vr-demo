var polyfill = new WebVRPolyfill();

// Get the canvas element 
var canvas = document.getElementById("renderCanvas");

let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI notify the user they can add to home screen
//   btnAdd.style.display = 'block';
// });

window.addEventListener('beforeinstallprompt', function(event) {
    console.log("before install prompt")
    event.prompt();
});

// Generate the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);

/**
 * Standard 3D sphere
 */
// var createScene = function () {

//     // Create the scene space
//     var scene = new BABYLON.Scene(engine);

//     // Add a camera to the scene and attach it to the canvas
//     var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
//     camera.attachControl(canvas, true);

//     // Add lights to the scene
//     var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
//     var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

//     // This is where you create and manipulate meshes
//     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);

//     return scene;
// };

/**
 * WebVR 3d Sphere
 */
var createScene = function () {

  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  // Add a camera to the scene and attach it to the canvas
  var camera = new BABYLON.WebVRFreeCamera("Camera", new BABYLON.Vector3(0, 0, 0), scene);

  scene.onPointerDown = function () {
      scene.onPointerDown = undefined;
      camera.attachControl(canvas, true);
  };

  // Add lights to the scene
  var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
  var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

  // This is where you create and manipulate meshes
  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
  sphere.position.z = 10;

  return scene;
};

var scene = createScene(); //Call the createScene function

engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
    scene.render();
});

window.addEventListener("resize", function () { // Watch for browser/canvas resize events
    engine.resize();
});