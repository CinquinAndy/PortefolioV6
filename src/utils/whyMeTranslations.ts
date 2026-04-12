'use client'

import type { Locale } from '@/types/strapi'

const translations = {
	en: {
		hero: {
			intro:
				'Andy, 27 years old, passionate, ultra-active, and way too eager to learn and level up. Check out that insane GitHub activity — no cheating here, it\'s 100% real! Even if I commit a lot by habit, just look at how few "grey" days there are over the past year!',
			moreInfo:
				"I'm intentionally leaving out a lot of skills and experiences here, only because that's not what I'm looking for today. If you want to see everything I've done, explore my",
			portfolioLink: '/portefolio',
			portfolioSuffix: ':D',
			javaJoke: "→ Yes, I know what Java is, and no, I don't want to touch it! (^^)",
			javaException:
				"~ Unless it's truly a life-or-death situation, or you're the best team in the world — in that case, I can make an effort ❤️!",
		},
		github: {
			caption: 'Just look at the number of "grey" days over the last year — not many! 🚀',
			checkItOut: 'Check it out! →',
		},
		intro: {
			knowCantJudge: "I know you can't judge just by that, so let's dive deeper into my skills and story.",
			touchEverything: '→ I dabble in a bit of everything, actually.',
		},
		tech: {
			title: 'Tech Stack',
			summary: 'Linux enthusiast, self-hosted infra, and Next.js lover',
			linux: {
				title: 'Linux',
				description:
					"I've been daily-driving Fedora for a few years now, so I know the environment well. I have my workflow habits and feel right at home in the terminal.",
			},
			servers: {
				title: 'Servers & Infrastructure',
				description:
					"Infra/archi-wise, I tinker often. I've tested plenty of PaaS and configured my own servers. Started with Apache and native services, then migrated to CapRover, and now Coolify. Today, I have 55+ services running on a €20/month VPS at Netcup! (And it runs without any issues!) ~ It keeps growing as needs, creations, and new ideas come up ;D! I've also deployed with GCP for a client (healthcare in France), as well as with AWS and Vercel (with Wildlife.la).",
			},
			cicd: {
				title: 'CI/CD',
				description:
					"GitHub Actions, Docker, Dockerfile, scripting, GitLab CI, self-hosted workers — I've touched a lot. Today, I don't stress about it as much — Coolify handles it for me with Nixpacks.",
			},
			monitoring: {
				title: 'Monitoring & Alerting',
				description:
					"BetterUptime, then Kuma self-hosted. Now using Coolify's built-in tools. Haven't had the specific need for a complex alerting/monitoring setup yet (except Sentry on some projects).",
			},
			analytics: {
				title: 'Analytics',
				description: 'Google Analytics then Umami self-hosted — sometimes both depending on clients and needs!',
			},
			uiux: {
				title: 'UI/UX Design',
				description:
					"I've done a lot of front-end work, it's actually what I prefer! So naturally I learned Adobe Illustrator, Photoshop, and dabbled in Animate, Premiere Pro and After Effects. I master Figma, and I've used cool tools like Rive or Lottie for motion design. I design most of the projects I develop from A to Z (except for Wildlife, they had their own designers!).",
			},
			frontend: {
				title: 'Frontend',
				description:
					"I've touched many technologies today. Even if I can adapt, I have a very strong preference for the React ecosystem, and especially Next.js with libs around Shadcn / TailwindCSS.",
			},
		},
		projects: {
			title: 'Featured Projects',
			summary: 'The repos that best represent my Next.js skills ;)',
			beswib: {
				description:
					'The most complete: translations, preprod + prod, marketplace for running race bibs, designed by me from A to Z!',
				highlight: 'Most Complete',
			},
			forvoyez: {
				description: 'The full SaaS environment!',
				highlight: 'SaaS',
			},
			maeva: {
				description: 'The prettiest! Made for my little sister recently with lots of love and attention to detail.',
				highlight: 'Design Focus',
			},
			wildlife: {
				description:
					'The one that marked me the most: I greatly contributed to creating the F1 app — we got videos of Lewis Hamilton and Charles Leclerc both testing our app, insane! 🏎️',
				highlight: 'F1 Experience',
			},
			sticker: {
				description:
					"The one I'm most proud of: Wildlife trusted me 200% and gave me full responsibility. In a few weeks, I created an app that dynamically generates sticker images with an incredible user experience — then I saw it used at an AWS convention in Spain. Amazing! The feedback was fantastic: thousands of generations, hundreds of people super happy with the live experience! Whoa!",
				highlight: 'Most Proud',
			},
		},
		clientRelations: {
			title: 'Client Relations',
			summary: 'Freelance experience, teaching, and project leadership',
			p1: "Being a freelancer for a long time, I naturally have the ability to talk simply with anyone, gather client needs, engineer them, think them through, and adapt to other people's fields. That's what I've done in dozens and dozens of projects: websites, apps, e-commerce platforms... It's, I think, one of my greatest qualities: knowing how to speak in front of people, being able to listen, understand and adapt to my audience by making technical skills accessible.",
			p2: 'I also have the ability to pass on my skills — I gave classes in an engineering school for 3rd-year students.',
			p2Link: 'https://andy-cinquin.com/course/javascript-frameworks-training',
			p3: 'I can also lead a project from a commercial and administrative standpoint — like when I went to sign a specific contract to have the right to act as a marketplace by obtaining a partnership with PayPal US.',
			p3Link: 'https://beswib.com/',
		},
		openSource: {
			title: 'Open Source',
			summary: 'Contributing to 21st, Strapi, Obsidian, and more',
			intro: "I've contributed to quite a few Open Source projects, including:",
			projects: [
				'Strapi CMS',
				'Obsidian',
				'Components in 21st.dev (accepted to be listed publicly)',
				'WordPress plugins',
			],
			viewContributions: 'View my 21st.dev contributions',
		},
		personal: {
			title: 'Personal',
			summary: 'Marathon runner, hockey player, and gamer',
			p1: "I'm athletic — I ran a marathon in 2024 🏃 and I'm definitely planning to do another one in 2026!",
			p2: "I played ice hockey (even if I'm bad, I love this sport! 🏒)",
			p3: "I played way too many video games (before these last 6 years, when I still had time haha!), but I still finished Baldur's Gate 3 (whoa!) and Clair Obscur (WHOA!!!).",
			p4: 'I have a past on League of Legends where I created a semi-pro team back in the day! 🎮',
			p5: "I listen to a lot of music (everything, except rap!) and I'm originally from the Alps in France where I grew up my whole childhood! 🏔️",
		},
		links: {
			title: 'Find Me Everywhere',
			portfolio: { title: 'Portfolio', description: 'View all my recent projects' },
			github: { title: 'GitHub', description: 'Check my activity and repos' },
			linkedin: { title: 'LinkedIn', description: 'Connect professionally' },
			blog: { title: 'Blog', description: 'Random ramblings and tech articles' },
		},
	},
	fr: {
		hero: {
			intro:
				"Andy, 27 ans, passionné, ultra actif, et qui a trop envie d'apprendre et de progresser. Regarde l'activité folle sur GitHub — ce n'est pas du cheat, c'est 100 % vrai ! Même si je commit beaucoup par habitude, il suffit de regarder le nombre de jours \"gris\" sur l'année dernière !",
			moreInfo:
				"Je vais volontairement omettre beaucoup de compétences et d'expériences ici, mais uniquement car ce n'est pas ce que je cherche aujourd'hui. Si tu veux voir tout ce que j'ai fait, balade-toi dans mon",
			portfolioLink: '/portefolio',
			portfolioSuffix: ':D',
			javaJoke: "→ Oui, je sais ce que c'est Java, et non, je n'ai pas envie d'y toucher ! (^^)",
			javaException:
				"~ Sauf s'il y a vraiment une obligation de vie ou de mort, ou que vous êtes la meilleure équipe du monde, dans ce cas-là, je peux faire un effort ❤️ !",
		},
		github: {
			caption: 'Regarde le nombre de jours "gris" sur l\'année dernière — y\'en a pas beaucoup ! 🚀',
			checkItOut: 'Voir le profil ! →',
		},
		intro: {
			knowCantJudge:
				"Je sais qu'on ne peut pas se baser uniquement sur ça, donc on va aller plus en profondeur dans mes compétences et mon histoire.",
			touchEverything: '→ Je touche un peu à tout du coup.',
		},
		tech: {
			title: 'Stack Technique',
			summary: 'Fan de Linux, infra self-hosted, et amoureux de Next.js',
			linux: {
				title: 'Linux',
				description:
					"Je suis en daily sur Fedora depuis quelques années maintenant, donc je connais bien l'environnement, j'ai mes habitudes de travail.",
			},
			servers: {
				title: 'Serveurs & Infra',
				description:
					"Niveau infra/archi, je bidouille souvent. J'ai testé plein de PaaS et configuré mes propres serveurs. Au début, directement avec Apache et les services installés nativement, puis au fur et à mesure, j'ai migré vers des PaaS. D'abord CapRover, puis Coolify. Aujourd'hui, j'ai plus de 55 services qui tournent sur un VPS à 20 €/mois chez Netcup ! (Et il tourne sans aucun souci !). ~ Ça augmente encore petit à petit en fonction des besoins, des créations et des nouvelles idées ;D ! J'ai également fait du déploiement avec GCP pour un client (dans le médical en France), de même avec les outils d'AWS et sur Vercel (avec Wildlife.la).",
			},
			cicd: {
				title: 'CI/CD',
				description:
					"GitHub Actions, Docker, Dockerfile, scripting, GitLab CI, ou même des workers self-hosted, j'ai touché à pas mal de choses ces dernières années. Aujourd'hui, je me prends moins la tête sur ça, Coolify le fait pour moi avec Nixpacks.",
			},
			monitoring: {
				title: 'Monitoring & Alerting',
				description:
					"BetterUptime, puis Kuma en self-hosted. Aujourd'hui j'utilise les outils présents dans Coolify, et je n'ai pas encore eu la nécessité de mettre en place un système complexe (mis à part l'utilisation de Sentry sur certains projets).",
			},
			analytics: {
				title: 'Analytics',
				description:
					'Google Analytics puis Umami en self-hosted, parfois les deux en fonction des clients et des besoins !',
			},
			uiux: {
				title: 'UI/UX Design',
				description:
					"J'ai fait pas mal de choses en front, c'est même ce que je préfère. J'ai donc naturellement appris à utiliser Adobe Illustrator, Photoshop, et touché à Animate, Premiere Pro et After Effects. Je maîtrise Figma, et j'ai déjà touché à d'autres outils cools comme Rive ou Lottie pour faire du motion design. C'est moi qui designe de A à Z la plupart des projets que j'ai développés (sauf pour Wildlife, là, c'étaient des designers de leur côté !).",
			},
			frontend: {
				title: 'Frontend',
				description:
					"J'ai touché à beaucoup de technos aujourd'hui. Même si je suis capable de m'adapter, j'ai une très grande préférence pour l'environnement React, et tout particulièrement pour Next.js avec les libs autour de Shadcn / TailwindCSS.",
			},
		},
		projects: {
			title: 'Projets Phares',
			summary: 'Les repos qui représentent le mieux mes compétences Next.js ;)',
			beswib: {
				description:
					'Le plus complet : traductions, préprod + prod, marketplace pour les dossards de running, designé par mes soins de A à Z !',
				highlight: 'Le Plus Complet',
			},
			forvoyez: {
				description: "L'environnement SaaS complet !",
				highlight: 'SaaS',
			},
			maeva: {
				description:
					"Le plus joli ! Celui que j'ai fait pour ma petite sœur récemment avec beaucoup d'amour et d'attention aux détails.",
				highlight: 'Design Focus',
			},
			wildlife: {
				description:
					"Celui qui m'a le plus marqué : j'ai grandement participé à la création de l'application pour la F1 — on a eu le droit à des vidéos de Lewis Hamilton et Charles Leclerc qui ont tous les deux testé notre app, c'est fou ! 🏎️",
				highlight: 'Expérience F1',
			},
			sticker: {
				description:
					"Celui dont je suis le plus fier : Wildlife m'a fait confiance à 200 % et m'a donné l'entièreté de la charge. En quelques semaines, j'avais créé l'app qui génère des stickers dynamiquement avec une expérience utilisateur incroyable, puis je l'ai vue utilisée dans une convention AWS en Espagne. Les retours étaient fantastiques : des milliers de générations, des centaines de personnes ultra contentes ! Whaou !",
				highlight: 'Plus Fier',
			},
		},
		clientRelations: {
			title: 'Relation Client',
			summary: 'Expérience freelance, enseignement et leadership projet',
			p1: "Étant en freelance depuis longtemps, j'ai de fait la capacité de discuter simplement avec n'importe qui, de recueillir le besoin du client, de l'ingénierer, de le penser et de m'adapter aux métiers des autres. C'est ce que j'ai fait dans des dizaines et des dizaines de projets : sites web, applications, plateformes e-commerce... C'est, je pense, une de mes plus grandes qualités : savoir parler devant du monde, être capable d'écouter, de comprendre et de m'adapter à mon auditoire en vulgarisant les compétences et la technique.",
			p2: "D'ailleurs, j'ai également la capacité de transmettre mes compétences ; j'ai donné des cours dans une école d'ingénieurs pour des étudiants en 3e année.",
			p2Link: 'https://andy-cinquin.com/course/javascript-frameworks-training',
			p3: "Également, j'ai la capacité de mener un projet d'un point de vue démarche commerciale et administrative, typiquement ce que j'ai fait pour aller signer un contrat spécifique pour avoir le droit d'agir en tant que marketplace avec l'obtention d'un partenariat avec PayPal US.",
			p3Link: 'https://beswib.com/',
		},
		openSource: {
			title: 'Open Source',
			summary: 'Contributions à 21st, Strapi, Obsidian, et plus',
			intro: "J'ai participé à pas mal de contributions Open Source, notamment :",
			projects: [
				'Strapi CMS',
				'Obsidian',
				'Composants dans 21st.dev (acceptés pour être listés publiquement)',
				'Plugins WordPress',
			],
			viewContributions: 'Voir mes contributions 21st.dev',
		},
		personal: {
			title: 'Perso',
			summary: 'Marathonien, hockeyeur, et gamer',
			p1: "Je suis sportif — j'ai fait un marathon en 2024 🏃 et je compte en refaire certainement en 2026 !",
			p2: "J'ai fait du hockey sur glace (même si je suis nul, j'adore ce sport ! 🏒)",
			p3: "J'ai beaucoup trop joué à tout un tas de jeux vidéo (avant ces 6 dernières années, quand j'avais encore le temps ahah !), mais j'ai quand même fait Baldur's Gate 3 (wahou !) et Clair Obscur (Wahou !!!).",
			p4: "Et j'ai un passé sur League of Legends où j'avais créé une équipe semi-pro à l'époque ! 🎮",
			p5: "J'écoute beaucoup de musique (de tout, sauf du rap !) et je viens initialement des Alpes en France (là où j'ai grandi toute mon enfance !) 🏔️",
		},
		links: {
			title: 'Me Retrouver Partout',
			portfolio: { title: 'Portefolio', description: 'Voir tous mes projets récents' },
			github: { title: 'GitHub', description: 'Voir mon activité et repos' },
			linkedin: { title: 'LinkedIn', description: 'Se connecter professionnellement' },
			blog: { title: 'Blog', description: 'Articles tech et réflexions diverses' },
		},
	},
}

export type WhyMeTranslations = (typeof translations)['en']

export function getWhyMeTranslations(locale: Locale): WhyMeTranslations {
	return translations[locale] || translations.en
}
