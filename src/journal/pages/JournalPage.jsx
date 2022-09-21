import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {
  return (
    <>
      <JournalLayout>
        {/* <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat consequuntur eveniet nostrum nemo. Reprehenderit dolores iusto recusandae voluptate repellendus! Soluta dicta nisi enim dolor ullam ab quae alias dignissimos odio.</Typography> */}
        <NothingSelectedView />
        {/* <NoteView /> */}

        <IconButton
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
            position: 'fixed',
            right: 50,
            bottom: 50
          }}
        >
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
      </JournalLayout>
    </>
  )
}
