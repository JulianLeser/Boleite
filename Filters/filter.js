usableData.items.forEach(item => {console.log(item.snippet.description);
	if(!item.snippet.description.includes('Obama') ){
		items.push(item);
	}
});