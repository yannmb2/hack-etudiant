import { useState } from "react";
import MotivationLetter from "./MotivationLetter";

const INES_DATA = {
  name: "Inès",
  visitDate: "25 janvier 2026",
  duration: "2h40",
  standsVisited: 6,
  conferencesAttended: 1,
  profile: {
    classe: "Terminale générale",
    specialites: ["Mathématiques", "SES"],
    interets: ["École de commerce post-bac", "Alternance"],
    parcoursup: "En cours de saisie des vœux"
  },
  stands: [
    {
      id: 1,
      name: "ESSEC Business School — BBA",
      category: "Grande École de Commerce",
      matchScore: 94,
      matchReason: "Correspond à tes spécialités Maths + SES et ton intérêt pour le commerce international",
      jpo: "8 février 2026",
      jpoLink: "#",
      admissionDeadline: "12 mars 2026",
      brochureAvailable: true,
      contact: "admission-bba@essec.edu",
      scannedAt: "10h15"
    },
    {
      id: 2,
      name: "IÉSEG School of Management",
      category: "Grande École de Commerce",
      matchScore: 89,
      matchReason: "Programme post-bac en 5 ans, forte dimension internationale, accessible sans prépa",
      jpo: "15 février 2026",
      jpoLink: "#",
      admissionDeadline: "15 mars 2026",
      brochureAvailable: true,
      contact: "admissions@ieseg.fr",
      scannedAt: "10h45"
    },
    {
      id: 3,
      name: "Excelia Business School",
      category: "Grande École de Commerce",
      matchScore: 82,
      matchReason: "Programme boursier intéressant, campus à La Rochelle ou Tours, bon réseau alternance",
      jpo: "22 février 2026",
      jpoLink: "#",
      admissionDeadline: "20 mars 2026",
      brochureAvailable: false,
      contact: "info@excelia-group.com",
      scannedAt: "11h20"
    },
    {
      id: 4,
      name: "IUT Paris-Rives de Seine — BUT TC",
      category: "IUT / BUT",
      matchScore: 76,
      matchReason: "Parcours court (3 ans) en commerce, accessible et professionnalisant — bon plan B sécurisant",
      jpo: "1er mars 2026",
      jpoLink: "#",
      admissionDeadline: "Parcoursup",
      brochureAvailable: true,
      contact: null,
      scannedAt: "12h00"
    },
    {
      id: 5,
      name: "CFA Commerce et Distribution",
      category: "Alternance",
      matchScore: 71,
      matchReason: "Tu as assisté à la conférence alternance — l'alternance dès le post-bac est possible ici",
      jpo: null,
      jpoLink: null,
      admissionDeadline: "Recrutement continu",
      brochureAvailable: false,
      contact: "contact@cfa-cd.fr",
      scannedAt: "12h25"
    },
    {
      id: 6,
      name: "Région Île-de-France — Espace Orientation",
      category: "Conseil orientation",
      matchScore: null,
      matchReason: null,
      jpo: null,
      jpoLink: null,
      admissionDeadline: null,
      brochureAvailable: false,
      contact: null,
      scannedAt: "11h50"
    }
  ],
  conference: {
    title: "L'alternance dans le supérieur : mode d'emploi",
    date: "25 janvier 2026 — 11h30",
    summary: "Les intervenants ont présenté les avantages de l'alternance dès le post-bac : financement, expérience, employabilité. Secteurs porteurs : commerce, digital, logistique.",
    replayAvailable: true
  },
  recommendations: [
    {
      type: "action",
      priority: "high",
      icon: "📅",
      text: "JPO ESSEC BBA le 8 février — dans 14 jours",
      subtext: "Inscription obligatoire. Tu peux poser tes questions sur les bourses."
    },
    {
      type: "action",
      priority: "high",
      icon: "📝",
      text: "Date limite vœux Parcoursup : 13 mars",
      subtext: "Il te reste 47 jours pour finaliser. Pense à ajouter le BUT TC en vœu de sécurité."
    },
    {
      type: "suggestion",
      priority: "medium",
      icon: "💡",
      text: "As-tu pensé au concours Sésame ?",
      subtext: "Il donne accès à ESSEC BBA et IÉSEG en une seule candidature. Inscriptions jusqu'au 25 mars."
    },
    {
      type: "content",
      priority: "low",
      icon: "📖",
      text: "Article : « École de commerce post-bac : comment choisir ? »",
      subtext: "Comparatif des programmes en 4 et 5 ans sur letudiant.fr"
    }
  ]
};

