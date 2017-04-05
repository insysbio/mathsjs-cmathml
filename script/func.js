function compact(n)
{
	if(n>=0)
		document.getElementsByClassName('json')[n].style.height = '300px';
	else	
		$('.json').css('height', '300px');
}
function full(n){
	if(n>=0)
		document.getElementsByClassName('json')[n].style.height = 'auto';
	else	
		$('.json').css('height', 'auto');
}	