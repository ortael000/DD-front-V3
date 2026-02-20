import { fetchCharacter } from "./characterAPI";
import { fetchInventory } from "./APIHelpers";

function esc(v: any) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toOneRowCsv(obj: Record<string, any>) {
  const keys = Object.keys(obj);
  return `${keys.join(",")}\n${keys.map((k) => esc(obj[k])).join(",")}\n`;
}

function toRowsCsv(rows: any[]) {
  if (!rows.length) return "";
  const keys = Object.keys(rows[0]);
  const header = keys.join(",");
  const body = rows.map((r) => keys.map((k) => esc(r[k])).join(",")).join("\n");
  return `${header}\n${body}\n`;
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/**
 * Downloads a CSV containing:
 * 1) character base (header + 1 row)
 * 2) blank line
 * 3) inventory (header + many rows)
 */
export async function downloadCharacterCsvWithInventory(characterId: number | string) {
  const character = await fetchCharacter(characterId);
  const inventory = await fetchInventory(characterId);

  const csv =
    toOneRowCsv(character) +
    "\n" +
    (inventory?.length ? toRowsCsv(inventory) : "ObjectType,ObjectSubType,ObjectID,Name,Quantity\n");

  const safeName = String(character?.Name ?? `character_${characterId}`).replace(/[^\w\-]+/g, "_");
  downloadTextFile(`${safeName}_${characterId}.csv`, csv);
}
