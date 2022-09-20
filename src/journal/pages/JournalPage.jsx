import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../views'

export const JournalPage = () => {
  return (
    <>
      <JournalLayout>
        {/* <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat consequuntur eveniet nostrum nemo. Reprehenderit dolores iusto recusandae voluptate repellendus! Soluta dicta nisi enim dolor ullam ab quae alias dignissimos odio.</Typography> */}
        <NothingSelectedView />
      </JournalLayout>
    </>
  )
}
