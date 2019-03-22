var scene, camera, renderer, mesh;
var wall1;
var clock;	
var clock1;	
var coins1;
var cnt;
var cnt2;
var cnt3;
var floor;
var time=0;
var time1=0;
var time2=0;
var time3=0;
var booster;
var police;
var dog;
var finished;

rails = [];
house = [];
coins = [];
obstacles1 = [];
obstacles2 = [];
obstacles3 = [];

trains = [];
lights = [];

var keyboard = {};
var player = {
	height:1.8,
	speed:0.2,
	turnSpeed:Math.PI*0.02,
	gravity:9.8,
	speed_y:0,
	max_speed:10,
	fly:false,
	speed_obj:0.35,
	bend:false,
	score:0,
	lives:5,
	heightlimit:1,
	grayscale:false,
	police:-1
};
var texture;
var texture_house;
var runner;

function init(){
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff);
	camera= new THREE.PerspectiveCamera(45,1200/800,0.1,1000);
	fogColor = new THREE.Color(0x9999ff);
	scene.fog = new THREE.Fog(fogColor, 1, 50);

	clock = new THREE.Clock();
	clock1 = new THREE.Clock();
	clock.start();
	
	cnt=0;
	
	light = new THREE.PointLight(0xffffff,0.8,30);
	light.position.set(0,5,-5);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);

	var textureLoader = new THREE.TextureLoader();
	textureLoader.type = THREE.AlphaFormat;
	texture_rail = textureLoader.load("ElevatorRail.png");
	texture_done = textureLoader.load("done.png");
	texture_house = textureLoader.load("house.png")
	texture_bg = textureLoader.load("sky.jpeg");
	texture_coins = textureLoader.load("coins.jpg");
	texture_floor = textureLoader.load("floor.jpg");
	texture_obstacle = textureLoader.load("obstacle.jpeg");
	texture_pillar = textureLoader.load("pillar.jpeg");
	texture_train = textureLoader.load("train.jpeg");
	texture_train_front = textureLoader.load("train_front.png");
	texture_stop = textureLoader.load("stop.png");
	texture_fire = textureLoader.load("fire.jpeg");
	texture_game_over = textureLoader.load("gameover.jpeg");
	texture_floor.repeat.set(10, 10);
	texture_floor.wrapS = texture_floor.wrapT = THREE.MirroredRepeatWrapping;

	// images = texture_floor.image;
	// for (var pixel of images.values()) 
	// {
 //    	var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
 //    	pixel.setRed(avg);
 //    	pixel.setGreen(avg);
 //    	pixel.setBlue(avg);
 //  	}


	scene.background =  texture_bg;
	// scene.background =  new THREE.Color( 0x0000ff );
	
	// var booster1 = new THREE.Mesh(
	// 		new 
	// 	);
	// var vz = 0;
	// for(var i=0;i<5;i++)
	// {
	// 	light = new THREE.PointLight(0x9999ff,0.5,100);
	// 	light.position.set(4,0,vz);
	// 	vz += 1;
	// 	lights.push(light)
	// 	scene.add(light);
	// }



	floor = new THREE.Mesh(
		new THREE.PlaneGeometry(50,100,50,10),
		new THREE.MeshPhongMaterial({color:0xffffff,map:texture_floor,wireframe:false})
		);
	floor.material.transparent = true;
	floor.rotation.x -= Math.PI / 2;
	floor.position.y = -0.5;
	floor.position.z = 50;
	scene.add(floor);

	cnt3 = Math.random();
	for(var i=0;i<10;i++)
	{
		coins1 = new THREE.CylinderBufferGeometry(0.25,0.25,0.05,32);
		var m = new THREE.MeshBasicMaterial({color: 0xffff00,map:texture_coins});
		coins1 = new THREE.Mesh(coins1,m);
		coins1.position.set(2,1,cnt3);
		cnt3+=2; 
		coins1.rotation.x = Math.PI/2;
		coins.push(coins1)
		scene.add(coins[i]);		
	}

	for(var i=0;i<8;i++)
	{
		wall1 = new THREE.Mesh(
			new THREE.PlaneGeometry(2,10,10,10),
			new THREE.MeshBasicMaterial({color:0xffffff,map:texture_rail,wireframe:false})
			);
		wall1.rotation.x -= Math.PI / 2;
		wall1.position.z = cnt;
		wall1.position.x = -2
		wall2 = new THREE.Mesh(
			new THREE.PlaneGeometry(2,10,10,10),
			new THREE.MeshBasicMaterial({color:0xffffff,map:texture_rail,wireframe:false})
			);
		wall2.rotation.x -= Math.PI / 2;
		wall2.position.z = cnt;
		wall2.position.x = 2
		cnt+=10;

		rails.push(wall1);
		rails.push(wall2);
		scene.add(rails[rails.length-2]);
		scene.add(rails[rails.length-1]);
	}
	cnt2=0;
	for(var i=0;i<5;i++)
	{
		temp = new THREE.Mesh(
		new THREE.BoxGeometry(3,3,3),
		new THREE.MeshBasicMaterial({
			color:0xff9999,			
			map:texture_house,
		})
		);
		temp1 = new THREE.Mesh(
		new THREE.BoxGeometry(3,3,3),
		new THREE.MeshBasicMaterial({
			color:0xff9999,			
			map:texture_house,
		})
		);
		temp.position.x = 6;
		temp.position.y = player.height;
		temp1.position.x = -6;
		temp1.position.y = player.height;

		temp.position.z = cnt2;
		temp1.position.z = cnt2;
		cnt2 +=10;

        

		house.push(temp);
		house.push(temp1);
	
		scene.add(house[house.length-2]);
		scene.add(house[house.length-1]);
	}
		
	for(var i=0;i<3;i++)
	{

		mesh = new THREE.Mesh(
				new THREE.BoxGeometry(1,1,0.1),
				new THREE.MeshPhongMaterial({color:0xff9999,map:texture_obstacle,wireframe:false})
		);
		var mesh1 = new THREE.Mesh(
				new THREE.BoxGeometry(0.1,1,0.1),
				new THREE.MeshPhongMaterial({color:0xffffff,map:texture_pillar,wireframe:false})
		);
		var mesh2 = new THREE.Mesh(
				new THREE.BoxGeometry(0.1,1,0.1),
				new THREE.MeshPhongMaterial({color:0xffffff,map:texture_pillar,wireframe:false})
		);
		mesh.position.y = 1.5;
		mesh1.position.y = 0.5;
		mesh2.position.y = 0.5;
		mesh1.position.x = 0.45;
		mesh2.position.x = -0.45;
		var group = new THREE.Group();
		group.add(mesh);
		group.add(mesh1);
		group.add(mesh2);
		min = -2;
		max = 2;
		if((Math.random() * (max - min) + min) < 0)
			group.position.x = -2;
		else
			group.position.x = 2;

		group.scale.set(2,1.5,1);
		
		max = 100;
		min = 50;
		group.position.z = Math.random() * (max - min) + min;
		obstacles1.push(group);
		scene.add(obstacles1[i]);
	}
		mesh = new THREE.Mesh(
				new THREE.BoxGeometry(1,1,0.1),
				new THREE.MeshPhongMaterial({color:0xff9999,map:texture_done,wireframe:false})
		);
		var mesh1 = new THREE.Mesh(
				new THREE.BoxGeometry(0.1,1,0.1),
				new THREE.MeshPhongMaterial({color:0xffffff,map:texture_pillar,wireframe:false})
		);
		var mesh2 = new THREE.Mesh(
				new THREE.BoxGeometry(0.1,1,0.1),
				new THREE.MeshPhongMaterial({color:0xffffff,map:texture_pillar,wireframe:false})
		);
		mesh.position.y = 1.5;
		mesh1.position.y = 0.5;
		mesh2.position.y = 0.5;
		mesh1.position.x = 0.45;
		mesh2.position.x = -0.45;
		var group = new THREE.Group();
		group.add(mesh);
		group.add(mesh1);
		group.add(mesh2);
		group.scale.set(8,4,1);
		group.position.z = 500;
		group.position.y = -50;
		finished = group;
		scene.add(finished);

	for(var i=0;i<1;i++)
	{

		mesh = new THREE.Mesh(
				new THREE.BoxGeometry(1,1,0.1),
				new THREE.MeshPhongMaterial({color:0xff9999,map:texture_stop,wireframe:false})
		);
		mesh.position.y = 2;
		min = -2;
		max = 2;
		if((Math.random() * (max - min) + min) < 0)
			mesh.position.x = -2;
		else
			mesh.position.x = 2;

		mesh.scale.set(2,4,1);
		max = 150;
		min = 100;
		mesh.position.z = Math.random() * (max - min) + min;
		obstacles2.push(mesh);
		scene.add(obstacles2[i]);
	}

	for(var i=0;i<1;i++)
	{
		mesh = new THREE.Mesh(
				new THREE.RingBufferGeometry( 0.25, 0.5, 32 ),
				new THREE.MeshBasicMaterial( { color: 0xffffff, map:texture_fire,side: THREE.DoubleSide } ));
		mesh.position.y = 2;
		min = -2;
		max = 2;
		if((Math.random() * (max - min) + min) < 0)
			mesh.position.x = -2;
		else
			mesh.position.x = 2;

		mesh.scale.set(4,4,1);
		max = 150;
		min = 100;
		mesh.position.z = Math.random() * (max - min) + min;
		obstacles3.push(mesh);
		scene.add(obstacles3[i]);
	}

	for(var i=0;i<1;i++)
	{
		var materials = [
	       new THREE.MeshPhongMaterial({
	           map: texture_train
	       }),
	       new THREE.MeshPhongMaterial({
	           map: texture_train
	       }),
	       new THREE.MeshPhongMaterial({
	           map: texture_pillar
	       }),
	       new THREE.MeshPhongMaterial({
	           map: texture_pillar
	       }),
	       new THREE.MeshPhongMaterial({
	           map: texture_train_front
	       }),
	       new THREE.MeshPhongMaterial({
	           map: texture_train_front
	       }),
    	];

		mesh = new THREE.Mesh(
				new THREE.BoxGeometry(2,2,5),
				materials
				// new THREE.MeshPhongMaterial({color:0xff9999,map:texture_train,wireframe:false})
		);
		max = 2;
		min = -2;
		var lane = Math.random() * (max - min) + min;
		if(lane<0)
			mesh.position.x = -2;
		else
			mesh.position.x = 2;

		mesh.position.y = 1;
		min = 50;
		max = 100;
		mesh.position.z = Math.random()* (max - min) + min;
		trains.push(mesh);
		scene.add(trains[i]);
	}


	ambientLight = new THREE.AmbientLight(0xffffff,0.5);
	scene.add(ambientLight);
	

	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("boy/boy.mtl",function(material){
		material.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material);
		objLoader.load("boy/boy.obj",function(object){
		object.scale.set(0.15,0.15,0.15);
		object.position.x = 2;
		runner = object;
		scene.add(runner);
	});
	})
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("Dog/13466_Canaan_Dog_v1_L3.mtl",function(material){
		material.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(material);
		objLoader.load("Dog/13466_Canaan_Dog_v1_L3.obj",function(object){
		object.scale.set(0.03,0.03,0.03);
		object.position.x = 2;
		object.rotation.x = -Math.PI/2;
		dog = object;
		scene.add(dog);
	});
	})
	
	var objLoader = new THREE.OBJLoader();
	objLoader.load("Model_Rocket_Very_Thin_v1_L1.123c2bfc9ddb-c790-42c1-bb21-380dd425cd5b/18501_Model_Rocket_Very_Thin_v1_NEW.obj",function(object){
		object.scale.set(0.05,0.05,0.05);
		object.position.x = -2;
		object.rotation.x = -Math.PI/2;
		object.position.y = 1;
		min = 100;
		max = 150;
		object.position.z = Math.random()* (max - min) + min;
		object.traverse( function (child)
           {
                if ( child instanceof THREE.Mesh )
                {
                    child.material.color.setHex( 0xff0000);
                }
        })
        booster = object;
		scene.add(booster);}
	)
	var objLoader = new THREE.OBJLoader();
	objLoader.load("Slenderman/Slenderman_Model.obj",function(object){
		object.scale.set(0.0035,0.0035,0.0035);
		object.position.x = 2;
		object.position.z = 1;
		object.position.y = 1.25;
		object.traverse( function (child)
           {
                if ( child instanceof THREE.Mesh )
                {
                    child.material.color.setHex( 0xff0000);
                }
        })
        police = object;
		scene.add(police);
	}
	)
	var objLoader = new THREE.OBJLoader();
	objLoader.load("Boots/12309_boots_v1_l2.obj",function(object){
		object.scale.set(0.05,0.05,0.05);
		object.position.x = -2;
		object.rotation.x = Math.PI/2;
		object.rotation.y = Math.PI;
		object.position.y = 1;
		min = 100;
		max = 150;
		object.position.z = Math.random()* (max - min) + min;
		object.traverse( function (child)
           {
                if ( child instanceof THREE.Mesh )
                {
                    child.material.color.setHex( 0xff0000);
                }
        })
		// object.material.color.setHex(0xff0000);
        booster1 = object;
		scene.add(booster1);}
	)	

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1200,800);

	composer = new THREE.EffectComposer(renderer);

	var renderPass = new THREE.RenderPass(scene, camera);
	composer.addPass(renderPass);

	// color to grayscale conversion
	var effectGrayScale = new THREE.ShaderPass( THREE.LuminosityShader );
	effectGrayScale.renderToScreen = true;
	composer.addPass(effectGrayScale);

	camera.position.set(0,player.height,-5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));

	document.body.appendChild(renderer.domElement);
	collision_train();
	collision_boost();
	controls();
	collision_coins();
	collision_obstacles();
	animate();	
} 
function collision_train()
{
	if(player.lives > 0)
	{
		requestAnimationFrame(collision_train);
		if(player.grayscale)
			composer.render(scene,camera);
		else
			renderer.render(scene,camera);
	}
	else
	{
		renderer.render(scene,camera);
		scene.dispose();
		scene = new THREE.Scene();
		scene.background = texture_game_over;
		return;
	}

	for(var i=0;i<trains.length;i++)
	{
		if(typeof runner!="undefined" && Math.abs(trains[i].position.x - runner.position.x)<0.5 && Math.abs(trains[i].position.z - runner.position.z)<0.5 && trains[i].position.y > runner.position.y &&player.fly==false)
		{
			player.lives = 0;
			console.log("Game Over");
		}	
	}
}
function collision_coins()
{
	if(player.lives > 0)
	{
		requestAnimationFrame(collision_coins);
		if(player.grayscale)
			composer.render(scene,camera);
		else
			renderer.render(scene,camera);
	}
	else
	{
		renderer.render(scene,camera);
		scene.dispose();
		scene = new THREE.Scene();
		scene.background = texture_game_over;
		return;
	}
	max = 20;
	min = 10;
	cnt3 = Math.random() * (max - min) + min;
	max = 1;
	min = -1;
	var lane = Math.random() * (max - min) + min;
	for(var i=0;i<coins.length;i++)
	{
		if(typeof runner!="undefined" && Math.abs(coins[i].position.x - runner.position.x)<0.5 && Math.abs(coins[i].position.z - runner.position.z)<0.5 )
		{
			if (lane<0)
				coins[i].position.set(-2,1,cnt3);
			else	
				coins[i].position.set(2,1,cnt3);

			cnt3+=2;
			player.score+=1;
		}
	}
}
function collision_boost()
{
	if(player.lives > 0)
	{
		requestAnimationFrame(collision_boost);
		if(player.grayscale)
			composer.render(scene,camera);
		else
			renderer.render(scene,camera);
	}
	else
	{
		renderer.render(scene,camera);
		scene.dispose();
		scene = new THREE.Scene();
		scene.background = texture_game_over;
		return;
	}
	if(typeof runner!="undefined" && Math.abs(booster.position.x - runner.position.x)<0.5 && Math.abs(booster.position.z - runner.position.z)<0.5 && player.fly == false)
	{
		max = 250;
		min = 150;
		booster.position.z = Math.random() * (max - min) + min;
		max = 1;
		min = -1;
		lane = Math.random() * (max - min) + min;
		if(lane > 0)
			booster.position.x = 2;
		else
			booster.position.x = -2;
		runner.rotation.x = Math.PI/3;
		runner.position.y = 4;
		player.fly = true;	
		fogColor1 = new THREE.Color(0x63fe04);
		scene.fog = new THREE.Fog(fogColor1, 0.25, 30);
	}
	if(typeof runner!="undefined" && typeof booster1!="undefined" && Math.abs(booster1.position.x - runner.position.x)<0.5 && Math.abs(booster1.position.z - runner.position.z)<0.5 && player.fly == false)
	{
		max = 250;
		min = 150;
		booster1.position.z = Math.random() * (max - min) + min;
		max = 1;
		min = -1;
		lane = Math.random() * (max - min) + min;
		if(lane > 0)
			booster1.position.x = 2;
		else
			booster1.position.x = -2;	
		// if(runner.position.y<player.heightlimit+1)
		// {
			player.max_speed = 14;
			// player.speed_y =12;
			// runner.position.y += player.speed_y*d -(0.5)*player.gravity*d;
			// player.speed_y -=player.gravity*d;
		// }
		// scene.fog = new THREE.Fog(fogColor, 0.25, 30);
	}
	if(player.fly == true)
		time+=0.1;
	if(player.fly==true && time>=50)
	{
		runner.position.y = 1;
		runner.rotation.x -= Math.PI/3;
		player.fly = false;
		time=0;
		scene.fog = new THREE.Fog(fogColor, 1, 50);
	}
}
function collision_obstacles()
{
	if(player.lives > 0)
	{
		requestAnimationFrame(collision_obstacles);
		if(player.grayscale)
			composer.render(scene,camera);
		else
			renderer.render(scene,camera);
	}
	else
	{
		renderer.render(scene,camera);
		scene.dispose();
		scene = new THREE.Scene();
		scene.background = texture_game_over;
		return;
	}
	for(var i=0;i<obstacles2.length;i++)
	{
		if(typeof runner!="undefined" && Math.abs(obstacles2[i].position.x - runner.position.x)<0.5 && Math.abs(obstacles2[i].position.z - runner.position.z)<0.5 && player.fly==false) 
		{
			player.lives = 0;
		}
	}
	for(var i=0;i<obstacles1.length;i++)
	{
		if(typeof runner!="undefined" && Math.abs(obstacles1[i].position.x - runner.position.x)<0.5 && Math.abs(obstacles1[i].position.z - runner.position.z)<0.5 && Math.abs(0.5 - runner.position.y) <=0.5 && player.bend==false) 
		{
			if(player.police != i && player.police!=-1)
				player.lives = 0;

			if(player.police !=-1)
				continue;

			player.speed_obj = 0.15;
			police.position.z = runner.position.z-1;
			player.police = i;
		}
	}
	for(var i=0;i<obstacles3.length;i++)
	{
		if(typeof runner!="undefined" && Math.abs(obstacles3[i].position.x - runner.position.x)<0.5 && Math.abs(obstacles3[i].position.z - runner.position.z)<0.5 && Math.abs(obstacles3[i].position.y - runner.position.y)>0.5 && player.fly== false)  
		{
			console.log("Ring");
			console.log(obstacles3[i].position.y,runner.position.y)		
			if(player.police != i && player.police!=-1)
				player.lives = 0;

			if(player.police !=-1)
				continue;

			player.speed_obj = 0.15;
			police.position.z = runner.position.z-1;
			player.police = i;
		}
	}
	if(player.speed_obj == 0.15 && time1 < 20)
	{
		time1+=0.1;
		if(typeof police!="undefined")
		{
			police.position.z = runner.position.z-1;
		}
	}
	else
	{
		player.speed_obj = 0.35;
		player.police = -1;
		time1 = 0;
		if(typeof police!="undefined" && typeof runner!="undefined")
			police.position.z = runner.position.z-3;
	}
}
function controls(){
	var interval;
	if(player.lives > 0)
	{
		requestAnimationFrame(controls);
		if(player.grayscale)
			composer.render(scene,camera);
		else
			renderer.render(scene,camera);
	}
	else
	{
		renderer.render(scene,camera);
		scene.dispose();
		scene = new THREE.Scene();
		scene.background = texture_game_over;
		return;
	}
	d = clock.getDelta();
	if(keyboard[37])
		runner.position.x = 2;
	if(keyboard[39])
		runner.position.x = -2;
	if(keyboard[71])
	{
		if(player.grayscale == false)
			player.grayscale = true;
		else
			player.grayscale = false;
	}
	if(keyboard[70]) 
	{
		light.intensity = 3;
		time3 = 100;
	}
	if(time3!=0)
	{
		time3 -= 1;
		if(time3%4 == 0)
			if(light.intensity!=3)
				light.intensity = 3;
			else
				light.intensity = 1;
	}
	if(keyboard[68])
	{
		runner.scale.set(0.05,0.05,0.05);
		player.bend = true;
	}
	else
	{
		if(typeof runner!="undefined")
		{
			runner.scale.set(0.15,0.15,0.15);	
			player.bend = false;
		}
	}
	if(keyboard[32] && runner.position.y<player.heightlimit)
	{
		player.speed_y = player.max_speed;
		runner.position.y += player.speed_y*d -(0.5)*player.gravity*d;
		camera.position.y += player.speed_y*d -(0.5)*player.gravity*d;
		player.speed_y -=player.gravity*d;
	}
	if(typeof runner!="undefined" && (runner.position.y + player.speed_y*d -(0.5)*player.gravity*d)>=0 && player.fly==false)
	{
		runner.position.y += player.speed_y*d -(0.5)*player.gravity*d;
		camera.position.y += player.speed_y*d -(0.5)*player.gravity*d;
		player.speed_y -=player.gravity*d;
	}
	else
	{
		if(typeof runner!="undefined" && player.fly == false)
		{
			runner.position.y=0;
			camera.position.y = player.height;
		}
	}
}
function animate(){
	if(player.lives > 0)
	{
		requestAnimationFrame(animate);
		if(player.grayscale)
			composer.render(scene,camera);
		else
			renderer.render(scene,camera);
	}
	else
	{
		renderer.render(scene,camera);
		scene.dispose();
		scene = new THREE.Scene();
		scene.background = texture_game_over;
		return;
	}

	document.getElementById("score").innerHTML = player.score;
	finished.position.z -= player.speed_obj;
	if(finished.position.z <= 80)
	{
		finished.position.y = 0;
	}
	if(finished.position.z <= 0)
		player.lives = 0;
	if(player.fly)
	{
		dog.position.y = 0;
		dog.position.z = 0;
		camera.position.y = runner.position.y;
	}
	if(typeof runner!="undefined" && typeof police!="undefined" && typeof dog!="undefined")
	{
		dog.position.x = 0;
		dog.position.z = runner.position.z - 1;
		if(player.fly == false)
			dog.position.y = runner.position.y;
		police.position.x = runner.position.x;
		police.position.z = runner.position.z-3;
	}
	if(player.max_speed == 14 && time2 < 30)
	{
		time2+=0.1
	}
	else
	{
		time2 = 0;
		player.max_speed = 10;
	}

	max = 250;
	min = 150;
	if(typeof booster!="undefined")
	{
		booster.position.z -= player.speed_obj;
		if(booster.position.z < -10)
		{
			booster.position.z = Math.random() * (max - min) + min;
			max = 1;
			min = -1;
			lane = Math.random() * (max - min) + min;
			if(lane > 0)
				booster.position.x = 2;
			else
				booster.position.x = -2;
		}
	}
	if(typeof booster1!="undefined")
	{
		booster1.position.z -= player.speed_obj;
		if(booster1.position.z < -10)
		{
			booster1.position.z = Math.random() * (max - min) + min;
			max = 1;
			min = -1;
			lane = Math.random() * (max - min) + min;
			if(lane > 0)
				booster1.position.x = 2;
			else
				booster1.position.x = -2;
		}
	}
	
	max = 20;
	min = 10;
	cnt3 = Math.random() * (max - min) + min;
	max = 1;
	min = -1;
	var lane = Math.random() * (max - min) + min;
	for(var i=0;i<coins.length;i++)
	{
		coins[i].position.z-=player.speed_obj;
		if(coins[i].position.z < -10)
		{
			if (lane<0)
				coins[i].position.set(-2,1,cnt3);
			else	
				coins[i].position.set(2,1,cnt3);
			cnt3+=2;
		}
		if(player.fly)
		{
			coins[i].position.y = 4;
		}
	}
	max = 1;
	min = -1;
	var lane = Math.random() * (max - min) + min;
	cnt-=player.speed_obj;
	for(var i=0;i<rails.length;i+=2)
	{
		rails[i].position.z-=player.speed_obj;
		rails[i+1].position.z-=player.speed_obj;
		if(rails[i].position.z < -10)
		{
			rails[i].position.z = cnt;
			rails[i+1].position.z = cnt;
			if(lane<0)
			{
				rails[i].position.x = -2;
				rails[i+1].position.x = 2;
			}
			else
			{
				rails[i].position.x = 2;
				rails[i+1].position.x = -2;
			}
			cnt+=10;
		}
	}
	cnt2-=player.speed_obj;
	for(var i=0;i<house.length;i+=2)
	{
		house[i].position.z-=player.speed_obj;
		house[i+1].position.z-=player.speed_obj;
		if(house[i].position.z < -10)
		{
			house[i].position.z = cnt2;
			house[i+1].position.z = cnt2;
			cnt2+=10;
		}
	}
	max = 1;
	min = -1;
	var lane = Math.random() * (max - min) + min;
	for(var i=0;i<obstacles1.length;i++)
	{
		obstacles1[i].position.z -= player.speed_obj;
		if(obstacles1[i].position.z < -10)
		{
			max = 80;
			min = 30;
			obstacles1[i].position.z = Math.random() * (max - min) + min;
			if(lane<0)
			{
				obstacles1[i].position.x = -2;
			}
			else
			{
				obstacles1[i].position.x = 2;
			}
		}
	}
	max = 1;
	min = -1;
	var lane = Math.random() * (max - min) + min;
	for(var i=0;i<obstacles3.length;i++)
	{
		obstacles3[i].rotation.z +=0.1;
		obstacles3[i].position.z -= player.speed_obj;
		if(obstacles3[i].position.z < -10)
		{
			max = 80;
			min = 30;
			obstacles3[i].position.z = Math.random() * (max - min) + min;
			if(lane<0)
			{
				obstacles3[i].position.x = -2;
			}
			else
			{
				obstacles3[i].position.x = 2;
			}
		}
	}
	max = 1;
	min = -1;
	var lane = Math.random() * (max - min) + min;
	for(var i=0;i<obstacles2.length;i++)
	{
		obstacles2[i].position.z -= player.speed_obj;
		if(obstacles2[i].position.z < -10)
		{
			max = 80;
			min = 30;
			obstacles2[i].position.z = Math.random() * (max - min) + min;
			if(lane<0)
			{
				obstacles2[i].position.x = -2;
			}
			else
			{
				obstacles2[i].position.x = 2;
			}
		}		
	}
	max = 1;
	min = -1;
	var lane = Math.random() * (max - min) + min;
	for(var i=0;i<trains.length;i++)
	{
		trains[i].position.z -=2*player.speed_obj;
		if(trains[i].position.z < -10)
		{
			max = 80;
			min = 30;
			if(lane<0)
			{
				trains[i].position.x = -2;
			}
			else
			{
				trains[i].position.x = 2;
			}
			trains[i].position.z = Math.random() * (max - min) + min;
		}	
	}
}
function keyDown(event){
	keyboard[event.keyCode] = true;
}
function keyUp(event){
	keyboard[event.keyCode] = false; 
}
window.addEventListener('keydown',keyDown);
window.addEventListener('keyup',keyUp);
window.onload = init;