const ScoreBar = ({ score }) => {
  const color = score >= 90 ? "#16a34a" : score >= 80 ? "#2563eb" : score >= 70 ? "#7c3aed" : "#94a3b8";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", border: `3px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15, color }}>
        {score}
      </div>
    </div>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    high: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", label: "Urgent" },
    medium: { bg: "#fffbeb", color: "#d97706", border: "#fde68a", label: "Suggestion" },
    low: { bg: "#f0f9ff", color: "#2563eb", border: "#bfdbfe", label: "À lire" }
  };
  const s = styles[priority];
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
      textTransform: "uppercase", padding: "2px 8px", borderRadius: 4,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`
    }}>{s.label}</span>
  );
};

export default function PostFairRecap() {
  const [activeTab, setActiveTab] = useState("formations");
  const [expandedCard, setExpandedCard] = useState(null);
  const d = INES_DATA;

  return (
    <div style={{
      fontFamily: "'Source Serif 4', 'Georgia', serif",
      background: "#fafaf9",
      minHeight: "100vh",
      color: "#1c1917"
    }}>
      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        color: "#fff",
        padding: "32px 24px 28px"
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6, background: "#e11d48",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800, fontFamily: "'DM Mono', monospace", color: "#fff"
            }}>É</div>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.7, fontFamily: "system-ui, sans-serif" }}>
              L'Étudiant — Récap Post-Salon
            </span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, margin: "0 0 8px" }}>
            Bonjour {d.name} 👋
          </h1>
          <p style={{ fontSize: 16, opacity: 0.8, margin: 0, lineHeight: 1.5, fontFamily: "system-ui, sans-serif" }}>
            Voici le résumé de ta visite au Salon de l'Étudiant IdF du {d.visitDate}.
          </p>

          {/* Stats bar */}
          <div style={{
            display: "flex", gap: 24, marginTop: 20, padding: "14px 0",
            borderTop: "1px solid rgba(255,255,255,0.15)"
          }}>
            {[
              { value: d.duration, label: "de visite" },
              { value: d.standsVisited, label: "stands visités" },
              { value: d.conferencesAttended, label: "conférence" }
            ].map((stat, i) => (
              <div key={i} style={{ fontFamily: "system-ui, sans-serif" }}>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'DM Mono', monospace" }}>{stat.value}</div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECOMMENDATION LOGIC ANNOTATION */}
      <div style={{
        maxWidth: 640, margin: "0 auto", padding: "0 24px"
      }}>
        <div style={{
          background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 8,
          padding: "12px 16px", marginTop: 20, marginBottom: 8,
          fontFamily: "system-ui, sans-serif", fontSize: 12, lineHeight: 1.5
        }}>
          <strong style={{ color: "#92400e" }}>🔧 Logique de recommandation (visible pour review L'Étudiant) :</strong>
          <br />
          <span style={{ color: "#78350f" }}>
            Le <strong>score de pertinence</strong> est calculé à partir de 3 signaux : (1) correspondance spécialités × formation (pondération 40%), (2) cohérence avec les centres d'intérêt déclarés à l'inscription (30%), (3) temps passé sur le stand si disponible, sinon ordre chronologique de visite (30%). Les recommandations d'actions sont triées par urgence calendaire (dates limites proches en premier). L'article recommandé est tiré du contenu letudiant.fr le plus consulté dans la thématique « écoles de commerce post-bac ».
          </span>
        </div>
      </div>

      {/* ACTIONS PRIORITAIRES */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 24px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", fontFamily: "system-ui, sans-serif" }}>
          Tes prochaines étapes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {d.recommendations.map((rec, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 10, padding: "14px 16px",
              border: "1px solid #e7e5e4",
              display: "flex", gap: 12, alignItems: "flex-start",
              boxShadow: rec.priority === "high" ? "0 0 0 2px #fecaca" : "none"
            }}>
              <span style={{ fontSize: 20, lineHeight: 1 }}>{rec.icon}</span>
              <div style={{ flex: 1, fontFamily: "system-ui, sans-serif" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <PriorityBadge priority={rec.priority} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{rec.text}</div>
                <div style={{ fontSize: 13, color: "#78716c", marginTop: 2 }}>{rec.subtext}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "8px 24px 0" }}>
        <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #e7e5e4" }}>
          {[
            { key: "formations", label: "Formations visitées" },
            { key: "conference", label: "Conférence" },
            { key: "lettre", label: "✍️ Lettre de motivation" },
            { key: "profil", label: "Mon profil" }
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: "10px 16px", fontSize: 14, fontWeight: 600,
              fontFamily: "system-ui, sans-serif", background: "none", border: "none",
              borderBottom: activeTab === tab.key ? "2px solid #1e293b" : "2px solid transparent",
              marginBottom: -2, cursor: "pointer",
              color: activeTab === tab.key ? "#1e293b" : "#a8a29e"
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 24px 40px" }}>
        
        {activeTab === "formations" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {d.stands.filter(s => s.matchScore !== null).map(stand => (
              <div key={stand.id} onClick={() => setExpandedCard(expandedCard === stand.id ? null : stand.id)} style={{
                background: "#fff", borderRadius: 12, padding: "18px 20px",
                border: "1px solid #e7e5e4", cursor: "pointer",
                transition: "box-shadow 0.2s",
                boxShadow: expandedCard === stand.id ? "0 4px 20px rgba(0,0,0,0.08)" : "none"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#7c3aed", marginBottom: 4, fontFamily: "system-ui, sans-serif" }}>
                      {stand.category}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3, fontFamily: "system-ui, sans-serif" }}>
                      {stand.name}
                    </div>
                    <div style={{ fontSize: 13, color: "#78716c", marginTop: 4, fontFamily: "system-ui, sans-serif" }}>
                      Scanné à {stand.scannedAt}
                    </div>
                  </div>
                  <ScoreBar score={stand.matchScore} />
                </div>
                
                <div style={{
                  marginTop: 10, padding: "10px 12px", borderRadius: 8,
                  background: "#f5f3ff", fontSize: 13, lineHeight: 1.5,
                  fontFamily: "system-ui, sans-serif", color: "#4c1d95"
                }}>
                  💬 {stand.matchReason}
                </div>

                {expandedCard === stand.id && (
                  <div style={{
                    marginTop: 14, paddingTop: 14, borderTop: "1px solid #e7e5e4",
                    fontFamily: "system-ui, sans-serif", fontSize: 13
                  }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {stand.jpo && (
                        <div style={{ background: "#f0fdf4", padding: "10px 12px", borderRadius: 8 }}>
                          <div style={{ fontWeight: 700, color: "#166534", marginBottom: 2 }}>📅 Prochaine JPO</div>
                          <div style={{ color: "#15803d" }}>{stand.jpo}</div>
                        </div>
                      )}
                      {stand.admissionDeadline && (
                        <div style={{ background: "#fef2f2", padding: "10px 12px", borderRadius: 8 }}>
                          <div style={{ fontWeight: 700, color: "#991b1b", marginBottom: 2 }}>⏰ Date limite</div>
                          <div style={{ color: "#b91c1c" }}>{stand.admissionDeadline}</div>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                      {stand.brochureAvailable && (
                        <button style={{
                          padding: "8px 16px", borderRadius: 8, border: "1px solid #d6d3d1",
                          background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                          fontFamily: "system-ui, sans-serif"
                        }}>📄 Voir la brochure</button>
                      )}
                      {stand.contact && (
                        <button style={{
                          padding: "8px 16px", borderRadius: 8, border: "none",
                          background: "#1e293b", color: "#fff", fontSize: 13, fontWeight: 600,
                          cursor: "pointer", fontFamily: "system-ui, sans-serif"
                        }}>✉️ Contacter</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Non-scored visit */}
            <div style={{
              background: "#fafaf9", borderRadius: 12, padding: "14px 20px",
              border: "1px dashed #d6d3d1", fontFamily: "system-ui, sans-serif"
            }}>
              <div style={{ fontSize: 13, color: "#a8a29e" }}>
                Aussi visité : <strong style={{ color: "#78716c" }}>{d.stands.find(s => s.matchScore === null)?.name}</strong>
                <span style={{ marginLeft: 8, fontSize: 11, fontStyle: "italic" }}>(espace conseil, pas de score de pertinence)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "lettre" && <MotivationLetter />}

        {activeTab === "conference" && (
          <div style={{
            background: "#fff", borderRadius: 12, padding: "24px",
            border: "1px solid #e7e5e4"
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#e11d48", marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
              Conférence
            </div>
            <h3 style={{ fontSize: 19, fontWeight: 700, margin: "0 0 6px", fontFamily: "system-ui, sans-serif" }}>
              {d.conference.title}
            </h3>
            <p style={{ fontSize: 13, color: "#78716c", margin: "0 0 16px", fontFamily: "system-ui, sans-serif" }}>
              {d.conference.date}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#44403c", margin: "0 0 20px", fontFamily: "system-ui, sans-serif" }}>
              {d.conference.summary}
            </p>
            {d.conference.replayAvailable && (
              <button style={{
                padding: "12px 24px", borderRadius: 10, border: "none",
                background: "#1e293b", color: "#fff", fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "system-ui, sans-serif"
              }}>▶️ Voir le replay</button>
            )}
          </div>
        )}

        {activeTab === "profil" && (
          <div style={{
            background: "#fff", borderRadius: 12, padding: "24px",
            border: "1px solid #e7e5e4", fontFamily: "system-ui, sans-serif"
          }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>Mon profil orientation</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14 }}>
              <div>
                <div style={{ fontWeight: 600, color: "#78716c", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Classe</div>
                <div>{d.profile.classe}</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "#78716c", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Spécialités</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {d.profile.specialites.map((s, i) => (
                    <span key={i} style={{ background: "#f5f3ff", color: "#6d28d9", padding: "4px 10px", borderRadius: 6, fontSize: 13, fontWeight: 500 }}>{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "#78716c", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Centres d'intérêt</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {d.profile.interets.map((s, i) => (
                    <span key={i} style={{ background: "#f0fdf4", color: "#166534", padding: "4px 10px", borderRadius: 6, fontSize: 13, fontWeight: 500 }}>{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "#78716c", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Avancement Parcoursup</div>
                <div>{d.profile.parcoursup}</div>
              </div>
            </div>
            <div style={{
              marginTop: 20, padding: "12px 16px", borderRadius: 8,
              background: "#fffbeb", border: "1px solid #fde68a", fontSize: 13, lineHeight: 1.5
            }}>
              ✏️ Ces informations sont issues de ton inscription au salon et de tes scans sur place. Tu peux les modifier ou les supprimer à tout moment en nous contactant à <strong>donnees@letudiant.fr</strong> — conformément au RGPD.
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{
        borderTop: "1px solid #e7e5e4", padding: "20px 24px",
        textAlign: "center", fontFamily: "system-ui, sans-serif",
        fontSize: 12, color: "#a8a29e"
      }}>
        <p style={{ margin: "0 0 4px" }}>Ce récap a été généré automatiquement à partir de ta visite au salon.</p>
        <p style={{ margin: "0 0 8px" }}>Tu peux exercer tes droits (accès, rectification, suppression) à : donnees@letudiant.fr</p>
        <p style={{ margin: 0 }}>
          <a href="#" style={{ color: "#78716c", textDecoration: "underline" }}>Se désinscrire des communications</a>
          {" · "}
          <a href="#" style={{ color: "#78716c", textDecoration: "underline" }}>Politique de confidentialité</a>
        </p>
      </div>
    </div>
  );
}
