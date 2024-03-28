import DownTrendSvg from "./svg/DownTrendSvg";
import UpTrendSvg from "./svg/UpTrendSvg";

export default function StatCard({ title, value, info, isGood, reverse }) {
  return (
    <div className="relative p-6 rounded-2xl bg-white shadow-md border-t border-gray-200">
      <div className="space-y-2">
        <div
          className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
          <span>{title}</span>
        </div>

        <div className="text-3xl ">
          {value}
        </div>

        <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-${isGood ^ reverse ? 'green' : 'red'}-500`}>

          <span>{`${info} ${isGood ? 'more' : 'less'} this month`}</span>

          {isGood ? <UpTrendSvg /> : <DownTrendSvg />}
        </div>
      </div>
    </div>
  )
}