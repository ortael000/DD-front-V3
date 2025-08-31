
import { EquipmentType, PassiveType, WeaponBaseType } from "../../types/character";


function transformBonusToText(object: EquipmentType | PassiveType | WeaponBaseType): string {

    const positives: string[] = [];
    const negatives: string[] = [];

    for (const [key, rawVal] of Object.entries(object)) {

        let toBePutInText = true

        if (key === 'id' ) toBePutInText = false;
        if (key === 'LevelRequired') toBePutInText = false;
        if (key === 'OtherEffect') toBePutInText = false;
        if (key === 'ParentPassive') toBePutInText = false;
        if (key === 'PassiveLevel') toBePutInText = false;

        // we have a “bonus” field
        const val = rawVal as number;
        const formatted = `${key}: ${val >= 0 ? '+' + val : val}`;

        if (toBePutInText) {
        if (val > 0) {
            positives.push(formatted);
        } else if (val < 0) {
            negatives.push(formatted);
        }
        }
    }
  // Combine the positive and negative effects into a single string
  return positives.join(',');
}
