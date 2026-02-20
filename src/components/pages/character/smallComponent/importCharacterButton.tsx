import React, { useRef } from "react";
import { Button } from "@mui/material";
import { createCharacter, updateCharacterDB } from "../../../../helpers/dataBase&API/characterAPI";

function parseBlock(block: string) {
  const lines = block.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};
    headers.forEach((h, i) => {
      const raw = (values[i] ?? "").trim();
      obj[h] = /^\d+$/.test(raw) ? Number(raw) : raw;
    });
    return obj;
  });
}

async function addInventoryRow(row: any) {
  const base = (process.env.backEndAdress as string) || "http://localhost:3000";
  const res = await fetch(`${base}/inventoryupdate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row), // backend expects flat fields :contentReference[oaicite:1]{index=1}
  });
  if (!res.ok) throw new Error("Inventory import failed");
}

export default function ImportCharacterCsvButton() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file: File) => {
    const text = await file.text();

    // split on blank line into 2 blocks
    const parts = text.split(/\r?\n\r?\n/).filter((p) => p.trim());
    const charBlock = parts[0];
    const invBlock = parts[1];

    const char = parseBlock(charBlock)[0];
    if (!char?.Name) return alert("Invalid CSV (missing Name)");

    const password = prompt("Password for new character:");
    if (!password) return;

    // create character
    const created = await createCharacter(String(char.Name), password);
    const newId = Number(created.characterId);

    // apply character base fields (never reuse old id)
    delete char.id;
    await updateCharacterDB(newId, char);

    // inventory (optional)
    if (invBlock) {
      const invRows = parseBlock(invBlock);
      for (const r of invRows) {
        await addInventoryRow({
          CharacterID: newId,
          ObjectType: r.ObjectType,
          ObjectSubType: r.ObjectSubType,
          ObjectID: r.ObjectID,
          Name: r.Name,
          Quantity: r.Quantity,
        });
      }
    }

    alert("Character + inventory imported!");
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.currentTarget.value = "";
        }}
      />
      <Button variant="contained" color="secondary" onClick={() => inputRef.current?.click()}>
        Import CSV
      </Button>
    </>
  );
}
