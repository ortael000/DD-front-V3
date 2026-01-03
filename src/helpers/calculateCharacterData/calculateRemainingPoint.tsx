import { CharacterFulltype, SkillDisplayed, PassiveType } from "../../types/character";

export  function calculateRemainingCharPoint (character: CharacterFulltype) : number {

    const totalPoints = Math.floor(90 + (character.General.Level+1) * (character.General.Level + 2) / 4);

    // Object.value transform character.Characteristics into an array of object [{Base: 10, Equipment: 2, Passive: 0, Temporary: 0, Total: 12, Modifier: 1}, ...]
    // then .reduce({acc,stat}) run a loop on the table, acc is initiated as 0 and its values is kept, while stat is the current element of the array being processed
    const usedPoints = Object.values(character.Characteristics).reduce((acc, stat) => acc + stat.Base as number, 0);
    const remainingPoints = (totalPoints - usedPoints);

    return remainingPoints;
  };

export function calculateRemainingSkillPoint (character: CharacterFulltype) : number {

    const skillsKey = ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5", "Skill6"];

    const currentSkillLevelsUsed = skillsKey.reduce((acc, key) => {
        const skill = character[key as keyof CharacterFulltype] as SkillDisplayed;
        return acc + (skill.skillLevel || 0);
    }, 0);

    const totalSkillPoints = 2 + Math.floor(character.General.Level / 2);
    const remainingPoints = totalSkillPoints - currentSkillLevelsUsed;

    return remainingPoints;
  };

export function calculateRemainingPassivePoint (character: CharacterFulltype) : number {

    const currentPassiveLevelsUsed = Object.entries(character.Passive).reduce((acc, [key, passive]) => {
        return acc + (passive.PassiveLevel || 0);
    }, 0);

    const totalPassivePoints = 1 + Math.floor((character.General.Level + 1) / 2);
    const remainingPoints = totalPassivePoints - currentPassiveLevelsUsed;

    return remainingPoints;
};