usableData.items.forEach(item => {console.log(item.snippet.description);
	if(!item.snippet.description.includes('No videos that include this string in their description will be shown') ){
		items.push(item);
	}
});
