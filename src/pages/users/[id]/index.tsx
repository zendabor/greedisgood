import { getUser, getUsers } from "@/api/api"
import UserProfile from "@/components/user/userProfile"
import { Path } from "@/consts/path"
import { userParams } from "@/types/user"
import { GetStaticPaths } from "next"
import { unstable_serialize } from "swr"


export const getStaticPaths = (async () => {
  try {
    const data = await getUsers()
    const paths = data?.map((item) => ({
      params: { id: item.id.toString() },
    }))

    return { paths, fallback: false }
  } catch (error) {
    return { paths: [], fallback: 'blocking' }
  }
}) as GetStaticPaths

export const getStaticProps = async (context: { params: userParams }) => {
  const { id } = context.params as userParams
  const userKey = [Path.users, id]
  try {
    const response = await getUser(id)
    return {
      props: {
        userKey,
        id,
        fallback: {
          [unstable_serialize(userKey)]: response,
        },
      },
      revalidate: 10,
    }
  } catch (error) {
    return {}
  }
}


export default function User({ userKey }: { userKey: string[] }) {
  return (
    <UserProfile userKey={userKey} />
  );
}
