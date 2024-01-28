import axios from "axios";

function deleteCard(id) {
  return axios
    .delete(
      "https://api.trello.com/1/cards/" +
        id +
        "?key=1e8fc84d1844931bc0c2e1dec3b8cb6a&token=ATTA37d79c87a013e2a1efbca713a526f9b622ad3530693ce7b35b3e78d8135be91eD024A763",
      { method: "DELETE" }
    )
    .then((res) => res)
    .catch((error) => console.log(error));
  return b;
}

export default deleteCard;
