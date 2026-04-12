# Dépendances épinglées — raisons

## `lucide-react` (épinglé à `0.x`)

**Ne pas upgrader vers v1.0+** — la v1 a supprimé toutes les icônes de marques, notamment :
- `Github` → utilisé dans `WhyMeContent.tsx` et `expandable-section.tsx`
- `Linkedin` → utilisé dans `WhyMeContent.tsx`

**Pour migrer vers v1** : remplacer ces icônes par leurs équivalents `simple-icons` (déjà une dépendance du projet). Voir `src/components/ui/expandable-section.tsx` et `src/app/[locale]/why-me/WhyMeContent.tsx`.

---

## `i18next` (épinglé à `v25`)

**Ne pas upgrader vers v26+** — v26 est une release majeure avec breaking changes :
- Suppression de `interpolation.format` (remplacé par `i18next.services.formatter`)
- Suppression de `initImmediate` (remplacé par `initAsync`)
- Suppression de `showSupportNotice`
- `compatibilityJSON` n'accepte plus que `'v4'`

**Risque principal** : casser `next-i18n-router` qui dépend des internals d'i18next pour gérer le routing i18n. À vérifier que `next-i18n-router` supporte i18next v26 avant de migrer.

---

## `typescript` ⚠️ Note de migration v5 → v6

TypeScript 6 a été installé. Le `tsconfig.json` a été mis à jour avec un champ `types` explicite pour assurer la compatibilité :

```json
"types": ["node", "react", "react-dom"]
```

Sans ce champ, TypeScript 6 ne découvre plus automatiquement les packages `@types/*` (`types: []` par défaut).
