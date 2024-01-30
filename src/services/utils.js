export const replaceTitle = title => {
	console.log('title', title)
	if (!title) return ''
	// Replace asterisks with indigo color
	const regexAsterisk = /\*([^*]+)\*/g
	title = title.replace(
		regexAsterisk,
		'<span class="text-indigo-400">$1</span>'
	)

	// Replace underscores with sky color
	const regexUnderscore = /_([^_]+)_/g
	title = title.replace(regexUnderscore, '<span class="text-sky-400">$1</span>')
	// encapsulate the title in a span
	title = `<span>${title}</span>`
	return title
}
