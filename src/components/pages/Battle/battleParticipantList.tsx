import React from "react";
import { LinearProgress, Typography, Button } from "@mui/material";
import type { BattleEntity } from "../../../types/battleType";
import "../../CSS/smallComponent/battleParticipantList.css";
import { defenseIcons } from "../../../assets/iconeList";
import EnemySkillAttackButton from "./ennemyAttackButton"; 

type Props = {
  battleParticipants: BattleEntity[];
  onRemove: (instanceId: string) => void;
  removeMana: (instanceId: string, manaCost: number) => void;
  removeHP: (instanceId: string, damage: number) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function percent(current: number, max: number) {
  if (!max || max <= 0) return 0;
  return clamp((current / max) * 100, 0, 100);
}

function hpBarColor(p: number) {
  if (p <= 25) return "error";
  if (p <= 60) return "warning";
  return "success";
}

function getDefenses(p: BattleEntity) {
  if (p.side === "character") {
    const d: any = (p as any).character?.Defenses;
    return {
      DefenseMelee: d?.DefenseMelee ?? 0,
      DefenseRange: d?.DefenseRange ?? 0,
      ResPhysical: d?.ResPhysical ?? 0,
      ResChi: d?.ResChi ?? 0,
      ResFire: d?.ResFire ?? 0,
      ResLightning: d?.ResLightning ?? 0,
      ResMental: d?.ResMental ?? 0,
      ResIce: d?.ResIce ?? 0,
    };
  }

  const e: any = (p as any).enemy;
  const d =
    e?.Defenses ??
    e?.defenses ??
    e?.DefensiveStats ??
    e?.defensiveStats ??
    e?.Defense ??
    e?.defense;

  return {
    DefenseMelee: d?.DefenseMelee ?? d?.MeleeDefense ?? d?.defenseMelee ?? 0,
    DefenseRange: d?.DefenseRange ?? d?.RangeDefense ?? d?.defenseRange ?? 0,
    ResPhysical: d?.ResPhysical ?? d?.PhysicalRes ?? d?.resPhysical ?? 0,
    ResChi: d?.ResChi ?? d?.ChiRes ?? d?.resChi ?? 0,
    ResFire: d?.ResFire ?? d?.FireRes ?? d?.resFire ?? 0,
    ResLightning: d?.ResLightning ?? d?.LightningRes ?? d?.resLightning ?? 0,
    ResMental: d?.ResMental ?? d?.MentalRes ?? d?.resMental ?? 0,
    ResIce: d?.ResIce ?? d?.IceRes ?? d?.resIce ?? 0,
  };
}

function getEnemySkills(p: BattleEntity) {
  if (p.side !== "enemy") return [];

  const e: any = (p as any).enemy;

  const s1 = {
    SkillName: e?.Skill1Name,
    SkillCost: e?.Skill1Cost,
    SkillTouchChance: e?.Skill1TouchChance,
    SkillElement: e?.Skill1Element,
    SkillMinDamage : e?.Skill1MinDamage,
    SkillMaxDamage  : e?.Skill1MaxDamage,
    SkillOtherEffect  : e?.Skill1OtherEffect,
  }

    const s2 = {        
    SkillName: e?.Skill2Name,
    SkillCost: e?.Skill2Cost,
    SkillTouchChance: e?.Skill2TouchChance,
    SkillElement: e?.Skill2Element,
    SkillMinDamage : e?.Skill2MinDamage,
    SkillMaxDamage  : e?.Skill2MaxDamage,
    SkillOtherEffect  : e?.Skill2OtherEffect,
  }

    const s3 = {
    SkillName: e?.Skill3Name,
    SkillCost: e?.Skill3Cost,
    SkillTouchChance: e?.Skill3TouchChance,
    SkillElement: e?.Skill3Element,
    SkillMinDamage : e?.Skill3MinDamage,
    SkillMaxDamage  : e?.Skill3MaxDamage,
    SkillOtherEffect  : e?.Skill3OtherEffect,
  }

  const list = [s1, s2, s3].filter(Boolean);

  return list;
}

export default function BattleParticipantsList({ battleParticipants, onRemove, removeMana, removeHP }: Props) {
  if (!battleParticipants.length) {
    return <Typography className="bp-empty">No participants yet.</Typography>;
  }

  return (
    <div className="bp-list">
      {battleParticipants.map((participant) => {
        const hpPct = percent(participant.currentHp, participant.maxHp);
        const manaPct = percent(participant.currentMana, participant.maxMana);

        const sideClass = participant.side === "character" ? "bp-hero" : "bp-enemy";
        const nameClass = participant.side === "character" ? "bp-name-hero" : "bp-name-enemy";

        const def = getDefenses(participant);

        const enemySkills = getEnemySkills(participant);

        return (
          <div key={participant.instanceId} className={`bp-card ${sideClass}`}>
            <div className="bp-left">
              <div className="bp-topRow">
                <button className="bp-removeBtn" onClick={() => onRemove(participant.instanceId)}>
                  -
                </button>

                <div className={`bp-name ${nameClass}`}>{participant.name}</div>
              </div>

              <div className="bp-defensesRow">
                <div className="bp-defItem" title="Range Defense">
                  <img src={defenseIcons.DefenseRange} className="bp-defIcon bp-defIconBig" />
                  <span className="bp-defValue">{def.DefenseRange}</span>
                </div>
                <div className="bp-defItem" title="Melee Defense">
                  <img src={defenseIcons.DefenseMelee} className="bp-defIcon bp-defIconBig" />
                  <span className="bp-defValue">{def.DefenseMelee}</span>
                </div>

                <div className="bp-defSep" />

                <div className="bp-defItem" title="Physical Resistance">
                  <img src={defenseIcons.ResPhysical} className="bp-defIcon" />
                  <span className="bp-defValue">{def.ResPhysical}</span>
                </div>
                <div className="bp-defItem" title="Chi Resistance">
                  <img src={defenseIcons.ResChi} className="bp-defIcon" />
                  <span className="bp-defValue">{def.ResChi}</span>
                </div>
                <div className="bp-defItem" title="Fire Resistance">
                  <img src={defenseIcons.ResFire} className="bp-defIcon" />
                  <span className="bp-defValue">{def.ResFire}</span>
                </div>
                <div className="bp-defItem" title="Lightning Resistance">
                  <img src={defenseIcons.ResLightning} className="bp-defIcon" />
                  <span className="bp-defValue">{def.ResLightning}</span>
                </div>
                <div className="bp-defItem" title="Mental Resistance">
                  <img src={defenseIcons.ResMental} className="bp-defIcon" />
                  <span className="bp-defValue">{def.ResMental}</span>
                </div>
                <div className="bp-defItem" title="Ice Resistance">
                  <img src={defenseIcons.ResIce} className="bp-defIcon" />
                  <span className="bp-defValue">{def.ResIce}</span>
                </div>
              </div>

              {participant.status ? <div className="bp-status">{participant.status}</div> : null}

              {participant.side === "enemy" ? (
                <div className="bp-attacksRow">
                  {enemySkills[0] ? (
                    <EnemySkillAttackButton
                      SkillName={enemySkills[0].SkillName}
                      SkillCost={enemySkills[0].SkillCost}
                      SkillTouchChance={enemySkills[0].SkillTouchChance}
                      SkillMinDamage={enemySkills[0].SkillMinDamage}
                      SkillMaxDamage={enemySkills[0].SkillMaxDamage}
                      SkillOtherEffect={enemySkills[0].SkillOtherEffect}
                      instanceId={participant.instanceId}
                      currentMana={participant.currentMana}
                      removeMana={removeMana}
                    />
                  ) : null}

                  {enemySkills[1] ? (
                    <EnemySkillAttackButton
                      SkillName={enemySkills[1].SkillName}
                      SkillCost={enemySkills[1].SkillCost}
                      SkillTouchChance={enemySkills[1].SkillTouchChance}
                      SkillMinDamage={enemySkills[1].SkillMinDamage}
                      SkillMaxDamage={enemySkills[1].SkillMaxDamage}
                      SkillOtherEffect={enemySkills[1].SkillOtherEffect}
                      instanceId={participant.instanceId}
                      currentMana={participant.currentMana}
                      removeMana={removeMana}
                    />
                  ) : null}

                  {enemySkills[2] ? (
                    <EnemySkillAttackButton
                      SkillName={enemySkills[2].SkillName}
                      SkillCost={enemySkills[2].SkillCost}
                      SkillTouchChance={enemySkills[2].SkillTouchChance}
                      SkillMinDamage={enemySkills[2].SkillMinDamage}
                      SkillMaxDamage={enemySkills[2].SkillMaxDamage}
                      SkillOtherEffect={enemySkills[2].SkillOtherEffect}
                      instanceId={participant.instanceId}
                      currentMana={participant.currentMana}
                      removeMana={removeMana}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="bp-mid">
              <div className="bp-init-label">Init</div>
              <div className="bp-init-value">{participant.initiative ?? "—"}</div>
            </div>

            <div className="bp-right">
              <div className="bp-barBlock">
                <div className="bp-barHeader">
                  <span className="bp-barTitle">HP</span>
                  <span className="bp-barValue">
                    {participant.currentHp}/{participant.maxHp}
                  </span>
                </div>
                <LinearProgress className="bp-bar" variant="determinate" value={hpPct} color={hpBarColor(hpPct)} />
              </div>

              <div className="bp-barBlock">
                <div className="bp-barHeader">
                  <span className="bp-barTitle">Mana</span>
                  <span className="bp-barValue">
                    {participant.currentMana}/{participant.maxMana}
                  </span>
                </div>
                <LinearProgress
                  className="bp-bar"
                  variant="determinate"
                  value={manaPct}
                  color="info"
                  sx={{ opacity: participant.maxMana > 0 ? 1 : 0.35 }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
