// battleParticipantUI.ts
import type { BattleEntity } from "../../types/battleType"; 

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function percent(current: number, max: number) {
  if (!max || max <= 0) return 0;
  return clamp((current / max) * 100, 0, 100);
}

export function hpBarColor(p: number) {
  if (p <= 25) return "error";
  if (p <= 60) return "warning";
  return "success";
}

export function getDefenses(p: BattleEntity) {
  if (p.side === "character") {
    const d = p.character.Defenses;
    return {
      DefenseMelee: d.DefenseMelee,
      DefenseRange: d.DefenseRange,
      ResPhysical: d.ResPhysical,
      ResChi: d.ResChi,
      ResFire: d.ResFire,
      ResLightning: d.ResLightning,
      ResMental: d.ResMental,
      ResIce: d.ResIce,
    };
  }

  const d = p.enemy;
  return {
    DefenseMelee: d.DefenseMelee,
    DefenseRange: d.DefenseRange,
    ResPhysical: d.ResPhysical,
    ResChi: d.ResChi,
    ResFire: d.ResFire,
    ResLightning: d.ResLightning,
    ResMental: d.ResMental,
    ResIce: d.ResIce,
  };
}

export type EnemySkill = {
  SkillName?: string;
  SkillCost?: number;
  SkillTouchChance?: number;
  SkillElement?: string;
  SkillMinDamage?: number;
  SkillMaxDamage?: number;
  SkillOtherEffect?: string;
};

export function getEnemySkills(p: BattleEntity): EnemySkill[] {
  if (p.side !== "enemy") return [];

  // keep your current shape, but isolate the "any" here
  const e: any = (p as any).enemy;

  const s1: EnemySkill = {
    SkillName: e?.Skill1Name,
    SkillCost: e?.Skill1Cost,
    SkillTouchChance: e?.Skill1TouchChance,
    SkillElement: e?.Skill1Element,
    SkillMinDamage: e?.Skill1MinDamage,
    SkillMaxDamage: e?.Skill1MaxDamage,
    SkillOtherEffect: e?.Skill1OtherEffect,
  };

  const s2: EnemySkill = {
    SkillName: e?.Skill2Name,
    SkillCost: e?.Skill2Cost,
    SkillTouchChance: e?.Skill2TouchChance,
    SkillElement: e?.Skill2Element,
    SkillMinDamage: e?.Skill2MinDamage,
    SkillMaxDamage: e?.Skill2MaxDamage,
    SkillOtherEffect: e?.Skill2OtherEffect,
  };

  const s3: EnemySkill = {
    SkillName: e?.Skill3Name,
    SkillCost: e?.Skill3Cost,
    SkillTouchChance: e?.Skill3TouchChance,
    SkillElement: e?.Skill3Element,
    SkillMinDamage: e?.Skill3MinDamage,
    SkillMaxDamage: e?.Skill3MaxDamage,
    SkillOtherEffect: e?.Skill3OtherEffect,
  };

  return [s1, s2, s3].filter((s) => s?.SkillName); // only keep defined skills
}