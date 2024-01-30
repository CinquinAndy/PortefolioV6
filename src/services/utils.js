export const replaceTitle = title => {
	if (!title) return ''
	// Replace asterisks with indigo color
	const regexAsterisk = /\*([^*]+)\*/g
	title = title.replace(
		regexAsterisk,
		'<span class="text-indigo-400 font-display">$1</span>'
	)

	// Replace underscores with sky color
	const regexUnderscore = /_([^_]+)_/g
	title = title.replace(
		regexUnderscore,
		'<span class="text-sky-400 font-display">$1</span>'
	)
	// encapsulate the title in a span
	title = `<span class="font-display">${title}</span>`
	return title
}
