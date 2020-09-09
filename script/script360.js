var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;
btnScene="";
booClick=true;
booBtn=false;
var btnPrev;
var sphereScene;
var isUsrIntrtg = false,isUsrMvg=false, mousex=0, mousey=0,  projector;
var group
var sizeButton=2;
 var textureObject;
var raycaster; // create once
var mouse; // create once
var plane1, plane2,plane3,plane4,plane5,plane6,plane7,plane8,planemenu,point1,point2;
// Define the standard global variables
var container, scene, camera, renderer;
var listener;
var sound;
var texturePoint;
var clock = new THREE.Clock();

preloader.style.display = 'none';
var startButton = document.getElementById( 'startButton' );
    startButton.addEventListener( 'click', function () {
        preloader.style.display = 'block';
        init();
        animate(); 
    });


function init() {
  
  var play = document.getElementById( 'play' );
  //play.remove();  
        

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
 //document.addEventListener('mouseover', onDctMseOver, false );  
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

  
   loadManager2 = new THREE.LoadingManager();
   loaderMaterial = new THREE.TextureLoader(loadManager2);
   
   loadManager3 = new THREE.LoadingManager();
   loaderTexture = new THREE.TextureLoader(loadManager3);
    
   loadManagerScene = new THREE.LoadingManager();
   loaderScene = new THREE.TextureLoader(loadManagerScene);
 
    
   //audio
    
    var listener = new THREE.AudioListener();
    camera.add( listener );
    
   
    sound = new THREE.Audio( listener );
    
    var audioLoader = new THREE.AudioLoader();
    
    audioLoader.load( 'audio/daydream_bliss.ogg', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.6 );
        sound.play();
    });
    
    
   boxWidth = 1;
   boxHeight = 1;
   boxDepth = 1;
   geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  cubes = []; 

    
  textureObject = [  
   //new THREE.TextureLoader(loadManager3).load( 'img/s5_3.jpg', onLoadScene ),
   new THREE.TextureLoader(loadManager3).load( 'img/s_1.jpg' ),
   new THREE.TextureLoader(loadManager3).load( 'img/s_2.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_3.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_4.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_5.jpg'), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_1.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_2.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_3.jpg' ),
      
   new THREE.TextureLoader(loadManager3).load( 'img/btn5.jpg' ),
   new THREE.TextureLoader(loadManager3).load( 'img/btn6.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn7.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn8.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn1.jpg'), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn2.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn3.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn4.jpg' ),
   new THREE.TextureLoader(loadManager3).load( 'img/btnmenu.jpg' ),
   new THREE.TextureLoader(loadManager3).load( 'img/point.png' ),
   new THREE.TextureLoader(loadManager3).load( 'img/s_1_1.jpg' ) 
 

  ];
    
    
    
    

       
  //loadManager3.onLoad = (buffer) => {  
  loadManager3.onLoad = function() {  
      
    console.log("cargo textura")       
    materialsObject = [
      new THREE.MeshBasicMaterial({map: textureObject[0]}),
      new THREE.MeshBasicMaterial({map: textureObject[1]}),
      new THREE.MeshBasicMaterial({map: textureObject[2]}),
      new THREE.MeshBasicMaterial({map: textureObject[3]}),
      new THREE.MeshBasicMaterial({map: textureObject[4]}),
      new THREE.MeshBasicMaterial({map: textureObject[5]}),
      new THREE.MeshBasicMaterial({map: textureObject[6]}),
      new THREE.MeshBasicMaterial({map: textureObject[7]}),   
        
      new THREE.MeshBasicMaterial({map: textureObject[8]}),
      new THREE.MeshBasicMaterial({map: textureObject[9]}),
      new THREE.MeshBasicMaterial({map: textureObject[10]}),
      new THREE.MeshBasicMaterial({map: textureObject[11]}),
      new THREE.MeshBasicMaterial({map: textureObject[12]}),
      new THREE.MeshBasicMaterial({map: textureObject[13]}),
      new THREE.MeshBasicMaterial({map: textureObject[14]}),
      new THREE.MeshBasicMaterial({map: textureObject[15]}),
      new THREE.MeshBasicMaterial({map: textureObject[16]})   
    ];
      
      
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
    sphereScene = new THREE.Mesh( geometrySphere, materialsObject [0]);       
    sphereScene.position.x = 0;
    sphereScene.position.y = 0;
    sphereScene.position.z = 0;    
    sphereScene.rotation.y = (0.5 * Math.PI);
    sphereScene.name='sphereScene';
      sphereScene.scale.set(0.1,0.1,0.1)    
    scene.add( sphereScene );
    
  
    //// botones ////  
    var geometryPlane = new THREE.PlaneGeometry(3, 3, 0);    
      /*var material = new THREE.MeshBasicMaterial({
      map: texture
    });*/
      
    plane5 = new THREE.Mesh(geometryPlane, materialsObject[12]);
    plane5.position.x = 4.8;
    plane5.position.y = 2.2;
    plane5.position.z = -5.2;   
    plane5.name='btn1';
    //scene.add(plane5);
      
    plane6 = new THREE.Mesh(geometryPlane, materialsObject[13]);
    plane6.position.x = 1.6;
    plane6.position.y = 2.2;;
    plane6.position.z = -5.2;   
    plane6.name='btn2';
    //scene.add(plane6);
          
    plane7 = new THREE.Mesh(geometryPlane, materialsObject[14]);
    plane7.position.x = - 1.6;
    plane7.position.y = 2.2;;
    plane7.position.z = -5.2;      
    plane7.name='btn3';
    //scene.add(plane7);
      
    plane8 = new THREE.Mesh(geometryPlane, materialsObject[15]);
    plane8.position.x =-4.8;
    plane8.position.y = 2.2;;
    plane8.position.z =  -5.2;   
    plane8.name='btn4';
    //scene.add(plane8);
      
      
    
      
    plane1 = new THREE.Mesh(geometryPlane, materialsObject[8]);
    plane1.position.x = -4.8;
    plane1.position.y = -1;
    plane1.position.z = -5.2;    
    plane1.name='btn5';
    //scene.add(plane1);
      
    
    plane2 = new THREE.Mesh(geometryPlane, materialsObject[9]);
    plane2.position.x = -1.6;
    plane2.position.y = -1;
    plane2.position.z = -5.2;     
    plane2.name='btn6';
    //scene.add(plane2);
      
      
    plane3 = new THREE.Mesh(geometryPlane, materialsObject[10]);
    plane3.position.x = 1.6;
    plane3.position.y = -1;
    plane3.position.z = -5.2;      
    plane3.name='btn7';
    //scene.add(plane3);
     
    plane4 = new THREE.Mesh(geometryPlane, materialsObject[11]);
    plane4.position.x = 4.8;
    plane4.position.y = -1;
    plane4.position.z = -5.2;     
    plane4.name='btn8';
      
    plane4.matrixAutoUpdate = false;
    plane4.updateMatrix();
      
    //scene.add(plane4);  
      
      
      
  
    
    var geometryPlaneMenu = new THREE.PlaneGeometry(3, 1, 0);   
    planemenu = new THREE.Mesh(geometryPlaneMenu, materialsObject[16]);
    planemenu.position.x = 0;
    planemenu.position.y = -4.2;
    planemenu.position.z = -4.1;    
    planemenu.name='btnmenu';
    scene.add(planemenu);
    
      /*
    var geometryPlanebtn = new THREE.PlaneGeometry(1, 1, 2);    
    plane1_1 = new THREE.Mesh(geometryPlanebtn, materialsObject[17]);
    plane1_1.position.x = -4.8;
    plane1_1.position.y = 0;
    plane1_1.position.z = -5.2;    
    plane1_1.name='btn1_1';
    scene.add(plane1_1);
      */
      
    //var runnerTexture = new THREE.ImageUtils.loadTexture( 'img/point.png' );
	 texturePoint = new TextureAnimator(  textureObject[17], 38, 1, 38,100 ); // texture, #horiz, #vert, #total, duration.
	var pointMaterial = new THREE.MeshBasicMaterial( { map: textureObject[17], side:THREE.DoubleSide } );      
    pointMaterial.transparent = true;      
	var pointGeometry = new THREE.PlaneGeometry(3, 3, 2, 2);
      
      
	point1 = new THREE.Mesh(pointGeometry, pointMaterial);
	point1.position.set(16,0,4);
    point1.rotation.y = (0.5 * Math.PI);
    point1.name='point1';
	scene.add(point1);    
      
      
	var pointGeometry2 = new THREE.PlaneGeometry(4, 4, 2, 2);
	point2 = new THREE.Mesh(pointGeometry2, pointMaterial);
	point2.position.set(-5,0,-28);
    point2.name='point2';
	scene.add(point2);
    point2.visible=false;
    
      
      
      
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
    //scene.add( planeVideo );
        
    
    video = document.getElementById( 'video' );
   // video.play();

    /////////////// END VIDEO  ////////////////////////
      
  }; 
    
    
    
  /*  
  loadManager2.onLoad = () => {
      
  };
    
    
    
    
    
   loadManager3.onProgress = function(url, itemsLoaded, itemsTotal) {
    console.log('loading texture ' + url + ' ' + (itemsLoaded / itemsTotal * 100) + '%');
  };
    
  loadManager3.onError = function(url) {
    console.log('Error loading texture: ' + url);
  };

    */
    
    
    
    
    
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
    
    
       var  control = new THREE.OrbitControls(camera, renderer.domElement)
};


