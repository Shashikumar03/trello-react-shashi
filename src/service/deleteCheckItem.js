import axios from "axios";

function deleteCheckItem(listId, itemId) {
  const key = "1e8fc84d1844931bc0c2e1dec3b8cb6a";
  const token =
    "ATTA37d79c87a013e2a1efbca713a526f9b622ad3530693ce7b35b3e78d8135be91eD024A763";
  const url = `https://api.trello.com/1/checklists/${listId}/checkItems/${itemId}?key=${key}&token=${token}`;
  return axios
    .delete(url)
    .then((res) => res)
    .catch((err) => console.log(err));
}

export default deleteCheckItem;
// https://api.trello.com/1/checklists/{id}/checkItems/{idCheckItem}?key=APIKey&token=APIToken
