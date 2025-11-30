---
sidebar_position: 2
sidebar_label: "Python"
---

## Concepts maîtrisés

### Variables (Semaine 1)
Les variables stockent des données...
[explique avec TES mots]

### Boucles for (Semaine 3)
Une boucle for permet de...
[explique avec TES mots]
```
## Système de "challenges" pour rester motivée

### Challenge hebdomadaire
```
Semaine 1 : Script qui affiche "Hello [ton nom]"
Semaine 2 : Calculatrice simple (+, -, *, /)
Semaine 3 : Script de backup (simple)
Semaine 4 : Health check qui ping 3 IPs
Semaine 5 : Lire un fichier et compter les lignes
Semaine 6 : Parser un fichier JSON
[...]

```
**Règle :** Tu ne peux PAS passer à la semaine suivante sans avoir RÉUSSI le challenge.

### Gamification
```
Points :
- Exercice réussi du premier coup : 10 pts
- Exercice avec aide Claude (indices) : 5 pts
- Exercice copié-collé : 0 pt

Objectif : 100 pts/semaine

Récompense (ex) :
- 500 pts → T'acheter un bouquin Python
- 1000 pts → Acheter un composant homelab

```
## Comment gérer le découragement

### C'est NORMAL de galérer
```
❌ Faux : "Je ne comprends rien, je suis nulle en code"
✅ Vrai : "Je débute, c'est normal de bloquer. Ça va venir."

❌ Faux : "J'aurais dû comprendre en 5 minutes"
✅ Vrai : "Tout le monde galère au début, même les pros"
```

### Règle des 20 minutes
```
Si tu bloques plus de 20 min sur un exercice :
1. Prends une pause (5 min)
2. Réexplique le problème à voix haute
3. Demande à Claude un INDICE (pas la solution)
4. Si toujours bloquée → Passe à l'exercice suivant
5. Reviens dessus le lendemain (cerveau aura digéré)
```

### Célèbre les petites victoires
```
✅ Premier script qui marche ? → CELEBRATE !
✅ Bug corrigé tout seul ? → CELEBRATE !
✅ Concept compris ? → CELEBRATE !

Pas besoin d'avoir fait un projet énorme.
Chaque petit pas compte.
```
---

## Plan d'action immédiat (cette semaine)

### Lundi (aujourd'hui ?)
```
✅ Setup Docusaurus (déjà prévu)
✅ Installer Python + VS Code
📝 Créer homelab-docs/docs/apprentissage/python.md
```

### Mardi
```
📚 Automate the Boring Stuff - Chapitre 1 (10 min)
💻 Exercices variables (20 min)
📝 Documenter ce que tu as appris (5 min)
```

### Mercredi
```
🔁 Révision variables (5 min)
📚 Chapitre 2 - Flow control (10 min)
💻 Exercices if/else (20 min)
📝 Documentation (5 min)
```

### Jeudi
```
🔁 Révision if/else (5 min)
💻 Challenge : Créer une calculatrice simple (30 min)
📝 Documentation (5 min)
```

### Vendredi
```
🔁 Révision générale (10 min)
💻 Améliorer la calculatrice (20 min)
📝 Bilan de la semaine dans Docusaurus (10 min)
```

### Samedi (projet pratique)
```
💻 Créer ton premier script utile pour le homelab (2h)
Exemple : Script qui ping OPNsense et Proxmox et affiche le statut

```
### Dimanche (repos ou révision légère)
```

📚 Lire sur Python (sans coder) - 30 min
📝 Planifier la semaine suivante

```
## Réponses à tes questions sur l'IA

### "Comment savoir si je me repose trop sur l'IA ?"

**Test simple :**
```

Peux-tu refaire l'exercice SANS Claude, de mémoire ?
→ Oui : Tu as appris ✅
→ Non : Tu as copié-collé ❌

```
### "Quand demander de l'aide à l'IA ?"

**Règle des 15-20 minutes :**
```

0-15 min : Cherche TOI-MÊME (Google, doc, essais)
15-20 min : Demande un INDICE à Claude
20+ min : Demande plus d'aide (mais comprends chaque ligne)

```
### "Comment poser de bonnes questions à l'IA ?"

**❌ Mauvaise question :**
```

"Fais-moi un script Python pour backup"
→ Tu vas copier-coller sans comprendre

```
**✅ Bonne question :**
```
"Je veux créer un script de backup. J'ai pensé à utiliser subprocess 
pour lancer qm snapshot. Est-ce la bonne approche ? 
Donne-moi juste les grandes étapes, pas le code complet."

```
## Ta mission pour les 7 prochains jours
```
Jours 1-7 : Automate the Boring Stuff Chapitres 1-2
✅ Variables et types de données
✅ Conditions (if/else)
✅ 1 exercice par jour (minimum)
✅ Documenter dans Docusaurus

Challenge semaine 1 : Script "Hello Homelab"
→ Demande ton nom
→ Affiche "Bienvenue [nom] dans ton homelab !"
→ Affiche la date et l'heure