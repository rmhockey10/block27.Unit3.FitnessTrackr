//importing custom hooks and component function
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";
import ActivityListItem from "./ActivityListItem";

export default function ActivitiesPage() {
  //calling hooks, passing arguments to these functions, and using {} to destruction the return values, which enable us to access them and use them in this file
  const { data } = useQuery("/activities", "activity");
  const { mutate } = useMutation("POST", "/activities", ["activity"]);
  const { token } = useAuth();

  //taking the information from the form, grabbing the info that was assigned to "name" and "description", then calling the function "mutate" and passing the object "body" as an argument.
  function AddExerciseClick(formData) {
    const name = formData.get("name");
    const description = formData.get("description");
    const body = { name, description };
    mutate(body);
  }

  // if "token" and "data" are truthy (meaning stuff exists inside these variables), execute the following code
  if (token && data) {
    return (
      <>
        <h1>Activities</h1>
        <p>Imagine all the activities!</p>
        <ul>
          {data.map((activity) => {
            return <ActivityListItem key={activity.id} activity={activity} />;
          })}
        </ul>
        <form action={AddExerciseClick}>
          <label>
            Excercise Name
            <input name="name" />
          </label>
          <label>
            Excercise Description
            <input name="description" />
          </label>
          <button>Add</button>
        </form>
      </>
    );
    //else, if only "data" is truthy, execute the following code.
  } else if (data) {
    return (
      <>
        <h1>Activities</h1>
        <p>Imagine all the activities!</p>
        <ul>
          {data.map((activity) => {
            return <li key={activity.id}>{activity.name}</li>;
          })}
        </ul>
      </>
    );
  }
}
