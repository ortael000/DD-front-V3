import { PassiveType, SkillBaseType } from "../../types/character";

export const findChildPassives = (firstPassiveId: number, allPassives: PassiveType[]): number[] => {
  
    let allRequiredPassiveIds = [firstPassiveId]

    for (let i = 0; i < allPassives.length; i++) {

        if (allRequiredPassiveIds.includes(allPassives[i].ParentPassive)) {
            allRequiredPassiveIds.push(allPassives[i].id);
        }
    }

  return allRequiredPassiveIds;
};

export const findChildSkills = (firstSkillId: number, allSkills: SkillBaseType[]): number[] => {
    console.log("findChildSkills called with firstSkillId:", firstSkillId);
    
    let allRequiredSkillIds = [firstSkillId]

    for (let i = 0; i < allSkills.length; i++) {

        if (allRequiredSkillIds.includes(allSkills[i].ParentSkill)) {
            console.log("on a comparé ", allSkills[i].ParentSkill, "avec", allRequiredSkillIds);
            allRequiredSkillIds.push(allSkills[i].id);
        }
    }

    return allRequiredSkillIds;
};
