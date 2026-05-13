import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { updateCharacterDB } from "../../../../helpers/dataBase&API/characterAPI";
import { SkillDisplayed, CharacterFulltype } from "../../../../types/character";

interface Props {
  skill: SkillDisplayed;
  character: CharacterFulltype;
  updateCharacter: () => void;
}

export default function UseSkillButton({ skill, character, updateCharacter }: Props) {
  const [open, setOpen] = useState(false);
  const [damage, setDamage] = useState(0);

  const handleUseSkill = async () => {
    const currentMana = character.General.Mana - character.General.CurrentManaLose;

    // Check if user has enough mana
    if (currentMana < skill.manaCost) {
      alert("Not enough mana to use this skill");
      return;
    }

    // Generate random damage between min and max
    const randomDamage = Math.floor(
      Math.random() * (skill.maxDamage - skill.minDamage + 1) + skill.minDamage
    );
    setDamage(randomDamage);

    // Remove mana from character
    const newManaLose = character.General.CurrentManaLose + skill.manaCost;
    await updateCharacterDB(character.General.Id, {
      currentManaLose: newManaLose,
    } as any);

    setOpen(true);
    await updateCharacter();
  };

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        onClick={handleUseSkill}
        sx={{
          minWidth: "40px",
          backgroundColor: "transparent",
          borderColor: "#8B0000",
          color: "#8B0000",
          "&:hover": {
            backgroundColor: "rgba(139, 0, 0, 0.1)",
            borderColor: "#8B0000",
          },
        }}
      >
        Use
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Skill Used</DialogTitle>
        <DialogContent>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>Use {skill.name} and deal</p>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "red",
                margin: "20px 0",
              }}
            >
              {damage}
            </div>
            <p>damage</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
