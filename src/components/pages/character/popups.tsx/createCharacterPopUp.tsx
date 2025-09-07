import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Alert
} from '@mui/material';
import { createCharacter } from '../../../../helpers/dataBase&API/characterAPI';

import { CharacterBasetype } from '../../../../types/character';
import { fetchAllCharacter } from '../../../../helpers/dataBase&API/characterAPI';

type CreateCharacterButtonProps = {
  onCreated: (payload: { id: number; name: string }) => void;
  setCharacterIdList: (list: {id: number, Name: string}[]) => void;
};

const CreateCharacterButton: React.FC<CreateCharacterButtonProps> = ({
  onCreated,
  setCharacterIdList
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setPassword('');
    setError(null);
  };

  const handleSubmit = async () => {
    setError(null);
    if (!name.trim() || !password.trim()) {
      setError('Please enter both a name and a password.');
      return;
    }
    try {
      setSubmitting(true);
      const { id } = await createCharacter(name.trim(), password);
      console.log('Character created with ID:', id);
      setOpen(false);
      onCreated({ id, name: name.trim() });
      resetForm();
    } catch (e: any) {
      setError(e?.message || 'Failed to create character.');
    } finally {
      setSubmitting(false);
      const chars : CharacterBasetype[] = await fetchAllCharacter();
      const newCharactersIDList = chars.map(char => ({
        id: char.id,
        Name: char.Name
      }));
      setCharacterIdList(newCharactersIDList);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        Create New
      </Button>

      <Dialog
        open={open}
        onClose={() => !submitting && setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Create a character</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateCharacterButton;
