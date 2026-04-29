# Analyse Descriptive de la Population Étudiante — L'Étudiant
## Draft de travail — 9 avril 2026

---

## 1. Deux Profils Étudiants Nommés

### Profil A — Inès, 17 ans · « Digital-First »

**Contexte :** Élève de Terminale générale (spé Maths / SES) à Montreuil (93). Mère employée administrative, père artisan. Première de sa famille à envisager une Grande École de commerce. Bourse échelon 3.

**Parcours d'orientation :**

| Phase | Action d'Inès | Touchpoint L'Étudiant | Données capturées aujourd'hui |
|-------|---------------|----------------------|------------------------------|
| Octobre 2025 | Google « classement école de commerce post-bac » | Article SEO letudiant.fr | Cookie analytics (anonyme) |
| Novembre 2025 | Compare ESSEC BBA vs IESEG vs Excelia sur le site | Pages formation | Pages vues (agrégées) |
| Décembre 2025 | S'inscrit au Salon IdF, télécharge QR code | Formulaire inscription salon | **Email, prénom, nom, classe, académie** |
| Janvier 2026 | Visite le salon pendant 2h40 — va sur 6 stands | Badge QR scanné par exposants | Scans exposants (données non centralisées par L'Étudiant) |
| Février 2026 | Revient sur letudiant.fr pour vérifier des infos | Articles + fiches formation | Cookie analytics (pas relié au profil salon) |
| Mars 2026 | Finalise vœux Parcoursup, ne revient plus | — | **RUPTURE — Aucun suivi** |

**Le gap critique :** L'Étudiant capte l'inscription au salon et sait qu'Inès a visité. Mais l'entreprise ne sait pas quels stands elle a réellement visités (les données de scan restent chez les exposants), ne peut pas relier sa navigation web à son profil salon, et n'a aucun mécanisme de relance personnalisée post-salon. Inès repart avec des brochures papier qu'elle perdra. Le moment où elle a le plus besoin d'aide — arbitrer entre ses vœux Parcoursup en février — est exactement celui où L'Étudiant la perd.

**Ce qu'un suivi post-fair changerait :** Un récapitulatif personnalisé envoyé 48h après le salon avec les fiches des formations visitées, les dates de JPO correspondantes, et un comparateur intégré lui éviterait de repartir de zéro. C'est la différence entre "un événement ponctuel" et "un accompagnement".

---

### Profil B — Mattéo, 18 ans · « Walk-in »

**Contexte :** Élève de Terminale STMG à Beauvais (60). Accompagné au salon par son lycée (groupe scolaire). N'a jamais consulté letudiant.fr. Envisage vaguement le BTS commerce ou un BUT TC, mais sans conviction. Parents peu impliqués dans l'orientation.

**Parcours d'orientation :**

| Phase | Action de Mattéo | Touchpoint L'Étudiant | Données capturées aujourd'hui |
|-------|------------------|----------------------|------------------------------|
| Janvier 2026 | Arrive au salon via son lycée. Inscrit par l'enseignant (inscription groupe). | Inscription groupe scolaire | **Lycée, classe, académie** — pas de données individuelles |
| Pendant le salon | Déambule 1h30. Va au stand BTS du lycée voisin, puis au stand alternance. Passe 20 min à une conférence alternance. | Espace salon physique | **RIEN — aucun scan, aucun tracking** |
| Après le salon | Ne va jamais sur letudiant.fr. Parle avec son prof principal. | — | — |
| Mars 2026 | Met un vœu BTS MCO et un vœu BUT TC sans conviction. | — | — |

**Le gap critique :** Mattéo est un visiteur *invisible*. Son inscription de groupe ne génère pas de profil individuel. Il n'a pas scanné son QR code sur les stands (le geste n'est pas naturel pour un lycéen qui n'a pas préparé sa visite). L'Étudiant ne sait même pas qu'il a assisté à la conférence sur l'alternance — alors que c'est l'information la plus précieuse sur ses intentions. Il repart sans aucun contenu à revoir, et L'Étudiant n'a aucun moyen de le recontacter.

**Ce qu'un suivi post-fair changerait :** Si Mattéo avait été incité à scanner un QR code en entrant dans la conférence, et si ce scan déclenchait un micro-profil avec opt-in minimal (email + centres d'intérêt), il recevrait un résumé ciblé « alternance + BTS/BUT commerce » avec des témoignages d'étudiants. Pour un profil comme le sien — faiblement engagé, peu accompagné — ce type de relance post-salon peut faire la différence entre un vœu Parcoursup éclairé et un vœu par défaut.

