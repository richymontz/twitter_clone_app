import UserListScreen from '../../screens/UserListScreen'

export default function Following({ params }) {
  const { username } = params
  return (
    <UserListScreen username={username} listType="followingIds" subtitle="Following"/>
  )
}
