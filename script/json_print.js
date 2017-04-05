function print_json(cont) {
	cont = cont.replace(new RegExp("\n","g"), "<br/>");
	cont = cont.replace(new RegExp(" ","g"), "&nbsp;");
	return cont;
}