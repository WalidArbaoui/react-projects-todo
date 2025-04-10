import { useParams } from "react-router-dom";

type Props = {};

const Tasks = (props: Props) => {
  const params = useParams();
  return <div>Tasks {params.id}</div>;
};

export default Tasks;
