function print_json(cont){
	var br = '\n';
	var space = ' ';
	while((cont.indexOf(br) != -1)||(cont.indexOf(space) != -1)){
	cont = cont.replace(br,'<br/>');
	cont = cont.replace(space,'&nbsp;');
	}
	return cont;
}