import {
    SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET,    
    SLACK_REDIRECT_URI,
  } from "./url";
  
  function redirectToSlack() {
    const userScopes = encodeURIComponent("chat:write channels:read");
  
    const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&user_scope=${userScopes}&redirect_uri=${encodeURIComponent(SLACK_REDIRECT_URI)}`;
    window.location.href = slackAuthUrl;
  }
  
  export default redirectToSlack;