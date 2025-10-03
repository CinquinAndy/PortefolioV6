export type Module = {
	id: string
	title: string
	description: string
	lessons: Lesson[]
}

export type Lesson = {
	id: string
	title: string
	description: string
	video: {
		thumbnail: string
		duration: number
		url: string
	} | null
}

export function getModules(): Module[] {
	return lessons
}

export async function getLesson(
	slug: string
): Promise<(Lesson & { module: Module; next: Lesson | null }) | null> {
	const module = lessons.find(({ lessons }) => lessons.some(({ id }) => id === slug))

	if (!module) {
		return null
	}

	const index = module.lessons.findIndex(({ id }) => id === slug)

	return {
		...module.lessons[index],
		module,
		next: index < module.lessons.length - 1 ? module.lessons[index + 1] : null,
	}
}

const lessons = [
	{
		id: 'orientation',
		title: 'Orientation: Comprendre où vous êtes',
		description: 'Vous devez savoir d\'où vous partez avant de décider où vous allez.',
		lessons: [
			{
				id: 'landscape-of-choice',
				title: 'Le paysage des choix',
				description: 'Une carte pratique pour naviguer dans l\'illusion que vous avez réellement de l\'influence.',
				video: {
					duration: 876,
					thumbnail: 'https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-01.png',
					url: 'https://assets.tailwindcss.com/templates/compass/landscape-of-choice.mp4',
				},
			},
			{
				id: 'paradox-of-agency',
				title: 'Le paradoxe de l\'action',
				description: 'Explorez si vous vivez votre vie ou si vous réagissez simplement à celle des autres.',
				video: null,
			},
			{
				id: 'liberation-from-regret',
				title: 'Libération du regret',
				description: 'Si aucun choix alternatif n\'était jamais possible, le regret devient logiquement inutile.',
				video: {
					duration: 947,
					thumbnail: 'https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-02.png',
					url: 'https://assets.tailwindcss.com/templates/compass/liberation-from-regret.mp4',
				},
			},
			{
				id: 'recognizing-patterns',
				title: 'Reconnaître les schémas',
				description: 'Les échecs n\'ont pas été choisis librement mais étaient inévitables compte tenu de vos circonstances.',
				video: null,
			},
			{
				id: 'values-and-goals',
				title: 'Valeurs et objectifs',
				description: 'Identifiez les schémas dans vos intérêts et capacités qui révèlent votre direction prédéterminée.',
				video: {
					duration: 1328,
					thumbnail: 'https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-04.png',
					url: 'https://assets.tailwindcss.com/templates/compass/values-and-goals.mp4',
				},
			},
		],
	},
	{
		id: 'direction',
		title: 'Direction: Choisir un chemin',
		description: 'Vivez la sensation du choix sans le fardeau de la vraie responsabilité.',
		lessons: [
			{
				id: 'mapping-causal-factors',
				title: 'Cartographier les facteurs causals',
				description: 'Les causes qui agissent sur vous peuvent vous donner un aperçu de l\'endroit où elles pourraient vous mener.',
				video: {
					duration: 892,
					thumbnail: 'https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-03.png',
					url: 'https://assets.tailwindcss.com/templates/compass/mapping-causal-factors.mp4',
				},
			},
			{
				id: 'reframing-uncertainty',
				title: 'Recadrer l\'incertitude comme action',
				description: 'Si vous plissez les yeux, ne pas pouvoir prédire l\'avenir ressemble un peu au libre arbitre.',
				video: null,
			},
			{
				id: 'decision-paralysis',
				title: 'Surmonter la paralysie décisionnelle',
				description: 'Vous ne pouvez pas être paralysé par des choix que vous n\'avez pas réellement.',
				video: null,
			},
			{
				id: 'path-of-least-resistance',
				title: 'Percevoir le chemin de moindre résistance',
				description: 'Reconnaître quelle direction nécessite le moins de lutte psychologique.',
				video: {
					duration: 1147,
					thumbnail: 'https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-01.png',
					url: 'https://assets.tailwindcss.com/templates/compass/path-of-least-resistance.mp4',
				},
			},
			{
				id: 'surrendering-outcome',
				title: 'Se rendre au résultat',
				description: 'Accepter que quel que soit le chemin que vous choisissez, il n\'a aucune incidence sur l\'endroit où vous irez.',
				video: {
					duration: 1423,
					thumbnail: 'https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-05.png',
					url: 'https://assets.tailwindcss.com/templates/compass/surrendering-outcome.mp4',
				},
			},
		],
	},
]
