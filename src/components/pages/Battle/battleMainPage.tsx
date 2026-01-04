import React, { useEffect, useMemo, useState } from "react";
import { useCallback } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


import { fetchAllCharacter, fetchFullCharacter } from "../../../helpers/dataBase&API/characterAPI";
import { fetchAllEnnemies } from "../../../helpers/dataBase&API/APIHelpers";

import AddCharacterToBattle from "./buttons/addCharacterToBattleButton";
import AddEnemyToBattle from "./buttons/addEnnemiesToBattleButton";
import BattleParticipantsList from "./battleParticipantList";
  
import type { BattleEntity } from "../../../types/battleType";
import type { CharacterFulltype, CharacterBasetype } from "../../../types/character";
import type { Ennemy } from "../../../types/ennemy";


function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function rollD20() {
  return Math.floor(Math.random() * 20) + 1;
}

function getCharacterInitiativeBonus(character: any): number {
  const g = character?.General;

  return (
    g?.InitiativeBonus ??
    g?.Initiative ??
    g?.initiativeBonus ??
    g?.initiative ??
    0
  );
}



export default function BattlePage() {
  /* Title: selection lists */
  const [charactersBase, setCharactersBase] = useState<CharacterBasetype[]>([]);
  const [ennemiesBase, setEnnemiesBase] = useState<Ennemy[]>([]);

  // selected participant in the battle
  const [battleParticipants, setBattleParticipants] = useState<BattleEntity[] >([]);

  const removeParticipant = useCallback((instanceId: string) => {
    setBattleParticipants((prev) => prev.filter((p) => p.instanceId !== instanceId));
  }, []);

  const removeMana = useCallback((instanceId: string, manaCost: number) => {
    setBattleParticipants((prev) => {
      return prev.map((p) => {
        if (p.instanceId === instanceId) {
          const newMana = Math.max(0, p.currentMana - manaCost);
          return { ...p, currentMana: newMana };
        }
        return p;
      });
    });
  }, []);

  const removeHP = useCallback((instanceId: string, damage: number) => {
    setBattleParticipants((prev) => {
      return prev.map((p) => {
        if (p.instanceId === instanceId) {
          const newHP = Math.max(0, p.currentHp - damage);
          return { ...p, currentHp: newHP };
        }
        return p;
      });
    });
  }, []);

  const startBattle = React.useCallback(() => {
  setBattleParticipants((prev) => {
    const withInit = prev.map((p) => {
      const bonus = p.side === "character" ? getCharacterInitiativeBonus((p as any).character) : 0;
      const init = rollD20() + bonus;

      return { ...p, initiative: init };
    });

    withInit.sort((a, b) => {
      const ai = a.initiative ?? -9999;
      const bi = b.initiative ?? -9999;
      return bi - ai;
    });

    return withInit;
  });
}, []);

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
        <AddCharacterToBattle fetchFullCharacter={fetchFullCharacter} setBattleParticipants={setBattleParticipants} battleParticipants={battleParticipants} characterBaseList={charactersBase} />
        <AddEnemyToBattle setBattleParticipants={setBattleParticipants} enemyBaseList={ennemiesBase} />
        <Button
          variant="contained"
          className="bp-startBattleBtn"
          onClick={startBattle}
          disabled={battleParticipants.length === 0}
        >
          Start Battle
        </Button>    
        {/* Additional battle UI components would go here */}
      </div>
      <BattleParticipantsList battleParticipants={battleParticipants} onRemove={removeParticipant} removeMana={removeMana} removeHP={removeHP} />

    </div>
  );

}

