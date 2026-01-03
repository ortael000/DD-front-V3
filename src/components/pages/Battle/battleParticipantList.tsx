import React from "react";
import { LinearProgress, Typography } from "@mui/material";
import type { BattleEntity } from "../../../types/battleType";
import "../../CSS/smallComponent/battleParticipantList.css";

type Props = {
  battleParticipants: BattleEntity[];
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

export default function BattleParticipantsList({ battleParticipants }: Props) {
  if (!battleParticipants.length) {
    return <Typography className="bp-empty">No participants yet.</Typography>;
  }

  return (
    <div className="bp-list">
      {battleParticipants.map((p) => {
        const hpPct = percent(p.currentHp, p.maxHp);
        const manaPct = percent(p.currentMana, p.maxMana);

        const sideClass = p.side === "character" ? "bp-hero" : "bp-enemy";
        const nameClass = p.side === "character" ? "bp-name-hero" : "bp-name-enemy";

        return (
          <div key={p.instanceId} className={`bp-card ${sideClass}`}>
            <div className="bp-left">
              <div className={`bp-name ${nameClass}`}>{p.name}</div>
              {p.status ? <div className="bp-status">{p.status}</div> : null}
            </div>

            <div className="bp-mid">
              <div className="bp-init-label">Init</div>
              <div className="bp-init-value">{p.initiative ?? "—"}</div>
            </div>

            <div className="bp-right">
              <div className="bp-barBlock">
                <div className="bp-barHeader">
                  <span className="bp-barTitle">HP</span>
                  <span className="bp-barValue">
                    {p.currentHp}/{p.maxHp}
                  </span>
                </div>
                <LinearProgress
                  className="bp-bar"
                  variant="determinate"
                  value={hpPct}
                  color={hpBarColor(hpPct)}
                />
              </div>

              <div className="bp-barBlock">
                <div className="bp-barHeader">
                  <span className="bp-barTitle">Mana</span>
                  <span className="bp-barValue">
                    {p.currentMana}/{p.maxMana}
                  </span>
                </div>
                <LinearProgress
                  className="bp-bar"
                  variant="determinate"
                  value={manaPct}
                  color="info"
                  sx={{ opacity: p.maxMana > 0 ? 1 : 0.35 }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
