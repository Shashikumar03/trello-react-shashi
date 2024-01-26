import axios from "axios";
import React from "react";

function getCardsinAList(id) {
  const api = "";
  const token = "";
  return axios
    .get(
      `https://api.trello.com/1/lists/${id}/cards?key=1e8fc84d1844931bc0c2e1dec3b8cb6a&token=ATTA37d79c87a013e2a1efbca713a526f9b622ad3530693ce7b35b3e78d8135be91eD024A763`
    )
    .then((response) => response.data)
    .catch((e) => console.log(e));
}

export default getCardsinAList;
