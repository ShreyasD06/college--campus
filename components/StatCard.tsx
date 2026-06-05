import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  color: "blue" | "green" | "yellow" | "purple" | "pink" | "indigo";
}

const colorClasses = {
  blue: "bg-blue-100 border-blue-300",
  green: "bg-green-100 border-green-300",
  yellow: "bg-yellow-100 border-yellow-300",
  purple: "bg-purple-100 border-purple-300",
  pink: "bg-pink-100 border-pink-300",
  indigo: "bg-indigo-100 border-indigo-300",
};

export default function StatCard({
  icon,
  label,
  value,
  color = "blue",
}: StatCardProps) {
  return (
    <div
      className={`${colorClasses[color]} border-l-4 rounded-lg p-6 shadow-md hover:shadow-lg transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-30">{icon}</div>
      </div>
    </div>
  );
}
