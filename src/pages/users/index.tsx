import { getUsers } from '@/api/api';
import UserFilter from '@/components/userFilter/userFilter';
import UserList from '@/components/userList/userList';
import { Path } from '@/consts/path';

export const getStaticProps = (async () => {
  try {
    const response = await getUsers()
    return {
      props: {
        fallback: {
          [Path.users]: response,
        },
      },
      revalidate: 10
    }
  } catch (error) {
    console.log(error)
    return {}
  }
})

function UsersPage() {
  return (
    <>
      <UserFilter />
      <UserList />
    </>
  );
}

export default UsersPage;