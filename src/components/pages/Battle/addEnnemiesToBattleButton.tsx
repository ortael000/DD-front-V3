import React, { useMemo, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import type { Ennemy } from "../../../types/ennemy";
import type { BattleEntity } from "../../../types/battleType";
import { raceList } from "../../../data/initiateObject";

interface Props {
  setBattleParticipants: React.Dispatch<React.SetStateAction<BattleEntity[]>>;
  enemyBaseList: Ennemy[];
}

export default function AddEnemyToBattle({ setBattleParticipants, enemyBaseList }: Props) {
  
  const [selectedRace, setSelectedRace] = useState<string>("");
  const [selectedEnemyId, setSelectedEnemyId] = useState<string>("");

  const filteredEnemies = useMemo(() => {
    if (!selectedRace) return [];
    return enemyBaseList.filter((e: any) => (e?.Race ?? e?.race) === selectedRace);
  }, [enemyBaseList, selectedRace]);

  const addSelectedEnemy = async () => {
    if (!selectedRace || !selectedEnemyId) return;

    const enemy = enemyBaseList.find((e: any) => String(e?.id ?? e?.Id) === selectedEnemyId);
    if (!enemy) return;

    const maxHp = (enemy as any).HitPoint ?? (enemy as any).HP ?? (enemy as any).hp ?? 0;
    const currentHp =
      (enemy as any).CurrentHp ?? (enemy as any).currentHp ?? (enemy as any).HP ?? (enemy as any).hp ?? maxHp;

    const maxMana = (enemy as any).Mana ?? (enemy as any).mana ?? 0;
    const currentMana =
      (enemy as any).CurrentMana ?? (enemy as any).currentMana ?? (enemy as any).Mana ?? (enemy as any).mana ?? maxMana;

    const name = (enemy as any).Name ?? (enemy as any).name ?? "Enemy";

    const entity: BattleEntity = {
      instanceId: crypto.randomUUID(),
      sourceId: Number((enemy as any).id ?? (enemy as any).Id),
      side: "enemy",
      enemy: enemy,
      name,
      currentHp,
      maxHp,
      currentMana,
      maxMana,
      initiative: null,
      status: "",
    };

    setBattleParticipants((prev) => [...prev, entity]);
    console.log("Added enemy to battle:", entity);
  };

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <FormControl sx={{ minWidth: 220 }}>
        <InputLabel id="battle-race-label">Race</InputLabel>
        <Select
          labelId="battle-race-label"
          value={selectedRace}
          label="Race"
          onChange={(e) => {
            const race = String(e.target.value);
            setSelectedRace(race);
            setSelectedEnemyId("");
          }}
        >
          {raceList.map((race) => (
            <MenuItem key={race} value={race}>
              {race}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 260 }} disabled={!selectedRace}>
        <InputLabel id="battle-enemy-label">Enemy</InputLabel>
        <Select
          labelId="battle-enemy-label"
          value={selectedEnemyId}
          label="Enemy"
          onChange={(e) => setSelectedEnemyId(String(e.target.value))}
        >
          {filteredEnemies.map((en: any) => {
            const id = String(en?.id ?? en?.Id);
            const label = en?.Name ?? en?.name ?? `Enemy ${id}`;
            return (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={addSelectedEnemy} disabled={!selectedRace || !selectedEnemyId}>
        Add enemy
      </Button>
    </div>
  );
}
