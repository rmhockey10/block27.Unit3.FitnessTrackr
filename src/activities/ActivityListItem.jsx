import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function ActivityListItem({ activity }) {
  const { token } = useAuth();

  const { mutate, error } = useMutation("DELETE", `/activities/${activity.id}`);

  return (
    <div key={activity.id}>
      <li>{activity.name}</li>
      {token ? <button onClick={() => mutate()}>Delete</button> : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
}
