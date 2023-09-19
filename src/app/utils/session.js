'use client';

export const destroySession = () => {
  localStorage.setItem('user', null)
  localStorage.setItem('token', null)
  localStorage.setItem('tweets', null)
}

export const setupSession = (login) => {
  localStorage.setItem('user', JSON.stringify({
    id: login.id,
    avatar: login.avatar,
    username: login.username,
    email: login.email,
    followerIds: login.followerIds,
    followingIds: login.followingIds,
    fullName: login.fullName,
    relatedUsers: login.relatedUsers,
    tweets: login.tweets,
  }))
  localStorage.setItem('token', login.token)
  localStorage.setItem('tweets', JSON.stringify(login.tweets))
}