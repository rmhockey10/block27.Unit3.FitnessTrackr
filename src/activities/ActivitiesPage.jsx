import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";
import ActivityListItem from "./ActivityListItem";

export default function ActivitiesPage() {
  const { data } = useQuery("/activities");
  const { mutate } = useMutation("POST", "/activities");
  const { token } = useAuth();

  function AddExerciseClick(formData) {
    const name = formData.get("name");
    const description = formData.get("description");
    const body = { name, description };
    mutate(body);
  }

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
