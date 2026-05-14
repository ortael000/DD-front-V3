import { InventoryItem,CharacterBasetype } from "../../types/character";
import { ObjectMainType, objectSubtype } from "../../types/stringLists";

import { updateInventoryDB, fetchInventory } from "../dataBase&API/APIHelpers";
import { fetchCharacter, updateCharacterDB } from "../dataBase&API/characterAPI";


export async function getObjetToInventory(characterID: number, 
    itemType: "equipment" | "weapon" | "accessory", 
    itemSubtype: objectSubtype,
    itemID: number, 
    itemName: string,
    itemValue: number,
    itemFull: any, 
    purchase: boolean) {

    const characterBase : CharacterBasetype = await fetchCharacter(characterID)
    const currentInventory: InventoryItem[]  = await fetchInventory(characterID)

    const currentQuantity = currentInventory.reduce((quantity, item) => {
        if (item.ObjectType === itemType && item.ObjectSubType === itemSubtype && item.ObjectID === itemID) {
            return quantity + item.Quantity;
        }
        return quantity;
    }, 0);

    if (purchase && characterBase.currentMoney < itemValue) {
        throw new Error("Insufficient funds");
    }

    const newItem : InventoryItem = {
        CharacterID: characterID,
        ObjectType: itemType as ObjectMainType,
        ObjectSubType: itemSubtype as objectSubtype,
        ObjectID: itemID,
        Name: itemName,
        Quantity: currentQuantity + 1,
        Item: itemFull
    }
    await updateInventoryDB(newItem);

    if (purchase) {
        const newMoneyAmmount = characterBase.currentMoney - itemValue;
        await updateCharacterDB(characterID, { currentMoney: newMoneyAmmount });
    }
    
}
