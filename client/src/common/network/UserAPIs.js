import APIs from './APIs'
import Global from './../Observables/global'
import mainConfig from '../mainConfig.js'

let baseUrl = mainConfig.serverUrl

class UserAPIs {
    log_in({ email, password }) {
        let url = `${baseUrl}api/auth/login`;
        let body = {
            email,
            password
        };
        return APIs.post(url, body);
    }

    main_log_in({ username, password }) {
        let url = `${baseUrl}mainlogin`;
        let body = {
            username,
            password
        };
        return APIs.post(url, body);
    }

    user_reset_password(email, token, newPassword, verifyPassword) {
        let url = `${baseUrl}api/auth/reset-password?email=${email}&token=${token}`;
        let body = {
            newPassword,
            verifyPassword
        };
        return APIs.post(url, body);
    }
    updateSettings(username,notifications) {
        let url = `${baseUrl}api/user/updateSettings?username=${username}`;
        let body = notifications
        return APIs.put(url, body);
    }
    completeTour() {
        let url = `${baseUrl}api/user/completeTour?userId=${Global.userData._id}`;
        return APIs.put(url);
    }
    likeStory(storyId) {
        let url = `${baseUrl}api/user/likeStory?userId=${Global.userData._id}&storyId=${storyId}`;
        return APIs.get(url);
    }
    unlikeStory(storyId) {
        let url = `${baseUrl}api/user/unlikeStory?userId=${Global.userData._id}&storyId=${storyId}`;
        return APIs.get(url);
    }

    getStoriesLiked(limit, offset,id) {
      let url;
      if(Global.userData._id){
        url = `${baseUrl}api/user/getStoriesLiked?myUserId=${Global.userData._id}&userId=${id}&limit=${limit}&offset=${offset}`
      }
      else{
        url = `${baseUrl}api/user/getStoriesLiked?userId=${id}&limit=${limit}&offset=${offset}`
      }
      return APIs.get(url);
    }
    getNotifications(limit, offset) {
      let url = `${baseUrl}api/user/getNotifications?userId=${Global.userData._id}&limit=${limit}&offset=${offset}`
      return APIs.get(url);
    }
    readNotification(id) {
      let url = `${baseUrl}api/user/readNotification?userId=${Global.userData._id}&notificationId=${id}`
      return APIs.put(url);
    }

    deleteNotification(id) {
      let url = `${baseUrl}api/user/deleteNotification?userId=${Global.userData._id}&notificationId=${id}`
      return APIs.delete(url);
    }
    deleteAccount() {
      let url = `${baseUrl}api/user/deleteAccount`
      return APIs.post(url);
    }

    reorderLines(lineId,newIndex) {
        let url = `${baseUrl}api/user/reorderLines`;
        let body = {
          lineId,
          newIndex
        }
        return APIs.put(url, body);
    }

    updateStoryUrlClicked(id) {
        let url = `${baseUrl}api/feed/updateStoryUrlClicked?storyId=${id}`;

        return APIs.put(url);
    }
    reorderStories(lineId,storyId,newIndex) {
        let url = `${baseUrl}api/feed/reorderStories`;
        let body = {
          lineId,
          storyId,
          newIndex
        }
        return APIs.put(url, body);
    }
    addToLines(lineIds,storyId) {
        let url = `${baseUrl}api/feed/addStoryToLine`;
        let body = {
          lineIds,
          storyId
        }
        return APIs.post(url, body);
    }
    updatePassword(username,oldPassword,newPassword){
      let url = `${baseUrl}api/user/updatePassword?username=${username}`;
      let body = {
        oldPassword,
        newPassword
      }
      return APIs.put(url, body);
    }
    updateUsername(oldUsername,newUsername) {
        let url = `${baseUrl}api/user/updateUsername`;
        let body = {
          oldUsername,
          newUsername
        };
        return APIs.put(url, body);
    }
    updateUser(userId,firstName,lastName,website,bio,country,city) {
        let url = `${baseUrl}api/user/updateUser`;
        let body = {
          firstName,
          lastName,
          website,
          bio,
          country,
          city
        };
        return APIs.put(url, body);
    }
    checkToken(email, token) {
        let url = `${baseUrl}api/auth/token-validity?email=${email}&token=${token}`;
        return APIs.get(url);
    }
    validateEmail(email) {
        let url = `${baseUrl}api/user/validateEmail?email=${email}`;
        return APIs.get(url);
    }