function intersectsButton( intersects )
{
         //console.log("xxxxxx: "+group.children[3].name)
    
	for(var j=0;j<intersects.length;j++){  
      
	/*	console.log(intersects[j].object.name+' clicked at '+intersects[j].point.x+' '+intersects[j].point.y+' '+intersects[j].point.z);*/         
       
        if( (intersects[j].object.name != 'btnmenu' && intersects[j].object.name != 'point1' )){  
             booClick=true;
            if(booBtn){   
                console.log("--------> 1 clik boton navegador" +intersects[j].object.name);
                
            sphereScene.scale.set(0.1,0.1,0.1);
            TweenMax.to( sphereScene.scale, 1, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                onComplete:endAnimeSphere,
                onCompleteParams:[intersects[j].object.name],
                ease: Power2.easeInOut
            } );
            
            if(btnPrev != undefined){
                btnPrev.material.color.setHex( 0xffffff );
               
            }
            btnPrev=intersects[j].object
            intersects[j].object.material.color.setHex( 0xA14242 );
            
            /*
           // var targetColor = new THREE.Color(0x793525);
                 var targetColor = new THREE.Color(0x793525);
            TweenMax.to( intersects[j].object.material.color, 0.4, {
                r: targetColor.r,
                g: targetColor.g,
                b: targetColor.b
            });
            */
                
            group.visible =  !group.visible ;
            group.position.set(0,-500,0);
              // 
            }
		    //  intersects[ j ].object.material.color.setHex( Math.random() * 0xffffff );
        }
        
          if(intersects[j].object.name == 'btnmenu'){ 
            console.log("btn btnmenu: "+intersects[j].object.name);
             //group.visible =  !group.visible ;
            booBtn  =  !booBtn;
            animar();
            
         }	 
       
        if(intersects[j].object.name == 'point1'){ 
           
            console.log("btn nombre:"+intersects[j].object.name);
             sphereScene.scale.set(0.1,0.1,0.1);
            TweenMax.to( sphereScene.scale, 1, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                onComplete:endAnimeSphere,
                onCompleteParams:[intersects[j].object.name],
                ease: Power2.easeInOut
            } );
                
         }	
        
        if(intersects[j].object.name == 'point2'){ 
           
            console.log("btn nombre:"+intersects[j].object.name);
             sphereScene.scale.set(0.1,0.1,0.1);
            TweenMax.to( sphereScene.scale, 1, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                onComplete:endAnimeSphere,
                onCompleteParams:[intersects[j].object.name],
                ease: Power2.easeInOut
            } );
                
         }	
        
        
        
       
        
    }	    
};

