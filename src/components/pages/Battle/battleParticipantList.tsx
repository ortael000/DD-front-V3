import React from "react";
import { Typography } from "@mui/material";
import type { BattleEntity } from "../../../types/battleType";
import "../../CSS/smallComponent/battleParticipantList.css";

import BattleParticipantCharacterCard from "./participantCard/BattleParticipantCharacterCard";
import BattleParticipantEnemyCard from "./participantCard/BattleParticipantEnemyCard";
import BattleParticipantSummonCard from "./participantCard/BattleParticipantSummonCard";


type Props = {
  battleParticipants: BattleEntity[];
  onRemove: (instanceId: string) => void;
  removeMana: (instanceId: string, manaCost: number) => void;
  removeHP: (instanceId: string, damage: number) => void;
};

export default function BattleParticipantsList({
  battleParticipants,
  onRemove,
  removeMana,
  removeHP,
}: Props) {
  if (!battleParticipants.length) {
    return <Typography className="bp-empty">No participants yet.</Typography>;
  }

  return (
    <div className="bp-list">
      {battleParticipants.map((participant) => {
        switch (participant.side) {
          case "character":
            return (
              <BattleParticipantCharacterCard
                key={participant.instanceId}
                participant={participant as Extract<BattleEntity, { side: "character" }>}
                onRemove={onRemove}
                removeHP={removeHP}
              />
            );

          case "enemy":
            return (
              <BattleParticipantEnemyCard
                key={participant.instanceId}
                participant={participant as Extract<BattleEntity, { side: "enemy" }>}
                onRemove={onRemove}
                removeMana={removeMana}
                removeHP={removeHP}
              />
            );

          case "summon":
            return (
              <BattleParticipantSummonCard
                key={participant.instanceId}
                participant={participant as Extract<BattleEntity, { side: "summon" }>}
                onRemove={onRemove}
                removeMana={removeMana}
                removeHP={removeHP}
              />
            );

          default:
            // safety: avoid returning undefined
            return null;
        }
      })}
    </div>
  );
}