var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;
btnScene="";
booClick=true;
booBtn=false;
var sphereScene;
var isUsrIntrtg = false,isUsrMvg=false, mousex=0, mousey=0,  projector;
var group
var sizeButton=2;
 
var raycaster; // create once
var mouse; // create once
var plane1, plane2,plane3,plane4,plane5,plane6,plane7,plane8,planemenu;
// Define the standard global variables
var container, scene, camera, renderer;

//init();
 //animate();
preloader.style.display = 'none';
var startButton = document.getElementById( 'startButton' );
    startButton.addEventListener( 'click', function () {
        preloader.style.display = 'block';
        init();
        animate();
    });


function init() {
    
  var play = document.getElementById( 'play' );
  play.remove();  
        

  // Scene
  scene = new THREE.Scene();
  group = new THREE.Group();

  // Camera
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var viewAngle = 75;
  var nearDistance = 0.1;
  var farDistance = 1000;
    
  camera = new THREE.PerspectiveCamera(viewAngle, screenWidth / screenHeight, nearDistance, farDistance);
    
 
    
  scene.add(camera);
  camera.position.set(0, 0, 5);
  camera.lookAt(scene.position);
    
  //projector = new THREE.Projector();
  
  raycaster = new THREE.Raycaster(); // create once
  mouse = new THREE.Vector2(); // create once
    
  document.addEventListener( 'mouseup', onDctMseUp, false );   
 window.addEventListener( 'resize', onWindowResize, false );
 window.addEventListener("orientationchange", onWindowResize, false );    
  //EventBus.addEventListener("callback_event", callback);
  EventBus.addEventListener("custom_event", clickTouch);
    
    
    

  // Create the renderer engine
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
   renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(screenWidth, screenHeight, false);
  container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  //var url = 'https://i.imgur.com/eoWNz.jpg';
    var url1 = '../img/s_1.png';
    var url2 = '../img/s_2.png';

  // loader manager
  manager = new THREE.LoadingManager();
    
  manager.onProgress = function(url, itemsLoaded, itemsTotal) {
    console.log('loading texture ' + url + ' ' + (itemsLoaded / itemsTotal * 100) + '%');
  };
    
  manager.onError = function(url) {
    console.log('Error loading texture: ' + url);
  };

  /*   
  // Load texture 1
  var loader1 = new THREE.TextureLoader(manager);
  loader1.crossOrigin = true;
   loader1.load(
    url1,
    onLoad
  );
   
   // Load texture 2 
  var loader2 = new THREE.TextureLoader(manager);
  loader2.crossOrigin = true;

  loader2.load(
    url2,
    onLoad
  );
  */  
   // load cube 
    
   loadManager2 = new THREE.LoadingManager();
   loaderMaterial = new THREE.TextureLoader(loadManager2);
   
   loadManager3 = new THREE.LoadingManager();
   loaderTexture = new THREE.TextureLoader(loadManager3);
    
   loadManagerScene = new THREE.LoadingManager();
   loaderScene = new THREE.TextureLoader(loadManagerScene);
 
   boxWidth = 1;
   boxHeight = 1;
   boxDepth = 1;
   geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  cubes = []; 
    
  materials = [
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('../img/s_1_opt.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('../img/s_1_opt.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('../img/s_1_opt.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('../img/s_1_opt.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('../img/s_1_opt.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('../img/s_1_opt.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('../img/s_1_opt.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('../img/s_1_opt.jpg')}),
  
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('img/btn5.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('img/btn6.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('img/btn7.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('img/btn8.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('img/btn1.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('img/btn2.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('img/btn3.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('img/btn4.jpg')}),
  new THREE.MeshBasicMaterial({map: loaderMaterial.load('img/btnmenu.jpg')}),   
  ];
    
  textureObject = [  
   //new THREE.TextureLoader(loadManager3).load( 'img/s5_3.jpg', onLoadScene ),
   new THREE.TextureLoader(loadManager3).load( 'img/s_1.jpg' ),
   new THREE.TextureLoader(loadManager3).load( 'img/s_2.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_3.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_4.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_5.jpg'), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_1.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_2.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_3.jpg' )
  ];
    
  loadManager3.onLoad = () => {
  
     console.log("cargo textura") 
      
    materialsObject = [
      new THREE.MeshBasicMaterial({map: textureObject[0]}),
      new THREE.MeshBasicMaterial({map: textureObject[1]}),
      new THREE.MeshBasicMaterial({map: textureObject[2]}),
      new THREE.MeshBasicMaterial({map: textureObject[3]}),
      new THREE.MeshBasicMaterial({map: textureObject[4]}),
      new THREE.MeshBasicMaterial({map: textureObject[5]}),
      new THREE.MeshBasicMaterial({map: textureObject[6]}),
      new THREE.MeshBasicMaterial({map: textureObject[7]})   
  ];
      
      
  }; 
    
  loadManager2.onLoad = () => {
    
     // console.log("texture "+texture)
      onWindowResize();
      //////  cube ///
      //cube = new THREE.Mesh(geometry, materials);
      //scene.add(cube);
      //cubes.push(cube);  // add to our list of cubes to rotate
      
      preloader.style.display = 'none';
      
      
      
    //// esfera /////  
    var geometrySphere = new THREE.SphereGeometry( 500, 60, 40 );
    geometrySphere.scale( - 1, 1, 1 );      
   /* var materialSphere = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( 'img/s_1_opt.jpg' )       
    } );  
    */            
    //sphere = new THREE.Mesh( geometrySphere, materialSphere );
    sphereScene = new THREE.Mesh( geometrySphere, materials [0]);       
    sphereScene.position.x = 0;
    sphereScene.position.y = 0;
    sphereScene.position.z = 0;    
    sphereScene.rotation.y = (0.5 * Math.PI);
    sphereScene.name='sphereScene';
    scene.add( sphereScene );
    
  
    //// botones ////  
    var geometryPlane = new THREE.PlaneGeometry(3, 3, 0);    
      /*var material = new THREE.MeshBasicMaterial({
      map: texture
    });*/
      
    plane5 = new THREE.Mesh(geometryPlane, materials[12]);
    plane5.position.x = 4.8;
    plane5.position.y = 2.2;
    plane5.position.z = -5.2;   
    plane5.name='btn1';
    //scene.add(plane5);
      
    plane6 = new THREE.Mesh(geometryPlane, materials[13]);
    plane6.position.x = 1.6;
    plane6.position.y = 2.2;;
    plane6.position.z = -5.2;   
    plane6.name='btn2';
    //scene.add(plane6);
          
    plane7 = new THREE.Mesh(geometryPlane, materials[14]);
    plane7.position.x = - 1.6;
    plane7.position.y = 2.2;;
    plane7.position.z = -5.2;      
    plane7.name='btn3';
    //scene.add(plane7);
      
    plane8 = new THREE.Mesh(geometryPlane, materials[15]);
    plane8.position.x =-4.8;
    plane8.position.y = 2.2;;
    plane8.position.z =  -5.2;   
    plane8.name='btn4';
    //scene.add(plane8);
      
      
      
      
    plane1 = new THREE.Mesh(geometryPlane, materials[8]);
    plane1.position.x = -4.8;
    plane1.position.y = -1;
    plane1.position.z = -5.2;    
    plane1.name='btn5';
    //scene.add(plane1);
      
    
    plane2 = new THREE.Mesh(geometryPlane, materials[9]);
    plane2.position.x = -1.6;
    plane2.position.y = -1;
    plane2.position.z = -5.2;     
    plane2.name='btn6';
    //scene.add(plane2);
      
      
    plane3 = new THREE.Mesh(geometryPlane, materials[10]);
    plane3.position.x = 1.6;
    plane3.position.y = -1;
    plane3.position.z = -5.2;      
    plane3.name='btn7';
    //scene.add(plane3);
     
    plane4 = new THREE.Mesh(geometryPlane, materials[11]);
    plane4.position.x = 4.8;
    plane4.position.y = -1;
    plane4.position.z = -5.2;     
    plane4.name='btn8';
    //scene.add(plane4);  
      
      
      
  
    
    var geometryPlaneMenu = new THREE.PlaneGeometry(2.5, 0.8, 0);   
    planemenu = new THREE.Mesh(geometryPlaneMenu, materials[16]);
    planemenu.position.x = 0;
    planemenu.position.y = -4.2;
    planemenu.position.z = -4.1;    
    planemenu.name='btnmenu';
    scene.add(planemenu);
      
      
    group.add( plane1 );
    group.add( plane2 );
    group.add( plane3 );
    group.add( plane4 );
    group.add( plane5 );
    group.add( plane6 );
    group.add( plane7 );
    group.add( plane8 );
      
    scene.add(group);
     group.visible =  false;
     
    /////////////// VIDEO  ////////////////////////  
                                                   
    textureVideo = new THREE.VideoTexture( video );
    textureVideo.minFilter = THREE.LinearFilter;
    textureVideo.magFilter = THREE.LinearFilter;
    //texture.format = THREE.RGBFormat;
    textureVideo.format = THREE.RGBAFormat;
    textureVideo.anisotropy = 5;
    textureVideo.mapping = THREE.SphericalReflectionMapping;

    planeGeometry = new THREE.PlaneBufferGeometry( 9, 8, 32);  
    
    materialvideo = new THREE.MeshBasicMaterial( { 
       // color: 0xffffff,
        map: textureVideo, 
        side: THREE.DoubleSide,
       // wireframe: false,
       // opacity: 1,
       // alphaMap:1,
         opacity: 1,
       //transparent: true,
        alphaMap: textureVideo,
        alphaTest: 0.1,
        
    } );
    //materialvideo.transparent = true;
    var planeVideo = new THREE.Mesh( planeGeometry, materialvideo );
    planeVideo.position.x = 0;
    planeVideo.position.y =-0.5;
    planeVideo.position.z = -6.7;
    planeVideo.name='planeVideo';
    // plane.rotation.y = (0.5 * Math.PI);
    scene.add( planeVideo );
        
    
    video = document.getElementById( 'video' );
    video.play();

    /////////////// END VIDEO  ////////////////////////
      
  
      
  };
    
    
    
    
    
   loadManager2.onProgress = function(url, itemsLoaded, itemsTotal) {
    console.log('loading texture ' + url + ' ' + (itemsLoaded / itemsTotal * 100) + '%');
  };
    
  loadManager2.onError = function(url) {
    console.log('Error loading texture: ' + url);
  };

    
    
    
    
    
    
 /*loader.load(
    url1,
    onLoad
  );
*/
  function onLoad(texture) {
      
    var geometry = new THREE.PlaneGeometry(2, 2, 0);
    var material = new THREE.MeshBasicMaterial({
      map: texture
    });
    var mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
   // render();
  }

  // Rendering function
  
    /*
  var render = function() {
    renderer.render(scene, camera);
  };
    */
    
    
       let control = new THREE.OrbitControls(camera, renderer.domElement)
};



//see Console log for intersection coordinates
function onDctMseUp( event )
{
	isUsrIntrtg = false;
	//oldtheta=theta=theta2;
	//lon=theta *180/Math.PI;
	
	var vector = new THREE.Vector3( mousex, mousey,0.5 );		
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    //var intersects = raycaster.intersectObjects( objects, recursiveFlag ); 
    
    
    //projector.unprojectVector( vector, camera );
	//var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	//var intersects = raycaster.intersectObjects( scene.children );
    var intersects = raycaster.intersectObjects([plane1,plane2,plane3,plane4,plane5,plane6,plane7,plane8,planemenu]);

	for(var j=0;j<intersects.length;j++){  
      
	/*	console.log(intersects[j].object.name+' clicked at '+intersects[j].point.x+' '+intersects[j].point.y+' '+intersects[j].point.z);
      */  
       
       
        if( (intersects[j].object.name != 'btnmenu')){  
             booClick=true;
            if(booBtn){   
                console.log("--------> 1 clik boton " +intersects[j].object.name);
                clickScene(intersects[j].object.name);
                group.visible =  !group.visible ;
                booBtn=false;
            }
		    //  intersects[ j ].object.material.color.setHex( Math.random() * 0xffffff );
        }else{ 
           console.log("----> btnmenu "+intersects[j].object.name);
            group.visible =  !group.visible ;
            booBtn  =  !booBtn;
        
         }
    }	
	isUsrMvg=false;
{
    
}}


function clickTouch(event, pX, pY) {
  
    // console.log(this.className + ".doSomething");
    //console.log("type=" + event.type);
    console.log("params=" + pX + "  "+pY); 
    //  console.log("coming from=" + event.target.className);
    
    var vector = new THREE.Vector3( mousex, mousey,0.5 );		
    mouse.x = ( pX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( pY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );    
    var intersects = raycaster.intersectObjects( scene.children );	

	for(var j=0;j<intersects.length;j++){
        if( (intersects[j].object.name != 'btnmenu')){  
            
            if(booBtn){  
                 console.log("--------> 1 clik boton");
                booClick=true;
                clickScene(intersects[j].object.name);
            }
            
           }else{ 
             console.log("----> btnmenu "+intersects[j].object.name);
             group.visible =  !group.visible ;
             booBtn  =  !booBtn;
         }	    
    }	
	isUsrMvg=false
    
    
{}}


function clickScene( nameBoton){    
    var nbt;
    if(booClick){
        btnScene=nameBoton;   
        switch ( nameBoton ) {
			case 'btn1':			
                urlScene= 'img/s_1.jpg';  
                nbt=0;
				break;

			case 'btn2':
				 urlScene= 'img/s_2.jpg';
                nbt=1;
				break;

			case 'btn3':
			     urlScene= 'img/s_3.jpg';
                nbt=2;
				break;

			case 'btn4':
			     urlScene= 'img/s_4.jpg';
                nbt=3;
				break;
            
            case 'btn5':
			 urlScene= 'img/s_5.jpg';
                nbt=4;
				break;
            
            case 'btn6':
			 urlScene= 'img/s5_1.jpg';
                nbt=5;
				break;
            
            case 'btn7':
			 urlScene= 'img/s5_2.jpg';
                nbt=6;
				break;
            
            case 'btn8':
			 urlScene= 'img/s5_3.jpg';
                nbt=7;
				break;
		} 
        
      materials[0].map = textureObject[nbt];
        
    /*
    console.log("--------> 2 antes de cargar la imagen");
      var loaderScene = new THREE.TextureLoader(manager);
      loaderScene.crossOrigin = true;
      loaderScene.load(
          urlScene,
          onLoadScene
      );        
        booClick=false;
        
      */  
        
        
    }
    
    
}


function onLoadScene(texture) {    
       switch ( btnScene ) {
			case 'btn1':              
               sphereScene.rotation.y = (0.5 * Math.PI);            
				break;

			case 'btn2':				
                 sphereScene.rotation.y = (0.6 * Math.PI);
				break;

			case 'btn3':			    
                 sphereScene.rotation.y = (0.15 * Math.PI);
				break;

			case 'btn4':			    
                sphereScene.rotation.y = (0.8 * Math.PI);
				break;
            
            case 'btn5':
		       sphereScene.rotation.y = (1.6 * Math.PI);              
				break;
            
            case 'btn6':
			 sphereScene.rotation.y = (0.5 * Math.PI);     
				break;
            
            case 'btn7':
			 sphereScene.rotation.y = (1.6 * Math.PI); 
				break;
            
            case 'btn8':
			 sphereScene.rotation.y = (1.6 * Math.PI); 
				break;

		}
    console.log("--------> 3 cargo la imagen");
        materials[0].map = texture;
      
        booClick=true;
  }



document.addEventListener("my-update", (e) => {
 // console.log("update", e);
});


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function update() {
   
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );
    camera.lookAt( camera.target );
    /*
    // distortion
    camera.position.copy( camera.target ).negate();    */

    renderer.render( scene, camera );

}

function animate() {

    //requestAnimationFrame( animate );
    //controls.update();    
   // update();
    
      renderer.render(scene, camera);
    
        requestAnimationFrame( animate );
     
    
     

}
