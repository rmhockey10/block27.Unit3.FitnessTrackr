//importing custom hooks
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function ActivityListItem({ activity }) {
  //calling "useAuth" and accessing the "token" variable this function returns.
  const { token } = useAuth();

  //calling "useMutation" and passing arguments to it.  The function returns the "mutate" and "error" variable and we use {} to destructure the variables, allowing us to access them for this file.
  const { mutate, error } = useMutation(
    "DELETE",
    `/activities/${activity.id}`,
    ["activity"]
  );

  //returns a div with a key assigned to it, the activity name, and a button
  //if the "token" is truthy, then display a button which calls the "mutate" function if clicked, otherwise do not display the button
  //if "error" is truthy, then display the error message.
  return (
    <div key={activity.id}>
      <li>{activity.name}</li>
      {token ? <button onClick={() => mutate()}>Delete</button> : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
}
