(function(){
	function iterator(dir,files,folders){
		var stat = fs.statSync(dir);
		if(stat.isDirectory()){
			var dirs = fs.readdirSync(dir);
			folders.unshift(dir);
			for(let i=0;i<dirs.length;i++){
				iterator(dir+'/'+dirs[i],files,folders);
			}
		}else if(stat.isFile()){
			files.unshift(dir);
		}
	}



	return function(dir){
		var files=[],folders=[];
		try{

			iterator(dir,files,folders);
		}catch(e){}
		finally{
			return{
				files:files,
				folders:folders
			} 
		}
	}
})()