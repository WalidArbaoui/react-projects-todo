import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  title: string;
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
  return (
    <div
      className="flex items-center gap-2 border-l-2 py-4 px-2 bg-gray-50"
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
          {title}
        </h3>
        <span className="text-gray-400 text-sm">
          {`${unit}${value !== 1 && "s"}`}
        </span>
      </div>
    </div>
  );
};

export default StatisticsCard;
