import React, { useMemo, useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import WeaponCard from "../../dictionnary/component/weaponCard";
import EquipmentCard from "../../dictionnary/component/equipmentCard";
import PassiveCard from "../../dictionnary/component/passiveCard";
import SkillCard from "../../dictionnary/component/skillCard";

import { fetchItem } from "../../../../helpers/dataBase&API/APIHelpers";

import "../../../CSS/smallComponent/itemCard.css";

type ItemType = "weapon" | "equipment" | "passive" | "skill" | "accessory";

type Props = {
  type: ItemType;
  item: any;   
  label: string; // clickable text
};

export default function ItemCardPopup({ type, item, label }: Props) {

  console.log("ItemCardPopup rendered with a :",type, " item is:", item);
  const [open, setOpen] = useState(false);

  // ✅ This is the object that will actually be rendered in the popup.
  // It may be replaced by a fetched "full dictionary" object.
  const [itemToDisplay, setItemToDisplay] = useState<any | null>(null);


  const handleOpen = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Default: show whatever we have
    let fullObj = item ?? null;

    // ✅ If WeaponCard/EquipmentCard expects the full dictionary object,
    // fetch it by id when opening.
    try {
      if (type === "weapon" && item?.id != null) {
        const weapon = await fetchItem("weapon", item.id);
        fullObj = weapon;
      }

      if (type === "equipment" && item?.ObjectID != null) {
        const equipment = await fetchItem("equipment", item.ObjectID);
        fullObj = equipment;
      }
      if (type === "passive" && item?.id != null) {
        const passive = await fetchItem("passive", item.id);
        fullObj = passive;
      }
      if (type === "skill" && item?.Id != null) {
        const skill = await fetchItem("skill", item.Id);
        fullObj = skill;
      }
    } catch (err) {
      // If fetch fails, we still show the given item
      fullObj = item ?? null;
    }

    setItemToDisplay(fullObj);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setItemToDisplay(null);
  };

  const renderCard = () => {
    const obj = itemToDisplay ?? item;
    if (!obj) return null;

    switch (type) {
      case "weapon":
        return <WeaponCard weapon={obj} />;
      case "equipment":
        return <EquipmentCard equipment={obj} />;
      case "passive":
        return <PassiveCard passive={obj} />;
      case "skill":
        return <SkillCard skill={obj} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* clickable label managed here */}
      <button
        type="button"
        onClick={handleOpen}
        className="item-card-popup-trigger"
        title="Open details"
      >
        {label}
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "fit-content",     // ✅ shrink to content
            maxWidth: "90vw",         // ✅ safety cap
            m: 0,
          },
        }}
      >
        <DialogTitle
          sx={{
            py: 1,
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            whiteSpace: "nowrap",
          }}
        >
          <IconButton onClick={handleClose} aria-label="close" size="small" >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            p: 0,              // ✅ remove the big default padding
            overflowX: "auto", // scroll only if needed
            overflowY: "auto",
          }}
        >
          {!itemToDisplay && !item ? (
            <div style={{ opacity: 0.7, padding: 12 }}>None</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <div
                style={{
                  display: "inline-block",
                  zoom: 0.85,              // ✅ shrinks layout (unlike transform: scale)
                  transformOrigin: "top left",
                }}
              >
                {renderCard()}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
