import * as Notifications from 'expo-notifications'

// Load some initial data
export function loadInitialData() {
  return {
    StarWars: {
      title: 'StarWars',
      questions: [
        {
          question: 'How many movies in the series?',
          answer: '9'
        },
        {
          question: 'The saga focuses on which family?',
          answer: 'Skywalker'
        }
      ]
    },
    Avengers: {
      title: 'Avengers',
      questions: [
        {
          question: 'Who died at the end of End Game?',
          answer: 'Iron Man'
        }
      ]
    }
  }
}

// Delete any existing notification
export async function deleteNotification() {
  console.log('deleting notification')
  await Notifications.cancelAllScheduledNotificationsAsync()
}

// Add a daily notification
export async function createNotification() {
  console.log('creating notification')

  // Ask permission
  await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true
    }
  })

  // Set up a notification handler so they're not ignored
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge:true
    })
  })

  // Check that we now have permissions
  const settings = await Notifications.getPermissionsAsync()

  // Good, user let us add notification
  if (settings.status === 'granted') {
    // Setup a daily notification starting now
    const now = new Date()
    const hr = now.getHours()
    const min = now.getMinutes() + 1

    await Notifications.scheduleNotificationAsync({
      content: {title: 'Study Time', body: 'Please make sure you study today', sound:true},
      trigger: {hour: hr, minute: min, repeats: true}
    })
  }
}