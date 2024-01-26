import React from "react";
import axios from "axios";

function api() {
  return axios
    .get(
      "https://api.trello.com/1/members/me/boards?key=1e8fc84d1844931bc0c2e1dec3b8cb6a&token=ATTA37d79c87a013e2a1efbca713a526f9b622ad3530693ce7b35b3e78d8135be91eD024A763"
    )
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default api;
