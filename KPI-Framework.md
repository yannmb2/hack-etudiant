# Engagement KPI Framework — L'Étudiant Salons

## How to read this document

Each KPI follows the same four-field structure:
- **What** — the metric and what it measures
- **How** — where the data comes from
- **Frequency** — how often it is checked
- **Threshold → Action** — the number that triggers something, and what happens next

---

## Phase 1 — Before the Fair

### KPI 1 · Pre-registration completion rate
**What:** Share of registrants who complete the optional pre-survey (interests, Parcoursup stage).
**How:** Form submission events in the registration platform.
**Frequency:** Checked daily in the two weeks before the fair.
**Threshold → Action:** If below 30% at D-7, trigger a reminder email with a simplified 2-question version of the survey.

---

### KPI 2 · Profile quality score
**What:** Average completeness of visitor profiles at registration (email + class + at least one interest declared = complete).
**How:** Calculated field in the CRM at registration.
**Frequency:** Snapshot at D-3 before the fair.
**Threshold → Action:** If below 50% of profiles are complete, activate the "borne d'activation" flow at fair entry to collect missing data on-site.

---

## Phase 2 — During the Fair

### KPI 3 · Stand scan rate
**What:** Share of visitors who scan at least one stand QR code during their visit.
**How:** QR scan events logged by the L'Étudiant system (not the exhibitors).
**Frequency:** Monitored in real time on fair day.
**Threshold → Action:** If below 20% by midday, deploy floor staff to demo the scan gesture at high-traffic stands.

### KPI 4 · Average stands scanned per visitor
**What:** Mean number of distinct stand QR codes scanned per visitor who scanned at least once.
**How:** QR scan logs, grouped by visitor ID.
**Frequency:** End-of-day calculation.
**Threshold → Action:** Below 2 → the post-fair recap is too thin to be useful; flag these profiles for a generic rather than personalised email.

### KPI 5 · Conference attendance capture rate
**What:** Share of conference sessions where at least 50% of attendees scanned in (vs. estimated room capacity).
**How:** QR scan events at conference room entry points.
**Frequency:** Per session, on fair day.
**Threshold → Action:** If a session captures fewer than 30% of expected attendees, an oral announcement is made at the next session reminding visitors to scan for the replay.

---

## Phase 3 — After the Fair

### KPI 6 · Post-fair email open rate
**What:** Share of visitors who open the personalised recap email sent within 48h of the fair.
**How:** Email platform (pixel tracking).
**Frequency:** Checked at 24h, 48h, and 72h post-send.
**Threshold → Action:** Below 25% open at 48h → send a follow-up with a different subject line to non-openers.

### KPI 7 · Recap click-through rate (CTR)
**What:** Share of email openers who click at least one formation link in the recap.
**How:** UTM-tagged links in the email, tracked in the analytics platform.
**Frequency:** Checked at 72h post-send.
**Threshold → Action:** Below 15% CTR → the recommendation logic is not relevant enough; review the matching algorithm before the next fair.

### KPI 8 · Return visit rate
**What:** Share of post-fair email clickers who visit letudiant.fr at least twice in the 30 days following the fair.
**How:** UTM + cookie-based session tracking (requires cookie consent).
**Frequency:** Monthly, 30 days after the fair.
**Threshold → Action:** Below 20% → introduce a "save your shortlist" feature to give students a reason to return.

---

## Lead Qualification KPIs (for the marketing manager view)

### KPI 9 · High-value lead rate
**What:** Share of visitors who reach a commercial value score ≥ 70/100 in the lead qualification model.
**How:** Computed by the scoring model at the close of fair day.
**Frequency:** Once, end of fair day. Updated at 48h with post-fair email engagement data.
**Threshold → Action:** If fewer than 10% of visitors reach score ≥ 70, review the scoring weights — the model may be too strict or the data capture too thin.

### KPI 10 · Lead-to-exhibitor conversion rate
**What:** Share of high-value leads (score ≥ 70) whose contact data is transmitted to an exhibitor within 5 business days.
**How:** CRM transfer logs.
**Frequency:** Checked at D+5 after the fair.
**Threshold → Action:** Below 60% → investigate pipeline bottleneck (legal review delay, missing consent, data quality issue).

---

## Summary Table

| # | KPI | Phase | Threshold | Action |
|---|-----|-------|-----------|--------|
| 1 | Pre-survey completion rate | Before | < 30% at D-7 | Simplified reminder email |
| 2 | Profile quality score | Before | < 50% complete at D-3 | Activate on-site collection borne |
| 3 | Stand scan rate | During | < 20% by midday | Floor staff demo |
| 4 | Avg. stands scanned | During | < 2 | Generic recap instead of personalised |
| 5 | Conference capture rate | During | < 30% per session | In-room oral reminder |
| 6 | Email open rate | After | < 25% at 48h | Re-send with new subject line |
| 7 | Recap CTR | After | < 15% at 72h | Review recommendation logic |
| 8 | Return visit rate | After | < 20% at D+30 | Add shortlist save feature |
| 9 | High-value lead rate | Qualification | < 10% | Review scoring weights |
| 10 | Lead-to-exhibitor conversion | Qualification | < 60% at D+5 | Investigate CRM pipeline |