//see Console log for intersection coordinates
function onDctMseUp( event )
{
	isUsrIntrtg = false;	
	var vector = new THREE.Vector3( mousex, mousey,0.5 );		
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );  
    
    var intersects = raycaster.intersectObjects([plane1,plane2,plane3,plane4,plane5,plane6,plane7,plane8,planemenu,point1,point2]);
    
    intersectsButton(intersects);
	isUsrMvg=false;
}

function clickTouch(event, pX, pY)
{    
    var vector = new THREE.Vector3( mousex, mousey,0.5 );		
    mouse.x = ( pX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( pY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );    
    //var intersects = raycaster.intersectObjects( scene.children );	
     var intersects = raycaster.intersectObjects([plane1,plane2,plane3,plane4,plane5,plane6,plane7,plane8,planemenu,point1,point2]);
  
     intersectsButton(intersects);	
	isUsrMvg=false
}

function endAnimeSphere(nameButton) {
     clickScene(nameButton);
     sphereScene.scale.set(0.1,0.1,0.1);  
    if(nameButton != 'point1'){
       booBtn=false;   
    } 
 }   

function animar() {
    
    if(booBtn){
    /*
      var t = Math.random() * 0.6 + 0.3;
            TweenMax.to( group.scale, t, {
                x: 1 + Math.random() * 3,
                y: 1 + Math.random() * 20 + ( Math.random() < 0.1 ? 15 : 0 ),
                z: 1 + Math.random() * 3,
                ease: Power2.easeInOut
            } );
            
            TweenMax.to( group.position, t, {
                x: -200 + Math.random() * 400,
                z: -200 + Math.random() * 400,
                ease: Power2.easeInOut
            } );
            
            var tl = new TimelineMax();
    tl.from(Plane1.material, 1, {opacity:0})
    .from(planet2.material, 1, {opacity:0}, 0.2)
    .from(planet3.material, 1, {opacity:0}, 0.5)
    .from(planet4.material, 1, {opacity:0}, 0.6);
            
    */
        console.log(" aparecer menu");
         group.visible =  !group.visible ;
         group.position.set(0,0,0);
         group.position.y = -0.5;        
            TweenMax.to( group.position, 0.6, {
                x: 0,
                y: 1,
                z: 0,
               
                ease: Power2.easeInOut
            } );
 
    }else{
         console.log(" desaparecer menu");
           TweenMax.to( group.position, 0.6, {
                x: 0,
                y: -0.5,
                z: 0,
                onComplete:endAnimeMenu,
                ease: Power2.easeInOut
            } );
        
        } 
}    
function endAnimeMenu() {
     group.visible =  !group.visible ;
}

function clickScene( nameBoton){   
    console.log("carga 1")
    var nbt;
    point1.visible=false;
    point2.visible=false;
    

    
    if(booClick){
        console.log("carga 2")
        btnScene=nameBoton;   
        switch ( nameBoton ) {
			case 'btn1':			
                 sphereScene.rotation.y = (0.5 * Math.PI);          
                nbt=0;
                point1.visible=true;
				break;

			case 'btn2':
				   sphereScene.rotation.y = (0.6 * Math.PI);
                nbt=1;
				break;

			case 'btn3':
			      sphereScene.rotation.y = (0.15 * Math.PI);
                nbt=2;
				break;

			case 'btn4':
			    sphereScene.rotation.y = (0.8 * Math.PI);
                nbt=3;
				break;
            
            case 'btn5':
			  sphereScene.rotation.y = (1.6 * Math.PI);  
                nbt=4;
				break;
            
            case 'btn6':
			 sphereScene.rotation.y = (0.5 * Math.PI);     
                nbt=5;
				break;
            
            case 'btn7':
			 sphereScene.rotation.y = (1.6 * Math.PI); 
                nbt=6;
				break;
            
            case 'btn8':
			 sphereScene.rotation.y = (1.6 * Math.PI); 
                nbt=7;
				break;
                
            case 'point1':
			 sphereScene.rotation.y = (0.4 * Math.PI); 
                nbt=18;
                 point2.visible=true;
				break;   
            
            case 'point2':
			 sphereScene.rotation.y = (0.4 * Math.PI); 
                nbt=0;
                 point1.visible=true;
				break; 
                
                
		} 
        
      materialsObject[0].map = textureObject[nbt];
        
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


/*
document.addEventListener("my-update", (e) => {
 // console.log("update", e);
});
*/

function onWindowResize() {
    
    

 if (Math.abs(window.orientation) === 90) {
         console.log("Please use Landscape!");
          group.scale.set(3,3,3) 
    } else {
        
        if (isMobile.apple.device || isMobile.android.device ) {
             group.scale.set(0.5,0.5,0.5)    
        }

       
    }
    
     /*           
    if(window.innerHeight > window.innerWidth){
        console.log("Please use Landscape!");
    }else{
        console.log("Please use PORTRAIT!"); 
        }
*/
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function update() {
   // console.log("---->update")
    
    
    
    
    
    if(texturePoint!=undefined){
        var delta = clock.getDelta(); 
        texturePoint.update(1000 * delta);
   }
/*
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );
    camera.lookAt( camera.target );
    */
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
    update();
     
}

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}