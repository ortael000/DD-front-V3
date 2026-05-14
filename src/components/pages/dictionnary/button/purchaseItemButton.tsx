import React, { useEffect, useState } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";

import { getObjetToInventory } from "../../../../helpers/dictionnary/getObjetToInventory";
import { fetchAllCharacter } from "../../../../helpers/dataBase&API/characterAPI";
import { CharacterBasetype } from "../../../../types/character";
import { objectSubtype } from "../../../../types/stringLists";

interface Props {
  itemType: "equipment" | "weapon" | "accessory";
  itemSubtype: objectSubtype;
  itemID: number;
  itemName: string;
  itemValue: number;
  itemFull: any;
}

const PurchaseItemButton: React.FC<Props> = ({
  itemType,
  itemSubtype,
  itemID,
  itemName,
  itemValue,
  itemFull,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [characters, setCharacters] = useState<CharacterBasetype[]>([]);
  const [selectedCharacterID, setSelectedCharacterID] = useState<number | null>(null);
  const [isPaying, setIsPaying] = useState(true);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const loadCharacters = async () => {
      setIsLoadingCharacters(true);
      setError("");
      setSuccess("");

      try {
        const fetchedCharacters = await fetchAllCharacter();
        setCharacters(fetchedCharacters);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch characters");
      } finally {
        setIsLoadingCharacters(false);
      }
    };

    loadCharacters();
  }, [isOpen]);

  const openDialog = () => {
    setSelectedCharacterID(null);
    setIsPaying(true);
    setError("");
    setSuccess("");
    setIsOpen(true);
  };

  const closeDialog = () => {
    if (isPurchasing) {
      return;
    }

    setIsOpen(false);
  };

  const handleCharacterChange = (event: SelectChangeEvent<string>) => {
    setSelectedCharacterID(Number(event.target.value));
    setError("");
    setSuccess("");
  };

  const handlePurchase = async () => {
    if (selectedCharacterID === null) {
      setError("Please select a character");
      return;
    }

    setIsPurchasing(true);
    setError("");
    setSuccess("");

    try {
      await getObjetToInventory(
        selectedCharacterID,
        itemType,
        itemSubtype,
        itemID,
        itemName,
        itemValue,
        itemFull,
        isPaying
      );
      setSuccess(`${itemName} purchased`);
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Purchase failed");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <>
      <Tooltip title={`Purchase ${itemName}`}>
        <IconButton
          aria-label={`Purchase ${itemName}`}
          size="small"
          onClick={openDialog}
          sx={{ color: "#b8860b" }}
        >
          <ShoppingBagIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog open={isOpen} onClose={closeDialog} fullWidth maxWidth="xs">
        <DialogTitle>Purchase {itemName}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal" size="small" disabled={isLoadingCharacters}>
            <InputLabel id={`purchase-character-${itemType}-${itemID}`}>Character</InputLabel>
            <Select
              labelId={`purchase-character-${itemType}-${itemID}`}
              label="Character"
              value={selectedCharacterID === null ? "" : String(selectedCharacterID)}
              onChange={handleCharacterChange}
            >
              {characters.map((character) => (
                <MenuItem key={character.id} value={String(character.id)}>
                  {character.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={isPaying}
                onChange={(event) => setIsPaying(event.target.checked)}
              />
            }
            label="Paying"
          />

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={isPurchasing}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePurchase}
            disabled={selectedCharacterID === null || isLoadingCharacters || isPurchasing}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PurchaseItemButton;
