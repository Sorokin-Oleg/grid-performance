export const getNeededJsonData = async() => {
    const hash = window.location.hash.substring(1);
    const quantity = new URLSearchParams(hash).get('quantity');
    const response = await fetch(`../util/${quantity}.json`);
    const json = await response.json();
	return json;
}