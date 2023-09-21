import axios from "axios";

export const getChallenges =
  (minAmount, maxAmount, searchQuery) => async (dispatch, getState) => {
    try {
      const token = getState().Auth.token;
      console.log(token);

      let query = "";
      if (minAmount !== undefined && minAmount !== null) {
        query += `&min=${minAmount}`;
      }
      if (maxAmount !== undefined && maxAmount !== null) {
        query += `&max=${maxAmount}`;
      }
      if (searchQuery !== undefined && searchQuery !== null) {
        query += `&search=${searchQuery}`;
      }

      const { data } = await axios.get(
        `https://yopex-api.tabaani.co/challenge/challenges?${query}`,
        {
          
        }
      );
      console.log("data:", data);
      dispatch({
        type: "get_challenges_success",
        payload: data,
      });

      return data;
    } catch (error) {
      console.log("error:", error);
      console.log("get challenges error:", error.response.data);

      dispatch({
        type: "get_challenges_error",
        payload: error.response.data,
      });
    }
  };

export const getCompanyChallenges =
  (companyId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        ` https://yopex-api.tabaani.co/company/get/${companyId}`,
        {
          
        }
      );
      console.log("data:", data);
      dispatch({
        type: "get_company_challenges_success",
        payload: data.challenges,
      });

      return data;
    } catch (error) {
      console.log("error:", error);
      console.log("get challenges error:", error.response.data);

      dispatch({
        type: "get_company_challenges_error",
        payload: error.response.data,
      });
    }
  };

export const addChallenge = (challengeData) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log("testtttt", challengeData);

    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/challenge",
      challengeData,
      
    );
    console.log("data", data);

    dispatch({
      type: "add_challenge_success",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("add user error:", error.response.data);
    console.log(error.response.data);

    dispatch({
      type: "add_challenge_error",
      payload: error.response.data,
    });
  }
};

export const deleteChallenge = (challengeId) => async (dispatch, getState) => {
  try {
    console.log({ challengeId });
    const { data } = await axios.delete(
      `https://yopex-api.tabaani.co/challenge/deleteChallenge/${challengeId}`,
      
    );
    console.log(data);

    dispatch({
      type: "delete_challenge_success",
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("add user error:", error.response.data);
    console.log(error.response.data);

    dispatch({
      type: "delete_challenge_error",
      payload: error.response.data,
    });
  }
};

export const joinChallenge = (challengeId) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    const myData = JSON.parse(localStorage.getItem("user"));
    const challengeData = { idChallenge: challengeId, idUser: myData._id };
    console.log(challengeData);

    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/join",
      challengeData,
      
    );

    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));

    dispatch({
      type: "join_challenge_success",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("add user error:", error.response.data);

    dispatch({
      type: "join_challenge_error",
      payload: error.response.data,
    });
  }
};

export const UnjoinChallenge = (challengeId) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    const myData = JSON.parse(localStorage.getItem("user"));
    const challengeData = { idChallenge: challengeId, idUser: myData._id };
    console.log(challengeData);

    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/unjoin",
      challengeData,
      
    );

    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));

    dispatch({
      type: "unjoin_challenge_success",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("add user error:", error.response.data);

    dispatch({
      type: "unjoin_challenge_error",
      payload: error.response.data,
    });
  }
};

export const getChallengeUsers =
  (challengeId) => async (dispatch, getState) => {
    try {
      const token = getState().Auth.token;
      console.log(token);
      const challengeData = { idChallenge: challengeId };
      console.log(challengeData);

      const { data } = await axios.get(
        "https://yopex-api.tabaani.co/challenge/getChallengeUsers",
        {
          params: {
            idChallenge: challengeId,
          },
          
        }
      );
      console.log("data:", data);
      dispatch({
        type: "get_challenge_users_success",
        payload: data,
      });

      return data;
    } catch (error) {
      console.log("error:", error);
      console.log("get challenge users error:", error.response.data);

      dispatch({
        type: "get_challenge_users_error",
        payload: error.response.data,
      });
    }
  };

export const submitChallenge =
  (challengeData) => async (dispatch, getState) => {
    try {
      const myData = JSON.parse(localStorage.getItem("user"));
      console.log(challengeData);

      const { data } = await axios.post(
        "https://yopex-api.tabaani.co/challenge/submission",
        challengeData,
        {
          
        }
      );
      console.log("data:", data);
      dispatch({
        type: "submit_challenge_success",
        payload: data,
      });

      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("error:", error);

      dispatch({
        type: "submit_challenge_error",
        payload: error.response.data,
      });
    }
  };

export const getUserSubmitChallenge =
  (challengeId, userId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        "https://yopex-api.tabaani.co/challenge/getChallengeUserSubmit",
        {
          params: {
            challengeId: challengeId,
            userId: userId,
          },
          
        }
      );
      console.log("data:", data);
      dispatch({
        type: "get_user_submit_success",
        payload: data,
      });

      return data;
    } catch (error) {
      console.log("error:", error);
      console.log("get challenge users error:", error.response.data);

      dispatch({
        type: "get_user_submit_error",
        payload: error.response.data,
      });
    }
  };

export const getUserChallenges = (userId) => async (dispatch, getState) => {
  try {
    console.log(userId);
    const { data } = await axios.get(
      "https://yopex-api.tabaani.co/user/challenges",
      {
        params: {
          userId: userId,
        },
        
      }
    );
    console.log("data:", data);

    dispatch({
      type: "get_user_challenges_success",
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("error:", error);
    console.log("get user challenges error:", error.response.data);

    dispatch({
      type: "get_user_challenges_error",
      payload: error.response.data,
    });
  }
};

export const chooseWinner = (challengeData) => async (dispatch, getState) => {
  try {
    const myData = JSON.parse(localStorage.getItem("user"));
    console.log(challengeData);

    const { data } = await axios.post(
      "https://yopex-api.tabaani.co/company/challengeWinner",
      challengeData,
      
    );
    console.log("data:", data);
    dispatch({
      type: "winner_challenge_success",
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data.newCompany));
    return data.newChallenge;
  } catch (error) {
    console.log("error:", error);
    console.log("get challenge users error:", error.response.data);

    dispatch({
      type: "winner_challenge_error",
      payload: error.response.data,
    });
  }
};
