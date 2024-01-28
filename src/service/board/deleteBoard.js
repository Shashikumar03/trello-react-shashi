import axios from "axios";

function deleteBoard(id) {
  const key = "1e8fc84d1844931bc0c2e1dec3b8cb6a";
  const token =
    "ATTA37d79c87a013e2a1efbca713a526f9b622ad3530693ce7b35b3e78d8135be91eD024A763";
  const url = `https://api.trello.com/1/boards/${id}?key=${key}&token=${token}`;
  return axios
    .delete(url)
    .then((result) => result)
    .catch((err) => {
      console.error(err);
    });
}

export default deleteBoard;
// https://api.trello.com/1/boards/{id}?key=APIKey&token=APIToken
