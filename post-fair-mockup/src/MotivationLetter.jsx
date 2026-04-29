import { useState, useRef } from "react";

const FORMATIONS = [
  { value: "essec-bba", label: "ESSEC Business School — BBA" },
  { value: "ieseg", label: "IÉSEG School of Management" },
  { value: "excelia", label: "Excelia Business School" },
  { value: "but-tc", label: "IUT Paris-Rives de Seine — BUT TC" },
  { value: "autre", label: "Autre formation (préciser)" },
];

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #d6d3d1",
  fontSize: 14,
  fontFamily: "system-ui, sans-serif",
  background: "#fff",
  color: "#1c1917",
  outline: "none",
  boxSizing: "border-box",
  lineHeight: 1.5,
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "#78716c",
  marginBottom: 6,
  fontFamily: "system-ui, sans-serif",
};

export default function MotivationLetter() {
  const [formation, setFormation] = useState("essec-bba");
  const [formationCustom, setFormationCustom] = useState("");
  const [motivation, setMotivation] = useState("");
  const [pastedNotes, setPastedNotes] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const formationNom =
    formation === "autre"
      ? formationCustom
      : FORMATIONS.find((f) => f.value === formation)?.label || "";

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (!motivation.trim()) {
      setError("Écris quelques lignes de motivation avant de générer.");
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("motivation", motivation);
      formData.append("formationNom", formationNom);
      formData.append("pastedNotes", pastedNotes);
      files.forEach((f) => formData.append("documents", f));

      const res = await fetch("http://localhost:3001/api/generate-letter", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setResult(data.letter);
    } catch (err) {
      setError(err.message || "Erreur lors de la génération. Vérifie que le serveur est démarré.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const [letterPart] = result.split("---");
    navigator.clipboard.writeText(letterPart.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split result into letter and metadata sections
  const sections = result ? result.split(/^---$/m) : [];
  const letterText = sections[0]?.trim() || "";
  const metaText = sections.slice(1).join("---").trim();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* Form */}
      <div style={{
        background: "#fff", borderRadius: 12, padding: "24px",
        border: "1px solid #e7e5e4", marginBottom: 16
      }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 20px", color: "#1c1917" }}>
          Génère ta lettre de motivation
        </h3>

        {/* Formation */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Formation cible</label>
          <select
            value={formation}
            onChange={(e) => setFormation(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {FORMATIONS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          {formation === "autre" && (
            <input
              type="text"
              placeholder="Nom de la formation..."
              value={formationCustom}
              onChange={(e) => setFormationCustom(e.target.value)}
              style={{ ...inputStyle, marginTop: 8 }}
            />
          )}
        </div>

        {/* Motivation text */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>
            Ton texte de motivation <span style={{ color: "#e11d48" }}>*</span>
          </label>
          <textarea
            rows={5}
            placeholder="Écris quelques phrases en langage naturel — pas besoin que ce soit parfait. Ex : « Je veux faire une école de commerce parce que j'aime comprendre comment les entreprises fonctionnent, et j'ai toujours eu de bonnes notes en SES... »"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
          />
          <div style={{ textAlign: "right", fontSize: 12, color: "#a8a29e", marginTop: 4 }}>
            {motivation.length} caractères
          </div>
        </div>

        {/* Pasted notes */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Tes notes / bulletins (texte à coller)</label>
          <textarea
            rows={3}
            placeholder="Colle ici tes relevés de notes ou appréciations de profs. Ex : « Maths : 16/20 — Excellent travail, grande rigueur. SES : 14/20 — Participation active... »"
            value={pastedNotes}
            onChange={(e) => setPastedNotes(e.target.value)}
            style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
          />
        </div>

        {/* File upload */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Documents (PDF, TXT)</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: "2px dashed #d6d3d1", borderRadius: 8, padding: "16px",
              textAlign: "center", cursor: "pointer", fontSize: 14, color: "#a8a29e",
              transition: "border-color 0.2s",
              background: "#fafaf9"
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#1e293b"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#d6d3d1"}
          >
            Clique pour uploader tes bulletins, CV, ou diplômes (PDF)
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.txt"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {files.length > 0 && (
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
              {files.map((f, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 12px", background: "#f0f9ff", borderRadius: 6,
                  fontSize: 13, color: "#0369a1"
                }}>
                  <span>📄 {f.name}</span>
                  <button
                    onClick={() => removeFile(i)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 16, lineHeight: 1 }}
                  >×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: "12px 14px", borderRadius: 8, background: "#fef2f2",
            border: "1px solid #fecaca", color: "#dc2626", fontSize: 13,
            marginBottom: 16, lineHeight: 1.5
          }}>
            {error}
          </div>
        )}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !motivation.trim()}
          style={{
            width: "100%", padding: "14px", borderRadius: 10, border: "none",
            background: loading || !motivation.trim() ? "#e7e5e4" : "#1e293b",
            color: loading || !motivation.trim() ? "#a8a29e" : "#fff",
            fontSize: 15, fontWeight: 700, cursor: loading || !motivation.trim() ? "not-allowed" : "pointer",
            fontFamily: "system-ui, sans-serif", transition: "background 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}
        >
          {loading ? (
            <>
              <span style={{
                display: "inline-block", width: 16, height: 16,
                border: "2px solid #a8a29e", borderTopColor: "#1e293b",
                borderRadius: "50%", animation: "spin 0.8s linear infinite"
              }} />
              Génération en cours...
            </>
          ) : (
            "✍️ Générer ma lettre de motivation"
          )}
        </button>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>

      {/* Result */}
      {result && (
        <div style={{
          background: "#fff", borderRadius: 12, border: "1px solid #e7e5e4",
          overflow: "hidden"
        }}>
          <div style={{
            padding: "16px 24px", borderBottom: "1px solid #e7e5e4",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#16a34a", marginBottom: 2 }}>
                Lettre générée
              </div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{formationNom}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleCopy}
                style={{
                  padding: "8px 16px", borderRadius: 8,
                  border: "1px solid #d6d3d1", background: copied ? "#f0fdf4" : "#fff",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  color: copied ? "#16a34a" : "#1c1917",
                  fontFamily: "system-ui, sans-serif", transition: "all 0.2s"
                }}
              >
                {copied ? "✓ Copié !" : "Copier"}
              </button>
              <button
                onClick={() => { setResult(null); setMotivation(""); setPastedNotes(""); setFiles([]); }}
                style={{
                  padding: "8px 16px", borderRadius: 8,
                  border: "none", background: "#f1f5f9",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  color: "#64748b", fontFamily: "system-ui, sans-serif"
                }}
              >
                Recommencer
              </button>
            </div>
          </div>

          {/* Letter text */}
          <div style={{
            padding: "24px", fontSize: 14, lineHeight: 1.8,
            color: "#1c1917", fontFamily: "'Source Serif 4', Georgia, serif",
            whiteSpace: "pre-wrap"
          }}>
            {letterText}
          </div>

          {/* Metadata / suggestions */}
          {metaText && (
            <div style={{
              padding: "16px 24px", background: "#fafaf9",
              borderTop: "1px solid #e7e5e4",
              fontSize: 13, color: "#78716c", lineHeight: 1.6,
              fontFamily: "system-ui, sans-serif", whiteSpace: "pre-wrap"
            }}>
              {metaText}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
