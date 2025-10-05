# 🚨 ACTION IMMÉDIATE - À faire maintenant

## Le problème en une phrase

Tu as **22 cours avec `parent_course = null`** au lieu d'avoir **1 cours parent + 21 chapitres**.

## Ce que tu dois faire MAINTENANT

### 1️⃣ Configure ton `.env.local` (si pas fait)

```bash
cd /home/andycinquin/clonedrepo/PortefolioV6

cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://192.168.1.128:3000
NEXT_PUBLIC_API_TOKEN=ton_token_strapi
EOF
```

Remplace `ton_token_strapi` par ton vrai token.

### 2️⃣ Lance le diagnostic

```bash
pnpm run check:structure
```

**Ce script va te dire exactement :**
- Combien de cours ont `parent_course = null` (actuellement 22, devrait être 1)
- Quels sont ces cours
- Combien ont un `parent_course` défini (actuellement 0, devrait être 21-22)

**📤 ENVOIE-MOI LE RÉSULTAT DE CE SCRIPT !**

### 3️⃣ Corrige dans Strapi (après avoir vu le diagnostic)

**Ce que tu vas probablement devoir faire :**

1. **Choisis ton cours parent** :
   - Probablement "Frameworks JavaScript - Formation Complète"
   - Laisse-le avec `parent_course = null`

2. **Pour TOUS les autres cours** (EXO 01, Typescript, Testing, etc.) :
   - Dans Strapi admin : Content Manager > Course
   - Ouvre chaque cours
   - Définis le champ `parent_course` → sélectionne "Frameworks JavaScript - Formation Complète"
   - Définis `order` : 1, 2, 3, 4, etc. (pour l'ordre des chapitres)
   - Sauvegarde

3. **Vérifie dans Content-Type Builder** :
   - Course > Fields
   - Tu dois avoir :
     - `parent_course` (Relation: Many-to-One with Course)
     - `chapters` (Relation: One-to-Many with Course, mapped by parent_course)
   - Si `chapters` n'existe pas, ajoute-la comme relation inverse

### 4️⃣ Teste

```bash
# Relance le diagnostic
pnpm run check:structure

# Devrait maintenant afficher :
# - 1 parent course
# - 21-22 chapters

# Lance le dev
pnpm run dev

# Ouvre http://localhost:3000/fr/course
```

---

## 🆘 Besoin d'aide ?

**Lance d'abord** : `pnpm run check:structure`

**Puis envoie-moi** le résultat complet du script. Je te dirai exactement quoi faire ensuite.

---

## 🎯 Résultat attendu

Après correction, tu devrais voir sur `/fr/course` :

```
Mes Cours de Développement

1              21-22          X
Cours complets Chapitres      Leçons

[Une seule card affichée : "Frameworks JavaScript - Formation Complète"]
```
