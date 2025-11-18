// NEW - admin demo
import React from "react";

interface KPIProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export default function KPI({ title, value, icon, trend, subtitle }: KPIProps) {
  return (
    <div className="kk-admin-kpi bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>

          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}

          {trend && (
            <div className="mt-3 flex items-center gap-1">
              <span
                className={`text-sm font-semibold ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>

        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}
