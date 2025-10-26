import { FaBook } from "react-icons/fa";

type StatsCardProps = {
  label: string;
  stats: number;
  icon?: React.ReactNode;
  colorClass?: string;
};

export default function StatsCard({
  stats,
  label,
  icon = <FaBook />,
  colorClass = "bg-[#FF9119]/10 text-[#FF9119]"
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`${colorClass} rounded-full p-3 sm:p-4 flex-shrink-0`}>
          <div className="text-lg sm:text-2xl">
            {icon}
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats}</p>
        </div>
      </div>
    </div>
  );
}
