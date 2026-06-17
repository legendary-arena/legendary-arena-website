# Email Metrics Log

Append-only record of per-send metrics. One entry per newsletter
edition. No retroactive edits — corrections are recorded as new
entries with a note.

---

## Template

Copy this block for each send:

### Week <N> — <newsletter_slug>

- **Date sent:** YYYY-MM-DD
- **Metrics recorded:** YYYY-MM-DD (must be ≥48 hours post-send)
- **Brevo campaign ID or name:**
- **Emails sent:**
- **Delivered:**
- **Opens:**
- **Clicks:**
- **Unsubscribes:**
- **Bounces:**

#### Calculation requirement

All rates must be calculated using the formulas defined in
`docs/brevo/email-automation.md`. Values must be recorded as percentages
with one decimal place (e.g., 23.4%). Calculations must be
reproducible from the raw counts in this entry.

#### Derived metrics

- Delivery rate:
- Open rate:
- CTR:
- CTOR:
- Unsubscribe rate:

#### UTM validation

- [ ] Shop link UTM parameters correct
- [ ] `utm_campaign` matches newsletter slug
- [ ] No extra or missing parameters

#### Threshold check

- [ ] Delivery rate ≥90%
- [ ] Open rate ≥15%
- [ ] CTR >0%
- [ ] Unsubscribe rate ≤2%

#### Result

`PASS` / `FAIL`

#### Notes

(failures, anomalies, corrections)

---

## Log entries

(append below this line)
