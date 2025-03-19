const loadScripts = (src) => {
	const hash = window.location.hash.substring(1);
	const version = new URLSearchParams(hash).get('version');

	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = `https://cdn.dhtmlx.com/suite/${version}/suite.css`;
	document.head.appendChild(link);

	const script = document.createElement('script');
	script.src = `https://cdn.dhtmlx.com/suite/${version}/suite.js`;

	script.onload = () => {
		const mainScript = document.createElement('script');
		mainScript.type = 'module';
		mainScript.src = src;
		document.body.appendChild(mainScript);
	}
	document.body.appendChild(script);
}