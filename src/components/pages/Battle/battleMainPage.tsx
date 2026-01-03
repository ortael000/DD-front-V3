import React, { useEffect, useMemo, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


import { fetchAllCharacter, fetchFullCharacter } from "../../../helpers/dataBase&API/characterAPI";
import { fetchAllEnnemies } from "../../../helpers/dataBase&API/APIHelpers";

import AddCharacterToBattle from "./addCharacterToBattleButton";
  
import type { BattleEntity } from "../../../types/battleType";
import type { CharacterFulltype, CharacterBasetype } from "../../../types/character";
import type { Ennemy } from "../../../types/ennemy";


function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function BattlePage() {
  /* Title: selection lists */
  const [charactersBase, setCharactersBase] = useState<CharacterBasetype[]>([]);
  const [ennemiesBase, setEnnemiesBase] = useState<Ennemy[]>([]);

  // selected participant in the battle
  const [battleParticipants, setBattleParticipants] = useState<BattleEntity[] >([]);


  /* Title: load selection lists */
  useEffect(() => {
    (async () => {
      const chars = await fetchAllCharacter();
      setCharactersBase(Array.isArray(chars) ? chars : []);

      const ennemies = await fetchAllEnnemies();
      setEnnemiesBase(Array.isArray(ennemies) ? ennemies : []);
    })().catch(console.error);
  }, []);


  return (<div>
      <h2>Battle Main Page</h2>
      <div className="battle-setup-panel" style={{ border: '1px solid gray', padding: 12, marginBottom: 24 }}>
        <AddCharacterToBattle fetchFullCharacter={fetchFullCharacter} updateSelectedCharater={setBattleParticipants} battleParticipants={battleParticipants} characterBaseList={charactersBase} />
        {/* Additional battle UI components would go here */}
      </div>
    </div>
  );

}