    signUp(fullname, email, password,isPublisher,website,bio) {
        let url = `${baseUrl}api/auth/register`;
        let body = {
            fullname,
            email,
            password,
            isPublisher,
            website,
            bio
        };
        return APIs.post(url, body);
    }

    user_forgot_password(email) {
        let url = `${baseUrl}api/auth/forgot-password`;
        let body = {
            email
        };
        return APIs.post(url, body);
    }

    getUser(username) {
      let url = `${baseUrl}api/user/getUser?username=${username}`
      return APIs.get(url)
    }

    confirm_user(token) {
        let url = `${baseUrl}api/auth/email-confirmation?token=${token}`
        return APIs.get(url);
    }

    follow(followerId) {
        let url = `${baseUrl}api/user/follow?followingUserId=${followerId}`
        return APIs.get(url)
    }

    unfollow(followerId) {
        let url = `${baseUrl}api/user/unfollow?followingUserId=${followerId}`
        return APIs.get(url)
    }

    followLine(lineId) {
        let url = `${baseUrl}api/user/followLine?followingLineId=${lineId}`
        return APIs.get(url)
    }

    unfollowLine(lineId) {
        let url = `${baseUrl}api/user/unfollowLine?followingLineId=${lineId}`
        return APIs.get(url)
    }
    followTopic(topicId) {
        let url = `${baseUrl}api/user/followTopic?followingTopicId=${topicId}`
        return APIs.get(url)
    }
    unfollowTopic(topicId) {
        let url = `${baseUrl}api/user/unfollowTopic?followingTopicId=${topicId}`
        return APIs.get(url)
    }
    getLikes(userId, limit, offset) {
        let url = `${baseUrl}api/user/getLikes/${userId}&limit=${limit}&offset=${offset}`
        return APIs.get(url);
    }
    updateLineImage(file,lineId) {

        const formData = new FormData();
        formData.append('image',file);
        let url = `${baseUrl}api/user/updateLineImage?lineId=${lineId}`;

        return APIs.put(url,formData);
    }
    changeProfileImage(file) {
        const formData = new FormData();
        formData.append('image',file);
        let url = `${baseUrl}api/user/profile-image`;
        return APIs.post(url,formData);
    }
    shareByMail(id,emails,message,type) {
        let url = `${baseUrl}share/shareByMail`,
        body={
          id,
          emails,
          message,
          type
        }
        return APIs.post(url, body);
    }
    getLines(userId, limit, offset) {
        let url = `${baseUrl}api/user/getLines?userId=${userId}&limit=${limit}&offset=${offset}`
        return APIs.get(url)
    }
    getFilteredLines(storyId) {
        let url = `${baseUrl}api/user/getFilteredLines?storyId=${storyId}`
        return APIs.get(url)
    }
    addLine(data) {
        let url = `${baseUrl}api/user/addLine`,
        body= data;
        return APIs.post(url, body);
    }

    getFollowing(userId, limit, offset, type) {
      let url = `${baseUrl}api/user/getFollowing?userId=${userId}&type=${type}&limit=${limit}&offset=${offset}`
      return APIs.get(url)
    }
    getFollowingTopics(userId, limit, offset) {
        let url = `${baseUrl}api/user/getFollowingTopics?userId=${userId}&limit=${limit}&offset=${offset}`
        return APIs.get(url)
    }
    getFollowingLines(userId, limit, offset) {
        let url = `${baseUrl}api/user/getFollowingLines?userId=${userId}&limit=${limit}&offset=${offset}`
        return APIs.get(url)
    }

    getFollowers(userId, limit, offset) {
        let url = `${baseUrl}api/user/getFollowers?userId=${userId}&limit=${limit}&offset=${offset}`
        return APIs.get(url)
    }

    updateLine(updates,line) {
      let url = `${baseUrl}api/user/updateLine`,
          body={
            lineId: line,
            updatedFields : updates
          }
        return APIs.put(url, body);
    }

  //TODO  myUserId:${Global.userData._id}
    deleteLineStory(lineId,storyId) {
      let url = `${baseUrl}api/feed/deleteLineStory`,
            body = {
              lineId,
              storyId
            };
        return APIs.post(url, body);
    }
    deleteLine(lineId) {
      let url = `${baseUrl}api/user/deleteLine`,
            body = {
              lineId
            };
        return APIs.post(url, body);
    }
    updateUserTopics(topics) {
      let url = `${baseUrl}api/user/userTopics`,
            body = {
                topics
            };
        return APIs.put(url, body);
    }
}

export default new UserAPIs()
