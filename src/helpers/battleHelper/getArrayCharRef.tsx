import { BattleEntity, PlayerRef } from "../../types/battleType";

export const getArrayCharRef = (battleEntities: BattleEntity[]): PlayerRef[] => {
    
    return battleEntities
        .filter(entity => entity.side === 'character')
        .map(entity => ({
            id: entity.sourceId,
            Name: entity.name,
            // Add other PlayerRef properties as needed
        }));
};