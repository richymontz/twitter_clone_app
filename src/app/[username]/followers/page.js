import UserListScreen from '../../screens/UserListScreen'

export default function Followers({ params }) {
  const { username } = params
  return (
    <UserListScreen username={username} listType="followerIds" subtitle="Followers"/>
  )
}
