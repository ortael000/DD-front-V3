import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { SkillBaseType } from "../../../types/character";

interface Props {
    SkillName: string;
    SkillCost: number;
    SkillTouchChance: number;
    SkillMinDamage: number;
    SkillMaxDamage: number;
    SkillOtherEffect: string;
    instanceId: string;
    currentMana: number;
    removeMana: (instanceId: string, manaCost: number) => void;
}

function rollD20() {
  return Math.floor(Math.random() * 20) + 1;
}

function rollBetween(min: number, max: number) {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  return Math.floor(Math.random() * (high - low + 1)) + low;
}
export default function EnemySkillAttackButton({ SkillName, SkillCost, SkillTouchChance, SkillMinDamage, SkillMaxDamage, SkillOtherEffect, instanceId, currentMana, removeMana }: Props) {


  const [open, setOpen] = useState(false);

  const [d20_1, setD20_1] = useState(0);
  const [d20_2, setD20_2] = useState(0);
  const [hitTotal, setHitTotal] = useState(0);

  const [damage, setDamage] = useState(0);

  const rollAttack = () => {

    if (currentMana < SkillCost) {
      alert("Not enough mana!");
      return;
    }

    const a = rollD20();
    const b = rollD20();

    const totalHit = a + b + (SkillTouchChance ?? 0);
    const dmg = rollBetween(SkillMinDamage ?? 0, SkillMaxDamage ?? 0);

    setD20_1(a);
    setD20_2(b);
    setHitTotal(totalHit);
    setDamage(dmg);

    removeMana(instanceId, SkillCost);
    setOpen(true);
  };

  if (SkillName === "None") {
    return null;
  }

  return (
    <>
      <Button
        size="small"
        variant="contained"
        className="bp-enemyAttackBtn"
        onClick={rollAttack}
      >
        {SkillName} ( {SkillCost} )
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>

        <DialogContent>

          <Typography sx={{ fontWeight: 900, mb: 1 }}>
            {SkillName} reach a {hitTotal} hit score for {damage} damages!
          </Typography>

          {SkillOtherEffect ? (
            <Typography sx={{ opacity: 0.9 }}>Effect: {SkillOtherEffect}</Typography>
          ) : null}
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}