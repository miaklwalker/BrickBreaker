export default function uniqueid() {
	let idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
	do {
		var ascicode = Math.floor(Math.random() * 42 + 48);
		if (ascicode < 58 || ascicode > 64) {
			idstr += String.fromCharCode(ascicode);
		}
	} while (idstr.length < 32);

	return idstr;
}