// Get the canvas element 
var canvas = document.getElementById("renderCanvas");

// Generate the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    // This is where you create and manipulate meshes
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);

    return scene;
};

var scene = createScene(); //Call the createScene function

engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
    scene.render();
});

window.addEventListener("resize", function () { // Watch for browser/canvas resize events
    engine.resize();
});