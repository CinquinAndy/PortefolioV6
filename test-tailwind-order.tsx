// Fichier de test pour vérifier l'ordre des classes Tailwind
export default function TestComponent() {
	return (
		<div className="grid w-full grid-cols-12 gap-[20px] xl:gap-[60px] md:gap-[40px] 2xl:gap-[80px] 2xl:gap-y-[150px]">
			<div className="m-2 rounded-lg bg-blue-500 p-4 text-white shadow-lg transition-colors hover:bg-blue-600">
				Test
			</div>
		</div>
	)
}