---

## 2. Architecture de Capture de Données

### 2.1 Cartographie de l'existant

| Source de données | Ce qui est capté | Limites |
|-------------------|-----------------|---------|
| Inscription en ligne au salon | Email, nom, prénom, classe, académie, lycée | Données déclaratives, pas de suivi comportemental |
| QR code d'entrée au salon | Horodatage d'entrée | Pas de suivi intra-salon |
| Scans exposants (badge QR) | Visiteur X a visité stand Y | **Données détenues par chaque exposant, non centralisées** |
| Inscription groupe scolaire | Lycée, classe, effectif | **Pas de données individuelles** |
| Navigation letudiant.fr | Pages vues, temps passé | **Non relié au profil salon (cookies séparés)** |
| App Salon L'Étudiant | Liste favoris, plan | Faible taux d'adoption, données en silo |

### 2.2 Données manquantes par phase

#### AVANT le salon

| Donnée manquante | Valeur pour la personnalisation | Mécanisme de collecte proposé | Base légale RGPD | Contrainte identifiée |
|------------------|---------------------------------|-------------------------------|-------------------|----------------------|
| Centres d'intérêt (filières, métiers) | Permettrait de recommander un parcours de visite | Questionnaire optionnel lors de l'inscription en ligne (3-5 questions) | **Consentement** (Art. 6.1.a) — case opt-in explicite, non pré-cochée | Mineurs <15 ans : consentement parental conjoint requis (Art. 8 RGPD + Art. 45 Loi Informatique et Libertés). Formulaire à adapter. |
| Niveau d'avancement Parcoursup | Adapter le discours (découverte vs. arbitrage final) | Question intégrée au formulaire d'inscription (« J'ai déjà fait mes vœux / Je suis en exploration ») | **Consentement** (même formulaire, même opt-in) | Donnée facultative, ne pas conditionner l'accès au salon |

#### PENDANT le salon

| Donnée manquante | Valeur | Mécanisme proposé | Base légale RGPD | Contrainte |
|------------------|--------|-------------------|-------------------|------------|
| Stands visités (centralisé) | Cœur du récap post-fair | **QR code bidirectionnel** : le visiteur scanne un code sur chaque stand (via app ou caméra native). Les données remontent à L'Étudiant, pas à l'exposant seul. | **Consentement** (opt-in au scan, information claire au point de scan : « Scannez pour retrouver cette formation dans votre récap post-salon ») | Technique : nécessite QR codes générés par L'Étudiant sur chaque stand + API de remontée. Exposant : accord contractuel pour afficher le QR L'Étudiant. |
| Conférences assistées | Signal d'intention fort (thématique) | **QR code à l'entrée de chaque salle de conférence**, scanné pour entrer ou pour « recevoir le support ». | **Intérêt légitime** (Art. 6.1.f) — mesure d'audience anonyme. Si personnalisé → **Consentement**. | Fluidité : le scan ne doit pas créer de file d'attente. Alternative : scan optionnel à la sortie « Recevez le replay ». |
| Temps passé par stand | Mesure de l'engagement réel | **Non recommandé** — tracking Bluetooth/WiFi trop intrusif pour le contexte (mineurs, événement éducatif). Remplacer par le proxy « nombre de stands scannés ». | N/A — on écarte volontairement | Analyse proportionnalité RGPD : tracking géolocalisé de mineurs dans un salon public → risque CNIL élevé, bénéfice marginal. |
| Profil individuel pour groupes scolaires | Permettre un suivi post-fair pour les walk-in type Mattéo | **Borne d'activation à l'entrée du salon** : le lycéen crée un micro-profil (prénom + email + 1 centre d'intérêt) sur tablette, reçoit un QR individuel. | **Consentement** (explicite, granulaire : « Je souhaite recevoir un récap personnalisé de ma visite ») | Mineurs : mention légale adaptée. Refus = accès salon garanti sans restriction. Opt-in ≠ condition d'accès. |

#### APRÈS le salon

| Donnée manquante | Valeur | Mécanisme proposé | Base légale RGPD | Contrainte |
|------------------|--------|-------------------|-------------------|------------|
| Engagement post-salon (ouverture email, clics) | Mesurer l'impact réel du salon | Tracking email standard (pixel + UTM) dans le récap post-salon | **Intérêt légitime** (Art. 6.1.f) — relation existante, mesure de performance, faible intrusivité | Opt-out facile (lien de désinscription). Durée de conservation : 12 mois post-salon max. |
| Feedback qualitatif | Améliorer les prochains salons | Micro-survey intégré au récap (3 questions max, NPS + question ouverte) | **Consentement** (réponse = acte volontaire) | Ne pas conditionner l'accès au récap à la réponse au survey |
| Conversion Parcoursup | Savoir si le salon a influencé les vœux | **Impossible à capter directement** — Parcoursup ne partage pas de données. Proxy : demander en juin « Avez-vous candidaté à l'une des formations découvertes au salon ? » | **Consentement** (email de relance avec opt-in préalable pour contact post-salon) | Dépend de l'engagement initial. Taux de réponse attendu faible (~10-15%). |

### 2.3 Résumé RGPD — Tableau de conformité

| Point de collecte | Base légale | Information requise | Droit d'opposition | Durée de conservation | Attention mineurs |
|-------------------|-------------|--------------------|--------------------|----------------------|-------------------|
| Inscription salon | Consentement | Notice + CGU | Retrait = suppression | Jusqu'au salon + 30j si pas d'opt-in post | Oui (<15 ans : consentement parental) |
| Questionnaire pré-salon | Consentement | Mention sous le formulaire | Retrait | 12 mois post-salon | Oui |
| QR code stands | Consentement | Panneau au point de scan | Refus de scan = aucun impact | 12 mois post-salon | Oui |
| QR code conférences | Intérêt légitime (anonyme) / Consentement (nominatif) | Annonce orale + panneau | Opt-out post | 12 mois post-salon | Oui |
| Borne activation groupes | Consentement | Écran de la borne | Non-participation libre | 12 mois post-salon | Oui — mention spécifique |
| Email récap post-salon | Consentement (collecté lors de l'inscription) | Dans l'email : lien désinscription | Désinscription 1-clic | 12 mois | — |
| Micro-survey post | Consentement (acte volontaire) | Mention en intro du survey | Non-réponse | 24 mois (analyse agrégée) | — |

---

## 3. Hypothèses et Limites de cette Analyse

**Données simulées — hypothèses explicites :**
- Les profils d'Inès et Mattéo sont des personas construites, pas des individus réels. Ils synthétisent des comportements observables dans le contexte des salons L'Étudiant (inscription en ligne vs. groupe scolaire, profil académique diversifié).
- Les chiffres de temps de visite (2h40 pour Inès, 1h30 pour Mattéo) sont des moyennes estimées à partir des durées typiques de salons éducatifs de grande taille.
- L'hypothèse que les données de scan exposant ne sont pas centralisées par L'Étudiant est à vérifier avec l'équipe technique le 10 avril — c'est un point bloquant pour l'architecture proposée.
- Le taux d'adoption de l'app Salon est estimé faible (<20% des visiteurs) sur la base de benchmarks marché pour les apps événementielles grand public.

---

*Ce document constitue le draft de travail en vue de la réunion du 10 avril. L'analyse descriptive complète est attendue pour le 19 avril.*