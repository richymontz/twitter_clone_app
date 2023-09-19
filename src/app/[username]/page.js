import ProfileScreen from '../screens/ProfileScreen'

export default function Profile({ params }) {
  const { username } = params
  return (
    <ProfileScreen username={username}/>
  )
}
