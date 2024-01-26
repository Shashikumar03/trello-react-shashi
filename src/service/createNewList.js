import axios from "axios";
import React from "react";

function createNewList(id, name) {
  const key = "1e8fc84d1844931bc0c2e1dec3b8cb6a";
  const token =
    "ATTA37d79c87a013e2a1efbca713a526f9b622ad3530693ce7b35b3e78d8135be91eD024A763";
  return axios
    .post(
      ` https://api.trello.com/1/lists?name=${name}&idBoard=${id}&key=${key}&token=${token}`
    )
    .then((result) => result.data)
    .catch((err) => {
      console.log(err);
    });
}

export default createNewList;
