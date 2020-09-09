var camera, scene, rdr2D, rdr3D, cnv2D, cnv3D, ctx2d, projector;
var txt_plchld,isUsrIntrtg = false,isUsrMvg=false,
onMseDnMseX = 0, onMseDnMseY = 0, lon = 0, onMseDnLn = 0, lat = 0, onMseDnLt = 0,phi = 0, theta = 0,fov = 60, oldtheta=0,theta2=0, mousex=0, mousey=0;

init();
animate();

function init()
{
	cnv2D = document.getElementById('cnv2D');
	rdr2D = new THREE.CanvasRenderer({canvas: cnv2D});
	rdr2D.setSize( window.innerWidth, window.innerHeight );

	cnv3D = document.getElementById('cnv3D');
	rdr3D = new THREE.WebGLRenderer({canvas: cnv3D, antialias:true});
	rdr3D.setSize( window.innerWidth, window.innerHeight );
	
	camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.target = new THREE.Vector3( 0, 0, 0 );
	scene = new THREE.Scene();
			
	projector = new THREE.Projector();
	
	createPlane();
	
	document.addEventListener( 'mousedown', onDctMseDn, false );
	document.addEventListener( 'mousemove', onDctMseMv, false );
	document.addEventListener( 'mouseup', onDctMseUp, false );
	document.addEventListener( 'mousewheel', onDctMsWhl, false );
	document.addEventListener( 'DOMMouseScroll', onDctMsWhl, false);
	window.addEventListener( 'resize', onWindowResize, false );
}

//click and drag the scene to see the planes
function createPlane()
{
	//Plane1 on the left of the camera, turn to the left to see it
	//works with intersectObjects : only the clicks on Plane1 give an intersection with it at the good coordinates
	var geometry1 = new THREE.PlaneGeometry( 5,5,1,1 );
	var material1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

	geometry1.vertices[0].x =  -20;
	geometry1.vertices[0].y =  20;
	geometry1.vertices[0].z =  -50;

	geometry1.vertices[1].x =  20;
	geometry1.vertices[1].y =  20;
	geometry1.vertices[1].z =  -50;
	
	geometry1.vertices[2].x =  -20;
	geometry1.vertices[2].y =  -20;
	geometry1.vertices[2].z =  -50;
						
	geometry1.vertices[3].x =  20;
	geometry1.vertices[3].y =  -20;
	geometry1.vertices[3].z =  -50;
	
	var plane1 = new THREE.Mesh( geometry1, material1 );
	
	plane1.geometry.verticesNeedUpdate = true;
	//plane1.geometry.normalsNeedUpdate = true;
    plane1.geometry.computeFaceNormals();
	plane1.geometry.computeCentroids();
	
	plane1.name='Plane1';
	
	scene.add( plane1 );

	//Plane2 in front of the camera, the first we can see
	//doesn't work with intersectObjects : anywhere I click, even on Plane1, there is an intersection with this plane at (0,0,0)
	var geometry2 = new THREE.PlaneGeometry( 5,5,1,1 );
	var material2 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

	geometry2.vertices[0].x =  50;
	geometry2.vertices[0].y =  20;
	geometry2.vertices[0].z =  -20;

	geometry2.vertices[1].x =  50;
	geometry2.vertices[1].y =  20;
	geometry2.vertices[1].z =  20;
	
	geometry2.vertices[2].x =  50;
	geometry2.vertices[2].y =  -20;
	geometry2.vertices[2].z =  -20;
						
	geometry2.vertices[3].x =  50;
	geometry2.vertices[3].y =  -20;
	geometry2.vertices[3].z =  20;
	
	var plane2 = new THREE.Mesh( geometry2, material2 );
	
	plane2.geometry.verticesNeedUpdate = true;
	//plane2.geometry.normalsNeedUpdate = true;
    plane2.geometry.computeFaceNormals();
	plane2.geometry.computeCentroids();
	
	plane2.name='Plane2';
	
	scene.add( plane2 );
}

//see Console log for intersection coordinates
function onDctMseUp( event )
{
	isUsrIntrtg = false;
	oldtheta=theta=theta2;
	lon=theta *180/Math.PI;
	
	var vector = new THREE.Vector3( mousex, mousey,0.5 );
	
   console.log("------------------- click up");
   
	projector.unprojectVector( vector, camera );
	
	var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	var intersects = ray.intersectObjects( scene.children );
	
	var mouse = new THREE.Vector2();
	mouse.x=mousex;
	mouse.y=mousey;

	for(var j=0;j<intersects.length;j++){
  
  console.log("------------------- click up interseccion");
  
		console.log(intersects[j].object.name+' clicked at '+intersects[j].point.x+' '+intersects[j].point.y+' '+intersects[j].point.z);
		intersects[ j ].object.material.color.setHex( Math.random() * 0xffffff );
	
  
  }
	
	isUsrMvg=false;
}
		
    
    
    
function onDctMseDn( event )
{
	event.preventDefault();
  
	isUsrIntrtg = true;

	mousex = ( event.clientX / window.innerWidth ) * 2 - 1;
	mousey = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;

	onPointerDownLon = lon;
	onPointerDownLat = lat;

}

function onDctMseMv( event )
{
	if ( isUsrIntrtg ) {
		isUsrMvg=true;
		document.getElementById('cnv2D').style.cursor='move';
					
		lon = -( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
		lat = -( event.clientY - onPointerDownPointerY ) * 0.3 + onPointerDownLat;

		render();
	}
	else document.getElementById('cnv2D').style.cursor='auto';
}
		
function onDctMsWhl( event )
{
	// WebKit
	if ( event.wheelDeltaY ) {
		fov -= event.wheelDeltaY * 0.05;
	// Opera / Explorer 9
	} else if ( event.wheelDelta ) {
		fov -= event.wheelDelta * 0.05;
	// Firefox
	} else if ( event.detail ) {
		fov += event.detail * 1.0;
	}

	if(fov>120) fov=120;
	if(fov<30) fov=30;
	camera.projectionMatrix.makePerspective( fov, window.innerWidth / window.innerHeight, 1, 1000 );
	render();
}

function animate()
{
	requestAnimationFrame( animate );
	render();
}

function render()
{
	if(isUsrIntrtg && isUsrMvg){

		lat = Math.max( - 85, Math.min( 85, lat ) );
		phi = ( 90 - lat ) * Math.PI / 180;
		theta = lon * Math.PI / 180;
		
		if(theta != oldtheta){
		
			var signDif=Math.abs(theta-oldtheta)/(theta-oldtheta);
			var dif=Math.abs(theta-oldtheta)*signDif;
		
			theta2+=dif*Math.PI / 50;
			
			if(theta2>=oldtheta+2*Math.PI){
				theta2=oldtheta;
			}
		}
		
		camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta2 );
		camera.target.y = 500 * Math.cos( phi );
		camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta2 );
		camera.lookAt( camera.target );
	}
	else{
		
		lat = Math.max( - 85, Math.min( 85, lat ) );
		phi = ( 90 - lat ) * Math.PI / 180;
		theta = lon * Math.PI / 180;
		oldtheta=theta2=theta;
		
		camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
		camera.target.y = 500 * Math.cos( phi );
		camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );
		camera.lookAt( camera.target );
	}

	rdr3D.render( scene, camera );
}

function onWindowResize()
{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	rdr2D.setSize( window.innerWidth, window.innerHeight );
	rdr3D.setSize( window.innerWidth, window.innerHeight );

	camera.projectionMatrix.makePerspective( fov, window.innerWidth / window.innerHeight, 1, 1000 );
}