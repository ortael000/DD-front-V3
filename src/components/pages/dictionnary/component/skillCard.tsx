import React from 'react';
import { SkillBaseType } from '../../../../types/character';
import { ElementIcons, attackIcons, generalIcons, characteristicsIcons } from '../../../../assets/iconeList';

interface Props {
  skill: SkillBaseType;
  parentName?: string;
}

const SkillCard: React.FC<Props> = ({ skill, parentName }) => {
  if (!skill) {
    return <div>...</div>;
  }

  return (
    <div key={skill.id} className="item-card">
      <div className="item-title">
        <h3>{skill.Name}</h3>
        <div className="row">
          {parentName && parentName !== "None" && (
            <p className="parent-skill">Parent: {parentName}</p>
          )}

          {skill.KnowledgeLevel > 0 ? (
            <p>
              Required: {skill.RequiredKnowledge}:{skill.KnowledgeLevel} (Level {skill.SkillLevel})
            </p>
          ) : (
            <p>(Level {skill.SkillLevel})</p>
          )}
        </div>
      </div>

      <table className="general-table sub-table">
        <thead>
          <tr>
            <th className="value-cell">Damage Type</th>
            <th className="value-cell"><img src={attackIcons.range} className="attack-icon" /></th>
            <th className="value-cell"><img src={generalIcons.mana} className="attack-icon" /></th>
            <th className="value-cell"><img src={attackIcons.minDamage} className="attack-icon" /></th>
            <th className="value-cell"><img src={attackIcons.maxDamage} className="attack-icon" /></th>
            <th className="value-cell"><img src={attackIcons.precision} className="attack-icon" /></th>
            <th className="value-cell"><img src={attackIcons.critical} className="attack-icon" /></th>
            <th className="value-cell">Damage stat</th>
            <th className="value-cell">Precision stat</th>
            <th className="value-cell">other effect</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="value-cell">
              <img
                src={ElementIcons[skill.Element as keyof typeof ElementIcons]}
                className="attack-icon"
              />
            </td>

            <td className="value-cell">{skill.Type}</td>

            <td className="value-cell mana-cost">{skill.ManaCost}</td>

            <td className="value-cell">
              <div className="bold-text">{skill.BaseMinDam}</div>
              <div className="small-text">X {skill.MinDamRatio}</div>
            </td>

            <td className="value-cell">
              <div className="bold-text">{skill.BaseMaxDam}</div>
              <div className="small-text">X {skill.MaxDamRatio}</div>
            </td>

            <td className="value-cell">
              <div className="bold-text">{skill.BasePrecision}</div>
              <div className="small-text">X {skill.PrecisionRatio}</div>
            </td>

            <td className="value-cell">{skill.CriticScore}</td>

            <td className="value-cell">
              {(skill.MinDamRatio !== 0 || skill.MaxDamRatio !== 0) && (
                <>
                  {characteristicsIcons[skill.StatDam1 as keyof typeof characteristicsIcons] && (
                      <img
                        src={characteristicsIcons[skill.StatDam1 as keyof typeof characteristicsIcons]}
                        className="attack-icon"
                      />
                    )}

                  {characteristicsIcons[skill.StatDam2 as keyof typeof characteristicsIcons] && (
                      <img
                        src={characteristicsIcons[skill.StatDam2 as keyof typeof characteristicsIcons]}
                        className="attack-icon"
                      />
                    )}
                </>
              )}
            </td>

            <td className="value-cell">
              {skill.PrecisionRatio !== 0 && (
                <>
                  {characteristicsIcons[skill.StatPrecision1 as keyof typeof characteristicsIcons] && (
                      <img
                        src={characteristicsIcons[skill.StatPrecision1 as keyof typeof characteristicsIcons]}
                        className="attack-icon"
                      />
                    )}

                  {characteristicsIcons[skill.StatPrecision2 as keyof typeof characteristicsIcons] && (
                      <img
                        src={characteristicsIcons[skill.StatPrecision2 as keyof typeof characteristicsIcons]}
                        className="attack-icon"
                      />
                    )}
                </>
              )}
            </td>

            <td className="value-cell small-text-cell">{skill.OtherEffects}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SkillCard;
