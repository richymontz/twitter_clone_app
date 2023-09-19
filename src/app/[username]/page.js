import UserScreen from '../screens/UserScreen'

export default function Profile({ params }) {
  const { username } = params
  return (
    <UserScreen username={username}/>
  )
}
