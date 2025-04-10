import StatisticsCard from "../components/dashboard/StatisticsCard";

type Props = {};

const Dashboard = (props: Props) => {
  const cards = [
    {
      title: "To Do",
      value: 5,
      unit: "Task",
      icon: "hugeicons:sticky-note-01",
      iconColor: "gray",
    },
    {
      title: "In Progress",
      value: 16,
      unit: "Task",
      icon: "fluent-mdl2:hour-glass",
      iconColor: "orange",
    },
    {
      title: "Completed",
      value: 12,
      unit: "Task",
      icon: "nrk:media-media-complete",
      iconColor: "green",
    },
  ];
  return (
    <>
      <h1 className="font-bold text-2xl mb-2">Dashboard</h1>
      <div>
        <section>
          <div className="flex gap-6">
            {cards.map((card) => (
              <StatisticsCard
                key={card.title}
                title={card.title}
                value={card.value}
                unit={card.unit}
                icon={card.icon}
                iconColor={card.iconColor}
              />
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-lg">List of projects</h3>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
