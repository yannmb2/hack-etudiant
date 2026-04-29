import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs/promises";
import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import pdf from "pdf-parse/lib/pdf-parse.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const SYSTEM_PROMPT = `Tu es un conseiller d'orientation expert spécialisé dans la rédaction de lettres de motivation et dossiers d'inscription pour l'enseignement supérieur français (Parcoursup, écoles post-bac, BTS, BUT, licences, grandes écoles).

## Contexte
Tu aides des lycéens et étudiants à transformer une ébauche de motivation personnelle en un document professionnel et convaincant, en t'appuyant sur leurs documents académiques pour ancrer le discours dans des faits concrets.

## Ta mission
À partir des entrées fournies, génère une lettre de motivation qui :

1. **Respecte la voix de l'étudiant** : reformule sans trahir. Conserve son authenticité, évite le registre trop formel ou générique.
2. **Ancre dans les faits** : utilise les données des bulletins ou documents fournis (moyenne, mention, progression, appréciation) pour illustrer les qualités évoquées. Cite précisément si possible.
3. **Structure narrative claire** :
   - Accroche : pourquoi cette formation, pourquoi maintenant
   - Parcours académique : points forts pertinents pour la formation visée
   - Expériences ou projets complémentaires (si disponibles dans les documents)
   - Projet professionnel ou personnel : où l'étudiant veut aller
   - Conclusion d'ouverture : demande formelle
4. **Adapte le registre** à la formation :
   - BTS/BUT : côté concret, professionnel, terrain
   - École de commerce/management : ambition, leadership, projet
   - Licence universitaire : curiosité intellectuelle, rigueur
   - Grande École : excellence académique, engagement
5. **Longueur cible** : 300–450 mots (1 page max)

## Règles strictes
- Ne fabrique jamais de faits absents des documents fournis
- Si aucun document n'est fourni, génère quand même une lettre solide à partir du texte de motivation, mais signale qu'elle gagnerait à être étayée par des données académiques
- Signale en fin de lettre les passages basés sur une inférence plutôt qu'un document

## Format de sortie
Retourne UNIQUEMENT le texte de la lettre, sans titre, sans commentaires avant ou après, directement prêt à copier-coller.
Termine par une section séparée par "---" avec les "Fondements utilisés" et les "Suggestions d'amélioration".`;

// baseUrl = host only, sans /api — la librairie ollama ajoute /api/chat automatiquement
// Local  : http://localhost:11434
// Cloud  : https://ollama.com
const model = new ChatOllama({
  baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  model: process.env.OLLAMA_MODEL || "llama3.2",
  temperature: 0.7,
  headers: process.env.OLLAMA_API_KEY
    ? { Authorization: `Bearer ${process.env.OLLAMA_API_KEY}` }
    : {},
});

app.post("/api/generate-letter", upload.array("documents", 5), async (req, res) => {
  try {
    const { motivation, formationNom, pastedNotes } = req.body;

    if (!motivation || motivation.trim().length < 10) {
      return res.status(400).json({ success: false, error: "Le texte de motivation est trop court." });
    }

    let documentsText = "";

    // Extract text from uploaded files (PDF or text)
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const data = await fs.readFile(file.path);
          if (file.mimetype === "application/pdf") {
            const pdfData = await pdf(data);
            documentsText += `\n\n--- Document : ${file.originalname} ---\n${pdfData.text}`;
          } else {
            documentsText += `\n\n--- Document : ${file.originalname} ---\n${data.toString("utf-8")}`;
          }
        } catch (err) {
          console.warn(`Impossible de lire ${file.originalname}:`, err.message);
        } finally {
          await fs.unlink(file.path).catch(() => {});
        }
      }
    }

    // Add manually pasted notes
    if (pastedNotes && pastedNotes.trim()) {
      documentsText += `\n\n--- Notes / Bulletins (texte collé) ---\n${pastedNotes.trim()}`;
    }

    const humanMessage = `Formation cible : ${formationNom || "Non précisée"}

Texte de motivation de l'étudiant :
${motivation.trim()}

${documentsText ? `Documents fournis :${documentsText}` : "Aucun document fourni — génère la lettre à partir du texte de motivation uniquement."}

Génère la lettre de motivation maintenant.`;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_PROMPT],
      ["human", "{input}"],
    ]);

    const chain = prompt.pipe(model).pipe(new StringOutputParser());
    const result = await chain.invoke({ input: humanMessage });

    res.json({ success: true, letter: result });
  } catch (error) {
    console.error("Erreur génération :", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
