import { removeHyphen } from "utils/Utils";
import DownTrendSvg from "./svg/DownTrendSvg";
import UpTrendSvg from "./svg/UpTrendSvg";

export default function StatCard({ title, value, info, isGood, reverse, staticText }) {

  const isBoolean = typeof (isGood) === 'boolean';

  return (
    <div className="relative p-6 rounded-2xl bg-white shadow-md border-t border-gray-200">
      <div className="space-y-2">
        <div
          className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-zinc-700 ">
          <span>{title}</span>
        </div>

        <div className="text-3xl ">
          ₹{value}
        </div>

        {info ?
          <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium 
          text-${isBoolean ? isGood ^ reverse ? 'green' : 'red' : 'slate'}-500`}>
            <span>{`${removeHyphen(info)} ${isBoolean ? isGood ? 'more' : 'less' : ''} ${staticText}`}</span>
            {isBoolean ? isGood ? <UpTrendSvg /> : <DownTrendSvg /> : null}
          </div>
          : null}

      </div>
    </div>
  )
}