import { PassiveType } from "../../types/character";

export const findChildPassives = (firstPassiveId: number, allPassives: PassiveType[]): number[] => {
  
    let allRequiredPassiveIds = [firstPassiveId]

    for (let i = 0; i < allPassives.length; i++) {

        if (allRequiredPassiveIds.includes(allPassives[i].ParentPassive)) {
            allRequiredPassiveIds.push(allPassives[i].id);
        }
    }

  return allRequiredPassiveIds;
};
