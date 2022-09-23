import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {
  const newTitle = useMemo(() => {
    return (title.length > 10)
      ? title.substring(0, 10) + '...'
      : title
  }, [title])

  const dispatch = useDispatch()

  const onClickNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }))
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={(e) => (onClickNote())}>

        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container alignItems='center'>
          <ListItemText>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>{newTitle}</Typography>
          </ListItemText>
          <ListItemText secondary={body} />
        </Grid>

      </ListItemButton>
    </ListItem>
  )
}
