import React from "react";
import axios from "axios";

function createBoardApi(boardName) {
  return axios
    .post(
      `https://api.trello.com/1/boards/?name=${boardName}&key=1e8fc84d1844931bc0c2e1dec3b8cb6a&token=ATTA37d79c87a013e2a1efbca713a526f9b622ad3530693ce7b35b3e78d8135be91eD024A763`
    )
    .then((response) => {
      //   console.log(`Response: ${response.status} ${response.statusText}`);
      //   console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default createBoardApi;

// Replace 'name', 'APIKey', and 'APIToken' with your actual values
