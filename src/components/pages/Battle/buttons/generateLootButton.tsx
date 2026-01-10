import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import type { BattleEntity } from "../../../../types/battleType";
import { fetchLootByType } from "../../../../helpers/dataBase&API/APIHelpers";
import {MoneyDisplay} from "../../../pages/character/smallComponent/money";

interface LootObtainedItem {
  LootTypeName: string;
  ObjectType: string;
  ObjectID: number;
  ObjectName: string;
}

interface Props {
  battleParticipants: BattleEntity[];
}

function normalizeDropRate(rate: any): number {
  const r = Number(rate);
  if (!Number.isFinite(r)) return 0;
  if (r <= 0) return 0;
  if (r > 100) return 100;
  return r;
}


export default function GenerateLootButton({ battleParticipants }: Props) {
  const [openLoot, setOpenLoot] = useState(false);
  const [lootObtained, setLootObtained] = useState<LootObtainedItem[]>([]);
  const [totalMoneyEarned, setTotalMoneyEarned] = useState(0);

  const generateLoots = async () => {
    const obtained: LootObtainedItem[] = [];
    let totalMoneyEarned2 = 0;

    for (const participant of battleParticipants) {

      if (participant.side !== "enemy") continue;

      const enemy: any = (participant as any).enemy;

      const lootTypeId = enemy?.lootType ?? enemy?.LootType ?? enemy?.LootTypeId ?? participant?.lootType;
      const lootValue = enemy?.lootValue ?? enemy?.LootValue ?? participant?.lootValue ?? 100;

      if (lootTypeId === undefined || lootTypeId === null) continue;

      const lootType = await fetchLootByType(lootTypeId);
      if (!lootType || !Array.isArray(lootType)) continue;  

      for (const item of lootType) {

        if (item.ObjectType === "money") {
          
          const randomNumber = Math.random() ;
          console.log("Generating money loot for ", item.chance, " x 0.", lootValue , " roll: ", Math.floor(randomNumber*100)/100);
          const moneyEarned = Math.floor(
            (normalizeDropRate(item.chance) * randomNumber * lootValue) / 100
          );
          console.log("Money  : ", moneyEarned);

          totalMoneyEarned2 += moneyEarned;
          continue; // ⬅️ skip everything below, go to next loot item
        }

        const chance = normalizeDropRate(item.chance);
        const scaledChance = (chance * Number(lootValue)) / 100;
        const roll = Math.random() * 100;

        if (roll < scaledChance) {
          obtained.push({
            LootTypeName: item.ObjectName,
            ObjectType: item.ObjectType,
            ObjectID: item.ObjectID,
            ObjectName: item.ObjectName,  
          });
        } 
      }
      console.log("Total money earned so far: ", totalMoneyEarned2);
    }

    setTotalMoneyEarned(totalMoneyEarned2);
    setLootObtained(obtained);
    setOpenLoot(true);
  };

  const enemyCount = battleParticipants.filter((p) => p.side === "enemy").length;

  return (
    <>
      <Button
        variant="contained"
        className="bp-generateLootBtn"
        onClick={generateLoots}
        disabled={enemyCount === 0}
      >
        Generate loots
      </Button>

      <Dialog open={openLoot} onClose={() => setOpenLoot(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Loot obtained</DialogTitle>

        <DialogContent>
        {/* Money is always displayed */}
        <Typography sx={{ mb: 2, fontWeight: 600 }}>
          Total money earned: {totalMoneyEarned}
        </Typography>

        {/* Loot items */}
        {lootObtained.length === 0 ? (
          <Typography sx={{ opacity: 0.8 }}>
            No item loot dropped.
          </Typography>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {lootObtained.map((l, idx) => (
              <div
                key={`${l.ObjectType}-${l.ObjectID}-${idx}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1.6fr",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.18)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontWeight: 900 }}>{l.ObjectName}</div>
                <div style={{ opacity: 0.85 }}>{l.ObjectType}</div>
                <div style={{ opacity: 0.85 }}>ID: {l.ObjectID}</div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>


        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenLoot(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
