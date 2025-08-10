import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Stats from 'stats.js';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';

const DecalScene = () => {
  const containerRef = useRef();
  const statsRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const meshRef = useRef();
  const raycasterRef = useRef(new THREE.Raycaster());
  const intersectionRef = useRef({
    intersects: false,
    point: new THREE.Vector3(),
    normal: new THREE.Vector3()
  });
  const mouseRef = useRef(new THREE.Vector2());
  const decalsRef = useRef([]);
  const mouseHelperRef = useRef();
  const lineRef = useRef();
  const paramsRef = useRef({
    minScale: 10,
    maxScale: 20,
    rotate: true,
    clear: () => removeDecals()
  });

  const textureLoader = new THREE.TextureLoader();
  const decalDiffuse = textureLoader.load('/textures/decal/decal-diffuse.png');
  decalDiffuse.colorSpace = THREE.SRGBColorSpace;
  const decalNormal = textureLoader.load('/textures/decal/decal-normal.jpg');

  const decalMaterial = new THREE.MeshPhongMaterial({
    specular: 0x444444,
    map: decalDiffuse,
    normalMap: decalNormal,
    normalScale: new THREE.Vector2(1, 1),
    shininess: 30,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    wireframe: false
  });

  const size = new THREE.Vector3(10, 10, 10);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 120;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    const stats = new Stats();
    statsRef.current = stats;
    container.appendChild(stats.dom);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 50;
    controls.maxDistance = 200;

    scene.add(new THREE.AmbientLight(0x666666));
    const d1 = new THREE.DirectionalLight(0xffddcc, 3);
    d1.position.set(1, 0.75, 0.5);
    scene.add(d1);
    const d2 = new THREE.DirectionalLight(0xccccff, 3);
    d2.position.set(-1, 0.75, -0.5);
    scene.add(d2);

    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
    scene.add(line);
    lineRef.current = line;

    const mouseHelper = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 10),
      new THREE.MeshNormalMaterial()
    );
    mouseHelper.visible = false;
    scene.add(mouseHelper);
    mouseHelperRef.current = mouseHelper;

    loadModel(scene);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let moved = false;
    controls.addEventListener('change', () => { moved = true; });

    window.addEventListener('pointerdown', () => { moved = false; });

    window.addEventListener('pointerup', (e) => {
      if (!moved) {
        checkIntersection(e.clientX, e.clientY);
        if (intersectionRef.current.intersects) shoot();
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (e.isPrimary) checkIntersection(e.clientX, e.clientY);
    });

    const gui = new GUI();
    gui.add(paramsRef.current, 'minScale', 1, 30);
    gui.add(paramsRef.current, 'maxScale', 1, 30);
    gui.add(paramsRef.current, 'rotate');
    gui.add(paramsRef.current, 'clear');
    gui.open();

    function animate() {
      renderer.render(scene, camera);
      stats.update();
    }

    function loadModel(scene) {
      const map = textureLoader.load('/models/gltf/LeePerrySmith/Map-COL.jpg');
      map.colorSpace = THREE.SRGBColorSpace;
      const spec = textureLoader.load('/models/gltf/LeePerrySmith/Map-SPEC.jpg');
      const norm = textureLoader.load('/models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg');

      const loader = new GLTFLoader();
      loader.load('/models/gltf/LeePerrySmith/LeePerrySmith.glb', (gltf) => {
        const mesh = gltf.scene.children[0];
        mesh.material = new THREE.MeshPhongMaterial({
          specular: 0x111111,
          map: map,
          specularMap: spec,
          normalMap: norm,
          shininess: 25
        });
        mesh.scale.multiplyScalar(10);
        scene.add(mesh);
        meshRef.current = mesh;
      });
    }

    function checkIntersection(x, y) {
      if (!meshRef.current) return;
      mouseRef.current.x = (x / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(y / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObject(meshRef.current, false);

      if (intersects.length > 0) {
        const p = intersects[0].point;
        mouseHelperRef.current.position.copy(p);
        intersectionRef.current.point.copy(p);

        const normalMatrix = new THREE.Matrix3().getNormalMatrix(meshRef.current.matrixWorld);
        const n = intersects[0].face.normal.clone();
        n.applyNormalMatrix(normalMatrix).multiplyScalar(10).add(p);

        intersectionRef.current.normal.copy(intersects[0].face.normal);
        mouseHelperRef.current.lookAt(n);

        const pos = lineRef.current.geometry.attributes.position;
        pos.setXYZ(0, p.x, p.y, p.z);
        pos.setXYZ(1, n.x, n.y, n.z);
        pos.needsUpdate = true;

        intersectionRef.current.intersects = true;
      } else {
        intersectionRef.current.intersects = false;
      }
    }

    function shoot() {
      const position = intersectionRef.current.point.clone();
      const orientation = mouseHelperRef.current.rotation.clone();
      if (paramsRef.current.rotate) {
        orientation.z = Math.random() * 2 * Math.PI;
      }

      const scale = paramsRef.current.minScale + Math.random() * (paramsRef.current.maxScale - paramsRef.current.minScale);
      size.set(scale, scale, scale);

      const mat = decalMaterial.clone();
      mat.color.setHex(Math.random() * 0xffffff);

      const decal = new THREE.Mesh(new DecalGeometry(meshRef.current, position, orientation, size), mat);
      decal.renderOrder = decalsRef.current.length;

      decalsRef.current.push(decal);
      meshRef.current.attach(decal);
    }

    function removeDecals() {
      decalsRef.current.forEach(d => meshRef.current.remove(d));
      decalsRef.current.length = 0;
    }

    // Clean up
    return () => {
      gui.destroy();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default DecalScene;
