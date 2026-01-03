import React, { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


import { CharacterFulltype, CharacterBasetype } from "../../../types/character";
import { BattleEntity } from "../../../types/battleType"; 
import { cpSync } from "fs";

interface Props {
  fetchFullCharacter: (id: number | string) => Promise<CharacterFulltype>;
  updateSelectedCharater: React.Dispatch<React.SetStateAction<BattleEntity[]>>;
  battleParticipants: BattleEntity[];
  characterBaseList: CharacterBasetype[];
}

export default function AddCharacterToBattle({fetchFullCharacter, updateSelectedCharater, battleParticipants, characterBaseList }: Props) {
  
    console.log(characterBaseList)
    const [selectedId, setSelectedId] = useState<string>("");


  const addSelectedCharacter = async () => {
    if (!selectedId) return;

    const selectedIDAlreadyInBattle = battleParticipants.find((p) => p.sourceId === Number(selectedId) && p.side === "character");
    console.log("Checking if character is already in battle:", selectedIDAlreadyInBattle);

    if (selectedIDAlreadyInBattle === undefined) {
            const full = await fetchFullCharacter(Number(selectedId));
            console.log("Fetched full character data:", full);
            const entity: BattleEntity = {
            instanceId: crypto.randomUUID(),
            sourceId: full.General.Id,
            side: "character",
            character: full,
            name: full.General.Name,
            currentHp: full.General.HitPoint - full.General.CurrentHPLose,
            maxHp: full.General.HitPoint,
            currentMana: full.General.Mana - full.General.CurrentManaLose,
            maxMana: full.General.Mana,
            initiative: null,
            status: "",
            };

            updateSelectedCharater(battleParticipants => [...battleParticipants, entity]);

            console.log("Added character to battle:", battleParticipants);
    } else {
        console.log("Character already in battle:", selectedId);
    }


  };

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <FormControl sx={{ minWidth: 260 }}>
        <InputLabel id="battle-character-label">Character</InputLabel>
        <Select
          labelId="battle-character-label"
          value={selectedId}
          label="Character"
          onChange={(e) => setSelectedId(String(e.target.value))}
        >
          {characterBaseList.map((c) => (
            <MenuItem key={c.id} value={String(c.id)}>
              {c.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={addSelectedCharacter} disabled={!selectedId}>
        Add to battle
      </Button>
    </div>
  );
}
