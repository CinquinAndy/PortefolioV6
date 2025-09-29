export const replaceTitle = (title: string): string => {
	if (!title) return ''

	// Regex to identify words with * or _, and other text segments
	const regex = /(\*([^*]+)\*)|(_([^_]+)_)|([^*_]+)/g
	let matches: RegExpExecArray | null
	let newTitle = ''

	while ((matches = regex.exec(title)) !== null) {
		if (matches[2]) {
			// Match for text wrapped in *
			newTitle += `<span class="text-fuchsia-500 font-semibold">${matches[2]}</span>`
		} else if (matches[4]) {
			// Match for text wrapped in _
			newTitle += `<span class="text-cyan-400 font-semibold">${matches[4]}</span>`
		} else if (matches[5]) {
			// Match for text without * or _
			newTitle += `<span>${matches[5]}</span>`
		}
	}

	return newTitle
}

export const replaceDynamicVariables = (content: string): string => {
	if (!content) return ''

	const currentYear = new Date().getFullYear()

	// Replace dynamic variables
	return content.replace(/{actualYear}/g, currentYear.toString()).replace(/{currentYear}/g, currentYear.toString())
}
