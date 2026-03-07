import React from "react";
import { LinearProgress } from "@mui/material";
import type { BattleEntity } from "../../../../types/battleType";
import "../../../CSS/smallComponent/battleParticipantList.css";
import { defenseIcons } from "../../../../assets/iconeList"; 
import RemoveHpButton from "../buttons/removeHpButton";
import { getDefenses, percent, hpBarColor, getEnemySkills } from "../../../../helpers/battleHelper/battleParticipantUI";
import EnemySkillAttackButton from "../buttons/ennemyAttackButton";


type Props = {
  participant: Extract<BattleEntity, { side: "enemy" }>;
  onRemove: (instanceId: string) => void;
  removeMana: (instanceId: string, manaCost: number) => void;
  removeHP: (instanceId: string, damage: number) => void;
};

export default function BattleParticipantEnemyCard({ participant, onRemove, removeMana, removeHP }: Props) {
  const hpPct = percent(participant.currentHp, participant.maxHp);
  const manaPct = percent(participant.currentMana, participant.maxMana);

  const def = getDefenses(participant);
  const enemySkills = getEnemySkills(participant);

  return (
    <div className={`bp-card bp-enemy`}>
      <div className="bp-left">
        <div className="bp-topRow">
          <button className="bp-removeBtn" onClick={() => onRemove(participant.instanceId)}>
            -
          </button>

          <div className={`bp-name bp-name-enemy`}>
            {participant.orderId} {participant.name}
          </div>
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

        <div className="bp-attacksRow">
          {enemySkills.slice(0, 3).map((s, idx) => (
            <EnemySkillAttackButton
              key={`${participant.instanceId}-skill-${idx}`}
                SkillName={s.SkillName ?? "Unknown"}
                SkillCost={s.SkillCost ?? 0}
                SkillTouchChance={s.SkillTouchChance ?? 0}
                SkillMinDamage={s.SkillMinDamage ?? 0}
                SkillMaxDamage={s.SkillMaxDamage ?? 0}
                SkillOtherEffect={s.SkillOtherEffect ?? ""}
              instanceId={participant.instanceId}
              currentMana={participant.currentMana}
              removeMana={removeMana}
            />
          ))}
        </div>
      </div>

      <div className="bp-mid">
        <div className="bp-init-label">Init</div>
        <div className="bp-init-value">{participant.initiative ?? "—"}</div>
      </div>

      <div className="bp-right">
        <div className="bp-barBlock">
          <div className="bp-barHeader">
            <span className="bp-barTitle">HP</span>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="bp-barValue">
                {participant.currentHp}/{participant.maxHp}
              </span>

              <RemoveHpButton
                instanceId={participant.instanceId}
                currentHp={participant.currentHp}
                onRemoveHP={removeHP}
              />
            </div>
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
}