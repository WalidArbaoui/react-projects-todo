import { Icon } from "@iconify/react/dist/iconify.js";
import { TaskStatus } from "../../enum/Task.enum";

type Props = {
  title: TaskStatus;
  value: number;
  unit?: string;
  icon: string;
  iconColor?: string;
};

const StatisticsCard = ({
  title,
  value,
  unit = "",
  icon,
  iconColor = "main",
}: Props) => {
  const titleText =
    Object.keys(TaskStatus)[Object.values(TaskStatus).indexOf(title)];
  return (
    <div
      className="flex items-center gap-2 border-l-2 py-4 px-2"
      style={{ borderColor: iconColor }}
    >
      <div>
        <span className="font-bold text-4xl mr-2">{value}</span>
      </div>
      <div>
        <h3 className="flex items-baseline gap-1 text-xl font-bold">
          <Icon
            icon={icon}
            width="16"
            height="16"
            style={{ color: iconColor }}
          />
          {titleText}
        </h3>
        <span className="text-gray-400 text-sm">
          {`${unit}${value !== 1 ? "s" : ""}`}
        </span>
      </div>
    </div>
  );
};

export default StatisticsCard;
