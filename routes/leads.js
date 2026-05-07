const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");
const {
  validateCreateLead,
  validateUpdateLead,
} = require("../middleware/validators");

router.post("/", auth, validateCreateLead, async (req, res) => {
  try {
    const {
      lead_name,
      company_name,
      email,
      phone,
      source,
      status,
      deal_value,
      assigned_salesperson,
    } = req.body;

    const [result] = await db.execute(
      "INSERT INTO leads (lead_name, company_name, email, phone, source, status, deal_value, assigned_salesperson) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [lead_name, company_name, email, phone, source || "Website", status || "New", deal_value || 0.00, assigned_salesperson || "Unassigned"]
    );

    res.status(201).json({ message: "Lead created successfully!", leadId: result.insertId });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ message: "Error creating lead" });
  }
});

router.put("/:id", auth, validateUpdateLead, async (req, res) => {
  try {
    const { status, deal_value, assigned_salesperson, source } = req.body;
    const leadId = req.params.id;
    
    await db.execute(
      "UPDATE leads SET status = ?, deal_value = ?, assigned_salesperson = ?, source = ? WHERE id = ?",
      [status, deal_value, assigned_salesperson || "Unassigned", source, leadId]
    );

    res.json({ message: "Lead updated successfully!" });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ message: "Error updating lead" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const leadId = req.params.id;
  try {
    await db.execute("DELETE FROM leads WHERE id = ?", [leadId]);
    res.json({ message: "Lead deleted successfully!" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).json({ message: "Error deleting lead" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const [leads] = await db.execute("SELECT * FROM leads ORDER BY created_at DESC");
    res.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Error fetching leads" });
  }
});

module.exports = router;
