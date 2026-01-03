import React, { useEffect, useMemo, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


import { fetchAllCharacter, fetchFullCharacter } from "../../../helpers/dataBase&API/characterAPI";
import { fetchAllEnnemies } from "../../../helpers/dataBase&API/APIHelpers";

import type { BattleEntity } from "../../../types/battleType";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function BattlePage() {
  /* Title: selection lists */
  const [charactersBase, setCharactersBase] = useState<any[]>([]);
  const [ennemiesBase, setEnnemiesBase] = useState<any[]>([]);

  /* Title: pre-battle selections */
  const [selectedCharacterIds, setSelectedCharacterIds] = useState<number[]>([]);
  const [selectedEnemyIds, setSelectedEnemyIds] = useState<number[]>([]);

  /* Title: battle runtime state */
  const [started, setStarted] = useState(false);
  const [entities, setEntities] = useState<BattleEntity[]>([]);

  /* Title: quick adjust (temporary) */
  const [editTargetKey, setEditTargetKey] = useState<string>("");
  const [hpDelta, setHpDelta] = useState<number>(0);
  const [manaDelta, setManaDelta] = useState<number>(0);

  /* Title: load selection lists */
  useEffect(() => {
    (async () => {
      const chars = await fetchAllCharacter();
      setCharactersBase(Array.isArray(chars) ? chars : []);

      const ennemies = await fetchAllEnnemies();
      setEnnemiesBase(Array.isArray(ennemies) ? ennemies : []);
    })().catch(console.error);
  }, []);

  /* Title: derived lists */
  const party = useMemo(() => entities.filter((e) => e.side === "party"), [entities]);
  const monsters = useMemo(() => entities.filter((e) => e.side === "monsters"), [entities]);

  /* Title: start battle */
  async function startBattle() {
    const partyEntities: BattleEntity[] = await Promise.all(
      selectedCharacterIds.map(async (id) => {
        const full = await fetchFullCharacter(id);

        const name = full?.General?.Name ?? `Character ${id}`;
        const maxHp = Number(full?.General?.HitPoint ?? 0);
        const maxMana = Number(full?.General?.Mana ?? 0);
        const hp = maxHp - Number(full?.General?.CurrentHPLose ?? 0);
        const mana = maxMana - Number(full?.General?.CurrentManaLose ?? 0);

        return {
          kind: "character",
          side: "party",
          key: `c-${id}`,
          id: Number(id),
          name,
          maxHp,
          maxMana,
          hp,
          mana,
          full,
        };
      })
    );

    const monsterEntities: BattleEntity[] = selectedEnemyIds
      .map((id) => ennemiesBase.find((e) => Number(e.id) === Number(id)))
      .filter(Boolean)
      .map((enemy) => {
        const name = enemy.Name ?? enemy.name ?? `Enemy ${enemy.id}`;
        const maxHp = Number(enemy.HitPoint ?? enemy.HP ?? 0);
        const maxMana = Number(enemy.Mana ?? 0);

        return {
          kind: "enemy",
          side: "monsters",
          key: `e-${enemy.id}`,
          id: Number(enemy.id),
          name,
          maxHp,
          maxMana,
          hp: maxHp,
          mana: maxMana,
          enemy,
        } as BattleEntity;
      });

    const all = [...partyEntities, ...monsterEntities];
    setEntities(all);
    setEditTargetKey(all[0]?.key ?? "");
    setStarted(true);
  }

  /* Title: reset battle */
  function resetBattle() {
    setStarted(false);
    setEntities([]);
    setEditTargetKey("");
    setHpDelta(0);
    setManaDelta(0);
  }

  /* Title: update entity */
  function updateEntity(next: BattleEntity) {
    setEntities((prev) => prev.map((e) => (e.key === next.key ? next : e)));
  }

  /* Title: apply manual delta */
  function applyManualDelta() {
    const target = entities.find((e) => e.key === editTargetKey);
    if (!target) return;

    updateEntity({
      ...target,
      hp: clamp(target.hp + hpDelta, 0, target.maxHp),
      mana: clamp(target.mana + manaDelta, 0, target.maxMana),
    });

    setHpDelta(0);
    setManaDelta(0);
  }

  return (
    <div className="pageComponent">
      <h1 className="pageTitle">Battle</h1>

      {!started ? (
        <div style={{ display: "grid", gap: 16, maxWidth: 900 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <FormControl fullWidth>
              <InputLabel id="party-select">Party (characters)</InputLabel>
              <Select
                labelId="party-select"
                multiple
                value={selectedCharacterIds as any}
                label="Party (characters)"
                onChange={(e) => setSelectedCharacterIds(e.target.value as any)}
              >
                {charactersBase.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.Name ?? c.name ?? `#${c.id}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="monster-select">Monsters (ennemies)</InputLabel>
              <Select
                labelId="monster-select"
                multiple
                value={selectedEnemyIds as any}
                label="Monsters (ennemies)"
                onChange={(e) => setSelectedEnemyIds(e.target.value as any)}
              >
                {ennemiesBase.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.Name ?? m.name ?? `#${m.id}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button
            variant="contained"
            disabled={selectedCharacterIds.length === 0 || selectedEnemyIds.length === 0}
            onClick={startBattle}
          >
            Start Battle
          </Button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 18 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Button variant="outlined" color="error" onClick={resetBattle}>
              Reset battle
            </Button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <h2>Party</h2>
              <table className="general-table">
                <thead>
                  <tr>
                    <th className="label-cell">Name</th>
                    <th className="value-cell">HP</th>
                    <th className="value-cell">Mana</th>
                  </tr>
                </thead>
                <tbody>
                  {party.map((p) => (
                    <tr key={p.key}>
                      <td className="label-cell">{p.name}</td>
                      <td className="value-cell">
                        {p.hp} / {p.maxHp}
                      </td>
                      <td className="value-cell">
                        {p.mana} / {p.maxMana}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2>Monsters</h2>
              <table className="general-table">
                <thead>
                  <tr>
                    <th className="label-cell">Name</th>
                    <th className="value-cell">HP</th>
                    <th className="value-cell">Mana</th>
                  </tr>
                </thead>
                <tbody>
                  {monsters.map((m) => (
                    <tr key={m.key}>
                      <td className="label-cell">{m.name}</td>
                      <td className="value-cell">
                        {m.hp} / {m.maxHp}
                      </td>
                      <td className="value-cell">
                        {m.mana} / {m.maxMana}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="character-section">
            <h2 className="general-title">Quick adjust</h2>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: 12, alignItems: "center" }}>
              <FormControl fullWidth>
                <InputLabel id="edit-target">Target</InputLabel>
                <Select
                  labelId="edit-target"
                  value={editTargetKey}
                  label="Target"
                  onChange={(e) => setEditTargetKey(String(e.target.value))}
                >
                  {entities.map((e) => (
                    <MenuItem key={e.key} value={e.key}>
                      {e.side === "party" ? "🟦" : "🟥"} {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                type="number"
                label="HP Δ"
                value={hpDelta}
                onChange={(e) => setHpDelta(Number(e.target.value))}
              />

              <TextField
                type="number"
                label="Mana Δ"
                value={manaDelta}
                onChange={(e) => setManaDelta(Number(e.target.value))}
              />

              <Button variant="contained" onClick={applyManualDelta}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}